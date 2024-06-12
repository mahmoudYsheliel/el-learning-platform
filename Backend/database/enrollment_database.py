from models.enrollments import Enrollment,RequestEnrollment
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id


async def create_enrollment(enrollment: Enrollment) -> ServiceResponse:

    mdb_result = await get_database().get_collection('enrollment').find_one({'student_id':enrollment.student_id,'course_id':enrollment.course_id},{'id': {'$toString': '$_id'},})
    if mdb_result:
        return ServiceResponse(data={'enrollment_id': mdb_result['id']})

    
    user_bson = validate_bson_id(enrollment.student_id)
    user = await get_database().get_collection('user').find_one({'_id':user_bson},{'balance':1})
    
    course_bson = validate_bson_id(enrollment.course_id)
    if not course_bson:
        return ServiceResponse(success=False,msg="couln't find course",status_code=409 )


    course = await get_database().get_collection('course').find_one({'_id':course_bson},{'price':1,'number_of_enrollments':1})
    if not course:
        return ServiceResponse(success=False,msg="couln't find course",status_code=409 )

   

    
    if course['price'] > user['balance']:
        pass
      #  return ServiceResponse(success=False,msg="not enough balance",status_code=409 )
    else:
        new_balance = user['balance'] - course['price'] 
        result = await get_database().get_collection('user').update_one({'_id':user_bson}, {'$set':{ 'balance':new_balance}})
        await get_database().get_collection('course').update_one(
        {'_id': course_bson}, {'$set': {'number_of_enrollments':course['number_of_enrollments']+1}}
    )
        if not result.modified_count:
          return ServiceResponse(success=False, status_code=404, msg='enrollment not Found')
  
    
    
        
    mdb_result = await get_database().get_collection('enrollment').insert_one(enrollment.model_dump())
    enrollment_id =str(mdb_result.inserted_id)
    if enrollment_id:
        return ServiceResponse(data={'enrollment_id': enrollment_id})
    return ServiceResponse(success=False,msg="couln't add enrollment",status_code=409 )




async def delete_enrollment(enrollment_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(enrollment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad enrollment ID')

    result = await get_database().get_collection('enrollment').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='enrollment not Found')
    return ServiceResponse(mag='OK')



async def update_enrollment(enrollment_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(enrollment_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad enrollment ID')

    enrollment_model_fields = set(Enrollment.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(enrollment_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid enrollment Update Keys')

    result = await get_database().get_collection('enrollment').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='enrollment not Found')
    return ServiceResponse(msg='OK')



async def get_enrollment(course_id:str,user_id:str)-> ServiceResponse:
    bson_id=validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad enrollment ID')

    bson_student_id=validate_bson_id(user_id)
    
    enrollment = await get_database().get_collection('enrollment').find_one({'student_id':str(user_id),"course_id":course_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'progress':1,
    })
    if not enrollment:
        return ServiceResponse(success=False,status_code=404, msg='enrollment Not Found')
    return ServiceResponse(data={'enrollment': enrollment})





async def get_all_enrollments(user_id:str): 
    bson_student_id=validate_bson_id(user_id)
    if(bson_student_id):
        enrollments = await get_database().get_collection('enrollment').find({"student_id":str(user_id)}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'course_id':1,
            'progress':1,
        }).to_list(length=None)
    
        if  enrollments:
            return ServiceResponse(data={'enrollments': enrollments})
    return ServiceResponse(success=False,status_code=404, msg='enrollments Not Found')




async def request_enrollment(requesr:RequestEnrollment): 
    
    mdb_result = await get_database().get_collection('requesrt_enrollment').insert_one(requesr.model_dump())
    requesrt_enrollment_id =str(mdb_result.inserted_id)
    if requesrt_enrollment_id:
        return ServiceResponse(data={'requesrt_enrollment_id': requesrt_enrollment_id})
    return ServiceResponse(success=False,msg="couln't add enrollment",status_code=409 )