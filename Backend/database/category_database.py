from models.category import Category
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id



async def create_category(category: Category) -> ServiceResponse:
    mdb_result = await get_database().get_collection('category').insert_one(category.model_dump())
    category_id =str(mdb_result.inserted_id)
    if category_id:
        return ServiceResponse(data={'category_id': category_id})
    return ServiceResponse(success=False,msg="couln't add category",status_code=409 )


async def delete_category(losson_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(losson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad category ID')

    result = await get_database().get_collection('category').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='category not Found')
    return ServiceResponse(mag='OK')


async def update_category(category_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(category_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad category ID')

    category_model_fields = set(Category.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(category_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid category Update Keys')

    result = await get_database().get_collection('category').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='category not Found')
    return ServiceResponse(msg='OK')


async def get_category(category_id:str)-> ServiceResponse:
    bson_id=validate_bson_id(category_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad category ID')

    category = await get_database().get_collection('category').find_one({'_id':bson_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'category':1,
        'description':1,
        'image':1,
        
    })
    if not category:
        return ServiceResponse(success=False,status_code=404, msg='category Not Found')
    return ServiceResponse(data={'category': category})


async def get_categories(): 
    categories = await get_database().get_collection('category').find({}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'image':1,
        'duration':1,
        'category':1,
        'description':1,
        
    }).to_list(length=None)
    
    
    if not categories:
        return ServiceResponse(success=False,status_code=404, msg='categories Not Found')
    return ServiceResponse(data={'categories': categories})
