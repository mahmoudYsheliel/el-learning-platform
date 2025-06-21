from models.paymob import Paymob, PaymentVerification, Order, SubscriptionPlan, WebhookPayload
from models.enrollments import Enrollment
import database.enrollment_database as enrollment_database
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
import os
from dotenv import load_dotenv
from datetime import datetime, timedelta
import httpx
import hmac
import hashlib
from models.subscription import Subscription


async def get_payment_link(paymob_data: Paymob) -> ServiceResponse:
    load_dotenv(override=True)
    amount = 0

    order_type = paymob_data.type
    if not (order_type == 'subscription_plan' or order_type == 'course'):
        return ServiceResponse(msg='type error', success=False)

    order_bson_id = validate_bson_id(paymob_data.plan_course_id)
    if paymob_data.type == 'course' and not order_bson_id:
        return ServiceResponse(msg='bson id error', success=False)

    if order_type == 'subscription_plan':
        plan = await get_database().get_collection('subscription_plan').find_one({'_id': order_bson_id}, {'price': 1, 'title': 1, 'paymob_id': 1})
        if not plan:
            return ServiceResponse(msg='plan not found', success=False)
        amount = plan['price']

    if order_type == 'course':
        course = await get_database().get_collection('course').find_one({'_id': order_bson_id}, {'price': 1, 'title': 1})
        if not course:
            return ServiceResponse(msg='course not found', success=False)
        amount = course['price']

    promo_code = await get_database().get_collection('promo_code').find_one({'code': paymob_data.promo_code}, {})
    if promo_code:
        now = datetime.now()
        expiry_date = datetime.strptime(promo_code['expiry_date'], "%Y-%m-%d")

        is_limit_ended = promo_code['used_count'] >= promo_code['usage_limit']
        is_expired = expiry_date < now

        if promo_code and (not is_limit_ended) and (not is_expired):
            if promo_code['discount_type'] == 'fixed':
                amount = amount - promo_code['discount_value']

            if promo_code['discount_type'] == 'percent':
                amount = amount * (100 - promo_code['discount_value']) / 100

    secret_key = os.getenv('PAYMOB_SECRET_KEY')
    public_key = os.getenv('PAYMOB_PUBLIC_KEY')
    paymob_url = os.getenv('PAYMOB_URL')

    headers = {
        'Authorization': f'Token {secret_key}',
        'Content-Type': 'application/json'
    }
    user = await get_database().get_collection('user').find_one({'_id': validate_bson_id(paymob_data.user_id)}, {'email': 1})
    payload = {
        'amount': amount * 100,
        'currency': 'EGP',
        'payment_methods': [5110299,5110298],
       # 'payment_methods': [5078771, 5084891],
        'billing_data': {
            'first_name': paymob_data.first_name,
            'last_name': paymob_data.last_name,
            'phone_number': paymob_data.phone_number,
            'email': user['email']
        },
        "redirection_url": "https://traceedtech.com/#/PaymobCallBack"
    }
    if paymob_data.type == 'subscription_plan':
        payload['subscription_plan_id'] = plan['paymob_id']
        payload['payment_methods'] = [5110299]
        payload['subscription_start_date'] = (datetime.now() + timedelta(days=1)).strftime("%Y-%m-%d")

    async with httpx.AsyncClient() as client:
        response = await client.post(paymob_url, json=payload, headers=headers)

    data = response.json()
    client_secret = data.get('client_secret')
    if not client_secret:
        return ServiceResponse(msg='failed to get secret key', success=False)

    order = Order(order_id=str(data['intention_order_id']), plan_course_id=str(paymob_data.plan_course_id), type=paymob_data.type, user_id=paymob_data.user_id)
    mdb_result = await get_database().get_collection('order').insert_one(order.model_dump())
    if not mdb_result:
        ServiceResponse(success=False, msg='failed to save order')
    return ServiceResponse(success=True, data={'link': f"https://accept.paymob.com/unifiedcheckout/?publicKey={public_key}&clientSecret={client_secret}"})


async def verify_order(payment_verification: PaymentVerification):
    load_dotenv(override=True)
    paymob_hmac = os.getenv('PAYMOB_HMAC')
    hmac_result = hmac.new(paymob_hmac.encode('utf-8'),
                           payment_verification.hmac_str.encode('utf-8'),
                           hashlib.sha512).hexdigest()
    if not (hmac_result == payment_verification.hmac_result and payment_verification.success):
        return ServiceResponse(data={'result': False}, msg='hmac does not match', success=False)
    order = await get_database().get_collection('order').find_one({'order_id': payment_verification.order_id}, {'user_id': 1, 'type': 1, 'plan_course_id': 1})
    if not order:
        return ServiceResponse(success=False, msg='order not found', data={'result': False})
    if order['type'] == 'course':
        enrollment = Enrollment(student_id=order['user_id'], course_id=order['plan_course_id'])
        mdb_result = await get_database().get_collection("enrollment").find_one({"student_id": enrollment.student_id, "course_id": enrollment.course_id}, {"id": {"$toString": "$_id"}})
        if mdb_result:
            result = await enrollment_database.update_enrollment(enrollment_id=mdb_result['id'], update={'end_date': None})
        else:
            result = await enrollment_database.create_enrollment(enrollment)
            await get_database().get_collection('order').update_one({'order_id': payment_verification.order_id}, {'$set': {'is_success': True}})
        return result
    return ServiceResponse(success=True)


