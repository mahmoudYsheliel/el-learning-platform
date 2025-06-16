from models.lesson import Lesson
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id
from datetime import datetime


async def create_lesson(lesson: Lesson) -> ServiceResponse:
    mdb_result = await get_database().get_collection('lesson').insert_one(lesson.model_dump())
    lesson_id =str(mdb_result.inserted_id)
    if lesson_id:
        return ServiceResponse(data={'lesson_id': lesson_id})
    return ServiceResponse(success=False,msg="couln't add lesson",status_code=409 )


async def delete_lesson(losson_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(losson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad Lesson ID')

    result = await get_database().get_collection('lesson').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='lesson not Found')
    return ServiceResponse(mag='OK')


async def update_lesson(lesson_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(lesson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad Lesson ID')

    lesson_model_fields = set(Lesson.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(lesson_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid Lesson Update Keys')

    result = await get_database().get_collection('lesson').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='lesson not Found')
    return ServiceResponse(msg='OK')


async def get_lesson(lesson_id:str,userId:str)-> ServiceResponse:
    bson_id=validate_bson_id(lesson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad Lesson ID')
    user_type = await get_database().get_collection('user').find_one({'_id':userId})
    
    if user_type['user_type'] == 'Admin':
        lesson = await get_database().get_collection('lesson').find_one({'_id':bson_id}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'title':1,
            'description':1,
            'order':1,
            'source':1,
            
        })
        if not lesson:
            return ServiceResponse(success=False,status_code=404, msg='Lesson Not Found')
        return ServiceResponse(data={'lesson': lesson})
    
    
    if user_type['user_type'] == 'Child':
        
        course_id = await get_database().get_collection('course').find_one({'chapters.materials.Id':lesson_id},{'_id':1})
        if not course_id:
            return ServiceResponse(status_code=400, msg='This Lesson not Found in any Course')
        enrollment = await get_database().get_collection('enrollment').find_one({'course_id':str(course_id['_id']),'student_id':str(userId)},{'_id':1,'end_date':1})
        if not (enrollment and (not enrollment['end_date'] or datetime.strptime(enrollment['end_date'], "%Y-%m-%d") >= datetime.now().utcnow())):
            return ServiceResponse(status_code=400, msg='This Course is not Available for This Student')

        lesson = await get_database().get_collection('lesson').find_one({'_id':bson_id}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'title':1,
            'description':1,
            'order':1,
            'source':1,
            
        })
        if not lesson:
            return ServiceResponse(success=False,status_code=404, msg='Lesson Not Found')
        return ServiceResponse(data={'lesson': lesson})
    return ServiceResponse(success=False,status_code=404, msg='User Not Allowed')





