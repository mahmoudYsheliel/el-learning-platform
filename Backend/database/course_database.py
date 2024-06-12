from models.course import Course
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id


async def create_course(course: Course) -> ServiceResponse:
    course.number_of_enrollments=0
    for chapter in course.chapters:
        for mat in chapter.materials:
            bson_id=validate_bson_id(mat.Id)
            if not bson_id:
                return ServiceResponse(success=False,msg='bad material id' + mat.name)
        
            if mat.type == 'Lesson':
                result = await get_database().get_collection('lesson').find_one({'_id':bson_id})
                if not result:
                    return ServiceResponse(success=False,msg='bad lesson id')
            elif mat.type == 'Quiz':
                result = await get_database().get_collection('quiz').find_one({'_id':bson_id})
                if not result:
                    return ServiceResponse(success=False,msg='bad quiz id')
            elif mat.type == 'Assesment':
                result = await get_database().get_collection('assesment').find_one({'_id':bson_id})
                if not result:
                    return ServiceResponse(success=False,msg='bad assesment id')
            
        
  
    for category in course.categories:
        bson_id=validate_bson_id(category.Id)
        if not bson_id:
            return ServiceResponse(success=False,msg='bad category id')
        result = await get_database().get_collection('category').find_one({'_id':bson_id})
        if not result:
            return ServiceResponse(success=False,msg='bad category id')
           
        
        
    mdb_result = await get_database().get_collection('course').insert_one(course.model_dump())
    course_id =str(mdb_result.inserted_id)
    if course_id:
        return ServiceResponse(data={'course_id': course_id})
    return ServiceResponse(success=False,msg="couln't add course",status_code=409 )




async def delete_course(course_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad course ID')

    result = await get_database().get_collection('course').find_one({'_id': bson_id})
    if not result:
        return ServiceResponse(success=False,msg='bad course id')
    for chapter in result.chapters:
        for mat in chapter.material:
            bson_id=validate_bson_id(mat.Id)
            if not bson_id:
                return ServiceResponse(success=False,msg='bad material id' + mat.name)
        
            if mat.name == 'Lesson':
                result = await get_database().get_collection('lesson').delete_one({'_id':bson_id})
                if not result:
                    return ServiceResponse(success=False,msg='bad lesson id')
            elif mat.name == 'Quiz':
                result = await get_database().get_collection('quiz').delete_one({'_id':bson_id})
                if not result:
                    return ServiceResponse(success=False,msg='bad quiz id')
            elif mat.name == 'Assesment':
                result = await get_database().get_collection('assesment').delete_one({'_id':bson_id})
                if not result:
                    return ServiceResponse(success=False,msg='bad assesment id')
        
    result = await get_database().get_collection('course').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='course not Found')
    return ServiceResponse(mag='OK')



async def update_course(course_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad course ID')

    course_model_fields = set(Course.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(course_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid course Update Keys')

    result = await get_database().get_collection('course').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='course not Found')
    return ServiceResponse(msg='OK')



async def get_course(course_id:str)-> ServiceResponse:
    bson_id=validate_bson_id(course_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad course ID')

    course = await get_database().get_collection('course').find_one({'_id':bson_id}, {
        '_id': 0,
        'title':1,
        'description':1,
        'price':1,
        'image':1,
        'duration':1,
        'min_age':1,
        'max_age':1,
        'objectives':1,
        'chapters':1,
        'categories':1,
        
    })
    if not course:
        return ServiceResponse(success=False,status_code=404, msg='course Not Found')

    return ServiceResponse(data={'course': course})





async def get_all_courses(): 
    courses = await get_database().get_collection('course').find({}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'title':1,
        'image':1,
        'duration':1,
        'category':1,
        'min_age':1,
        'max_age':1,
        'categories':1
    }).to_list(length=None)
    
    if not courses:
        return ServiceResponse(success=False,status_code=404, msg='courses Not Found')
    return ServiceResponse(data={'courses': courses})


async def get_all_instructor_courses(main_instructor_id):
    courses = await get_database().get_collection('course').find({'main_instructor':main_instructor_id}, {
        '_id': 0,
        'id': {'$toString': '$_id'},
        'title':1,
        'image':1,
        'duration':1,
        'category':1,
        'min_age':1,
        'max_age':1,
        'categories':1
    }).to_list(length=None)
    
    if not courses:
       return ServiceResponse(data={'courses': courses})
    return ServiceResponse(data={'courses': courses})