async def get_auth_token():
    load_dotenv(override=True)

    auth_token_url = os.getenv('PAYMOB_AUTH_TOKEN_URL')
    api_key = os.getenv('PAYMOB_API_KEY')
    payload = {
        'api_key': api_key,
    }
    headers = {
        'Content-Type': 'application/json'
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(auth_token_url, json=payload, headers=headers)

    data = response.json()
    if not (data and data['token']):
        return ServiceResponse(msg='error while requesting token', success=False)
    return ServiceResponse(data={'token': data['token']})


async def create_subscription_plan(plan: SubscriptionPlan):
    auth_token = await get_auth_token()
    if not auth_token.success:
        return ServiceResponse(success=False)

    create_plan_url = os.getenv('PAYMOB_CREATE_SUBSCRIPTION_PLAN')
    headers = {
        'Authorization': auth_token.data['token'],
        'Content-Type': 'application/json'
    }
    payload = {
        'frequency': plan.frequency,
        'name': plan.name,
        "reminder_days": plan.reminder_days,
        "retrial_days": plan.reminder_days,
        "use_transaction_amount": plan.use_transaction_amount,
        "integration": plan.integration,
        "webhook_url": plan.webhook_url
    }

    async with httpx.AsyncClient() as client:
        response = await client.post(create_plan_url, json=payload, headers=headers)

    data = response.json()
    if data and data['id']:
        plan.paymob_id = data['id']
        mdb_result = await get_database().get_collection('subscription_plan').insert_one(plan.model_dump())
        if mdb_result.inserted_id:
            return ServiceResponse(success=True, data={'subscription_plan_id': str(mdb_result.inserted_id)})
    return ServiceResponse(msg='could not add new subscription plan', success=False)


async def get_subscription_plans(program_id:str) -> ServiceResponse:
    
    subscription_plans = await get_database().get_collection('subscription_plan').find({'program_id':program_id},
                                                                                       {'_id': 0,
                                                                                        'id': {'$toString': '$_id'},
                                                                                        'frequency': 1,
                                                                                        'title': 1,
                                                                                        'price': 1,
                                                                                        'program_id': 1,
                                                                                        'track_id': 1,
                                                                                        'suitable_for': 1,
                                                                                        'suitable_for_name': 1,
                                                                                        'description': 1,
                                                                                        'freatures': 1,
                                                                                        'image': 1
                                                                                        }).to_list(length=None)
    return ServiceResponse(data={'subscription_plan': subscription_plans})


async def paymob_subscribe_callback(data: WebhookPayload):
    paymob_plan_id = data['subscription_data']['plan_id']
    subscription_plan = await get_database().get_collection('subscription_plan').find_one({'paymob_id': paymob_plan_id})
    email = data['subscription_data']['client_info']['email']
    if not email:
        print('email not found')
        return ServiceResponse(success=False, msg='email not found')
    user = await get_database().get_collection('user').find_one({'email': email}, {'id': {'$toString': '$_id'}})
    subscription_plan_id = str(subscription_plan['_id'])
    if not (user and user['id']):
        print('email is incorrect')
        return ServiceResponse('email is incorrect')
    user_id = user['id']
    subscription = await get_database().get_collection('subscription').find_one({'user_id': user_id, 'subscription_plan_id': subscription_plan_id}, {'_id': 1})

    new_date = datetime.strptime(data['subscription_data']['starts_at'], "%Y-%m-%d") + timedelta(days=data['subscription_data']['frequency'])
    end_date = new_date.strftime("%Y-%m-%d")
    today_str = datetime.now().strftime("%Y-%m-%d")
    if subscription:
        mdb_result = await get_database().get_collection('subscription').update_one({'_id': subscription}, {'$set': {'end_date': end_date, 'updated_at': today_str}})
        if mdb_result.modified_count < 1:
            print('could not update subscription')
            return ServiceResponse(success=False, msg='could not update subscription')

    if not subscription:
        subscription = Subscription(user_id=user_id,
                                    subscription_plan_id=subscription_plan_id,
                                    start_date=today_str,
                                    end_date=end_date,
                                    created_at=today_str,
                                    updated_at=today_str,
                                    status='active')
        mdb_result = await get_database().get_collection('subscription').insert_one(subscription.model_dump())
        if mdb_result.inserted_id:
            return ServiceResponse(data={'subscription_id': str(mdb_result.inserted_id)})
        print('could not add subscription')
        return ServiceResponse(success=False, msg='could not add subscription')

    # program = await get_database().get_collection('program').find_one({'_id':validate_bson_id(subscription_plan['program_id'])})
    # if not program:
    #     print('program not found')
    #     return ServiceResponse(success=False,msg='program not found')
    # track = next((t for t in program.get("tracks", []) if t["id"] == subscription_plan['track_id']), None)
    # if not track:
    #     print('track not found')
    #     return ServiceResponse(success=False,msg='track not found')
    # course_ids = set(track.get("courses", []))

    # for level in track.get("levels", []):
    #     course_ids.update(level.get("courses", []))

    # for course_id in course_ids:
    #     enrollment = await get_database().get_collection("enrollment").find_one({"student_id": str(user_id), "course_id": course_id}, {"_id": 1, 'end_date': 1})

    #     if enrollment and enrollment['end_date'] == None:
    #         continue

    #     if enrollment and enrollment['end_date']:
    #         await get_database().get_collection('enrollment').update_one({'_id':enrollment['_id']},{'$set':{'end_date':end_date}})
    #         continue

    #     if not enrollment:
    #         new_enrollment = Enrollment(student_id=user_id, course_id=course_id, end_date=end_date)
    #         await get_database().get_collection('enrollment').insert_one(new_enrollment.model_dump())
    #         continue

    # return ServiceResponse(msg='enrollment updated',success=True)
