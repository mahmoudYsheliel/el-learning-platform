from models.project import Project
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id



async def create_project(project: Project) -> ServiceResponse:
    mdb_result = await get_database().get_collection('project').insert_one(project.model_dump())
    project_id =str(mdb_result.inserted_id)
    if project_id:
        return ServiceResponse(data={'project_id': project_id})
    return ServiceResponse(success=False,msg="couln't add project",status_code=409 )


async def delete_project(losson_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(losson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad project ID')

    result = await get_database().get_collection('project').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='project not Found')
    return ServiceResponse(mag='OK')


async def update_project(project_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(project_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad project ID')

    project_model_fields = set(Project.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(project_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid project Update Keys')

    result = await get_database().get_collection('project').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='project not Found')
    return ServiceResponse(msg='OK')


async def get_project(project_id:str,userId:str)-> ServiceResponse:
    bson_id=validate_bson_id(project_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad project ID')
    user_type = await get_database().get_collection('user').find_one({'_id':userId})
    if user_type['user_type'] == 'Admin':
      
        project = await get_database().get_collection('project').find_one({'_id':bson_id}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'title':1,
            'description':1,
            'source':1,
            'source2':1
            
        })
        if not project:
            return ServiceResponse(success=False,status_code=404, msg='project Not Found')
        return ServiceResponse(data={'project': project})
    if user_type['user_type'] == 'Child':
        
        course_id = await get_database().get_collection('course').find_one({'chapters.materials.Id':project_id},{'_id':1})
        if not course_id:
            return ServiceResponse(status_code=400, msg='This project not Found in any Course')
        enrollmet_id = await get_database().get_collection('enrollment').find_one({'course_id':str(course_id['_id']),'student_id':str(userId)},{'_id':1})
        if not enrollmet_id:
            return ServiceResponse(status_code=400, msg='This Course is not Available for This Student')

        project = await get_database().get_collection('project').find_one({'_id':bson_id}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'title':1,
            'description':1,
            'source':1,
            'source2':1
            
        })
        if not project:
            return ServiceResponse(success=False,status_code=404, msg='project Not Found')
        return ServiceResponse(data={'project': project})
    return ServiceResponse(success=False,status_code=404, msg='User Not Allowed')


