from models.user import User
from models.runtime import ServiceResponse
from database.mongo_driver import get_database,validate_bson_id
from lib.crypto import verify_password


async def create_user(user: User) -> ServiceResponse:
    found_user=await get_database().get_collection("user").find_one({'email':user.email})
    if found_user:
        return ServiceResponse(success=False,status_code=409 ,msg='email is already used once')
    found_user=await get_database().get_collection("user").find_one({'username':user.username})
    if found_user:
        return ServiceResponse(success=False,status_code=409,msg='username is already used once')
    mdb_result = await get_database().get_collection("user").insert_one(user.model_dump())
    user_id = str(mdb_result.inserted_id)
    return ServiceResponse(data={"user_id": user_id})


async def validate_user(username: str, password: str) -> ServiceResponse:
    # check user in database
    user = await get_database().get_collection("user").find_one({"username": username})
    
    if not user:
        return False

    # check password hash
    user = User.model_validate(user)
    
    if not verify_password(password, user.hashed_pass):
        return False
    return True
   
async def personal_info(user_id:str):
    bson_id = validate_bson_id(user_id)
    if not bson_id:
        return ServiceResponse(success=False,msg="Couldn't Find User",status_code=409 )
    data = await get_database().get_collection('user').find_one({'_id':bson_id},
        {
            '_id':0,
            'balance':1,
            'role':1,
            'username':1,
        })
    if not data:
        return ServiceResponse(success=False,status_code=400, msg="Couldn't Find User")
    
    if data['role']==0:
        data['role'] = 'STUDENT'
    if data['role']==1:
        data['role'] = 'INSTRUCTOR'
        
    return ServiceResponse(data={'info': data})


