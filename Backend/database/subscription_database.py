from models.subscription import Subscription
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id


async def create_subscription(subscription: Subscription) -> ServiceResponse:
    mdb_result = await get_database().get_collection('subscription').insert_one(subscription.model_dump())
    subscription_id = str(mdb_result.inserted_id)
    if subscription_id:
        return ServiceResponse(data={'subscription_id': subscription_id})
    return ServiceResponse(success=False, msg="couln't add subscription", status_code=409)


async def delete_subscription(subscription_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(subscription_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad subscription ID')

    result = await get_database().get_collection('subscription').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='subscription not Found')
    return ServiceResponse(mag='OK')


async def update_subscription(subscription_id: str, update: dict) -> ServiceResponse:
    bson_id = validate_bson_id(subscription_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad subscription ID')

    subscription_model_fields = set(Subscription.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(subscription_model_fields):
        return ServiceResponse(status_code=400, msg='Invalid subscription Update Keys')

    result = await get_database().get_collection('subscription').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='subscription not Found')
    return ServiceResponse(msg='OK')


async def get_subscription(subscription_id: str) -> ServiceResponse:
    bson_id = validate_bson_id(subscription_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad subscription ID')
    subscription = await get_database().get_collection('subscription').find_one({'_id': bson_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'user_id': 1,
        'subscription_plan_id': 1,
        'start_date': 1,
        'end_date': 1,
        'created_at': 1,
        'updated_at': 1,
        'status':1,
        'auto_enroll':1,   

    })
    if not subscription:
        return ServiceResponse(success=False, status_code=404, msg='subscription Not Found')
    return ServiceResponse(data={'subscription': subscription})
