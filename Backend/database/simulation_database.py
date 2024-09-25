from models.simulation import Simulation
from models.runtime import ServiceResponse
from database.mongo_driver import  get_database,validate_bson_id



async def create_simulation(simulation: Simulation) -> ServiceResponse:
    mdb_result = await get_database().get_collection('simulation').insert_one(simulation.model_dump())
    simulation_id =str(mdb_result.inserted_id)
    if simulation_id:
        return ServiceResponse(data={'simulation_id': simulation_id})
    return ServiceResponse(success=False,msg="couln't add simulation",status_code=409 )


async def delete_simulation(losson_id: str) -> ServiceResponse:
    bson_id=validate_bson_id(losson_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad simulation ID')

    result = await get_database().get_collection('simulation').delete_one({'_id': bson_id})
    if not result.deleted_count:
        return ServiceResponse(success=False, status_code=404, msg='simulation not Found')
    return ServiceResponse(mag='OK')


async def update_simulation(simulation_id: str, update: dict) -> ServiceResponse:
    bson_id=validate_bson_id(simulation_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad simulation ID')

    simulation_model_fields = set(Simulation.model_fields.keys())
    update_patch_fields = set(update.keys())
    if not update_patch_fields.issubset(simulation_model_fields):
        return ServiceResponse(status_code=400 ,msg='Invalid simulation Update Keys')

    result = await get_database().get_collection('simulation').update_one(
        {'_id': bson_id}, {'$set': update}
    )
    if not result.modified_count:
        return ServiceResponse(success=False, status_code=404, msg='simulation not Found')
    return ServiceResponse(msg='OK')


async def get_simulation(simulation_id:str,userId:str)-> ServiceResponse:
    user_type = await get_database().get_collection('user').find_one({'_id':userId})
    bson_id=validate_bson_id(simulation_id)
    if not bson_id:
        return ServiceResponse(status_code=400, msg='Bad simulation ID')
    if user_type['user_type'] == 'Admin':
        simulation = await get_database().get_collection('simulation').find_one({'_id':bson_id}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'title':1,
            'description':1,
            'image':1,
            'source':1,
            
        })
        if not simulation:
            return ServiceResponse(success=False,status_code=404, msg='simulation Not Found')
        return ServiceResponse(data={'simulation': simulation})
    
    if user_type['user_type'] == 'Child':
        
        course_id = await get_database().get_collection('course').find_one({'chapters.materials.Id':simulation_id},{'_id':1})
        if not course_id:
            return ServiceResponse(status_code=400, msg='This simulation not Found in any Course')
        enrollmet_id = await get_database().get_collection('enrollment').find_one({'course_id':str(course_id['_id']),'student_id':str(userId)},{'_id':1})
        if not enrollmet_id:
            return ServiceResponse(status_code=400, msg='This Course is not Available for This Student')

        simulation = await get_database().get_collection('simulation').find_one({'_id':bson_id}, {
            '_id': 0,
            'id': {'$toString': '$_id'},
            'title':1,
            'description':1,
            'image':1,
            'source':1,
            
        })
        if not simulation:
            return ServiceResponse(success=False,status_code=404, msg='simulation Not Found')
        return ServiceResponse(data={'simulation': simulation})
    return ServiceResponse(success=False,status_code=404, msg='User Not Allowed')


