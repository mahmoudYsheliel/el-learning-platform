from models.promo_code import PromoCode
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id
from datetime import datetime


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



async def apply_promocode(amount:float, promo_code :str)->ServiceResponse:
    promo_code_record = await get_database().get_collection('promo_code').find_one({'code':promo_code},{'discount_type':1,'discount_value': 1,'expiry_date':1,'usage_limit':1,'used_count':1})
    if not promo_code_record:
        return ServiceResponse(success=False,msg='no promo code found',status_code=400)
    
    now = datetime.now()
    expiry_date = datetime.strptime(promo_code_record['expiry_date'], "%Y-%m-%d")
    
    if now > expiry_date:
        return ServiceResponse(msg='expired promo code',status_code=400,success=False)
    
    if promo_code_record['used_count'] >= promo_code_record['usage_limit']:
        return ServiceResponse(msg='promo code limit',status_code=400,success=False)
    
    new_amount = amount
    if promo_code_record['discount_type'] == 'fixed': 
        new_amount = new_amount - promo_code_record['discount_value']
        
    if promo_code_record['discount_type'] == 'percent': 
        new_amount = new_amount * ( 100 - promo_code_record['discount_value'])/100
    
    return ServiceResponse(success=True,data={'amount': new_amount})
    

    