from models.promo_code import PromoCode
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id



async def create_promo_code(promo_code: PromoCode) -> ServiceResponse:
    mdb_result = await get_database().get_collection('promo_code').insert_one(promo_code.model_dump())
    promo_code_id =str(mdb_result.inserted_id)
    if promo_code_id:
        return ServiceResponse(data={'promo_code_id': promo_code_id})
    return ServiceResponse(success=False,msg="couln't add promo_code",status_code=409 )


async def delete_promo_code(promo_code_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(promo_code_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad promo_code ID')

    result = await get_database().get_collection('promo_code').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='promo_code not Found')
    return ServiceResponse(mag='OK')


async def update_promo_code(promo_code_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(promo_code_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad promo_code ID')

    promo_code_model_fields = set(PromoCode.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(promo_code_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid promo_code Update Keys')

    result = await get_database().get_collection('promo_code').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='promo_code not Found')
    return ServiceResponse(msg='OK')


async def get_promo_code(promo_code_id:str)-> ServiceResponse:
   
    bson_id=validate_bson_id(promo_code_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad promo_code ID')
    promo_code = await get_database().get_collection('promo_code').find_one({'_id':bson_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'code':1,
        'discount':1
    })
    if not promo_code:
        return ServiceResponse(success=False,status_code=404, msg='promo_code Not Found')
    return ServiceResponse(data={'promo_code': promo_code})


