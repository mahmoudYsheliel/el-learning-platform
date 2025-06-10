from models.paymob import Paymob,PaymentVerification,Order
from models.enrollments import Enrollment
import database.enrollment_database as enrollment_database
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
import os
from dotenv import load_dotenv
import requests
from datetime import datetime
import httpx
import json
import hmac
import hashlib


async def get_payment_link(paymob_data: Paymob) -> ServiceResponse:
    load_dotenv(override=True)
    amount = 0

    order_type = paymob_data.type
    if not (order_type == 'subscription_plan' or order_type == 'course'):
        return ServiceResponse(msg='type error', success=False)

    order_bson_id = validate_bson_id(paymob_data.plan_course_id)
    if not order_bson_id:
        return ServiceResponse(msg='bson id error', success=False)

    if order_type == 'subscription_plan':
        plan = await get_database().get_collection('subscription_plan').find_one({'_id': order_bson_id}, {'price': 1, 'title': 1})
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

    payload = {
        'amount': amount * 100,
        'currency': 'EGP',
        'payment_methods': [5110299,5110298],
        #'payment_methods': [5078771],
        'billing_data': {
            'first_name': paymob_data.first_name,
            'last_name': paymob_data.last_name,
            'phone_number': paymob_data.phone_number
        },
        "redirection_url": "https://www.traceedtech.com/#/PaymobCallBack"
    }
    async with httpx.AsyncClient() as client:
        response = await client.post(paymob_url, json=payload, headers=headers)

    data = response.json()
    client_secret = data.get('client_secret')
    if not client_secret:
        return ServiceResponse(msg='failed to get secret key', success=False)

    order = Order(order_id=str(data['intention_order_id']),plan_course_id=paymob_data.plan_course_id,type=paymob_data.type,user_id=paymob_data.user_id)
    mdb_result = await get_database().get_collection('order').insert_one(order.model_dump())
    if not mdb_result:
        ServiceResponse(success=False, msg='failed to save order')
    return ServiceResponse(success=True, data={'link': f"https://accept.paymob.com/unifiedcheckout/?publicKey={public_key}&clientSecret={client_secret}"})




async def verify_order(payment_verification:PaymentVerification ):
    load_dotenv(override=True)
    paymob_hmac = os.getenv('PAYMOB_HMAC')
    hmac_result =  hmac.new(paymob_hmac.encode('utf-8'),
             payment_verification.hmac_str.encode('utf-8'),
             hashlib.sha512).hexdigest()
    if not(hmac_result == payment_verification.hmac_result and payment_verification.success):
        return ServiceResponse(data={'result': False},msg='hmac does not match',success=False)
    order = await get_database().get_collection('order').find_one({'order_id':payment_verification.order_id},{'user_id':1,'type':1,'plan_course_id':1})
    if not order:
        return ServiceResponse(success=False,msg='order not found',data={'result': False})
    if order['type'] == 'course':
        enrollment = Enrollment(student_id = order['user_id'],course_id = order['plan_course_id'])
        result = await enrollment_database.create_enrollment(enrollment)
        await get_database().get_collection('order').update_one({'order_id':payment_verification.order_id},{'$set':{'is_success':True}})
        return result
    return ServiceResponse(success=False)

    
    
    