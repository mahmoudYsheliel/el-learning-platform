from models.otp import OTP
from models.runtime import ServiceResponse
from database.mongo_driver import get_database, validate_bson_id
import random
from lib.crypto import create_access_token, hash_password, decode_jwt_token, validate_bson_id
from lib.email_service import send_password_reset_email


async def create_otp(email: str):
    user = await get_database().get_collection('user').find_one({'email': email}, {'id': {'$toString': '$_id'}})
    if not (user and user['id']):
        return ServiceResponse(success=False, msg='user does not exist')

    id = user['id']
    access_token = create_access_token({'id': id})

    otp_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
    mdb_otp = await get_database().get_collection('otp').find_one({'otp': otp_code})
    while mdb_otp:
        otp_code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        mdb_otp = await get_database().get_collection('otp').find_one({'otp': otp_code})

    otp = OTP(otp=otp_code, token=access_token, is_used=False)
    result = await get_database().get_collection('otp').insert_one(otp.model_dump())
    otp_id = str(result.inserted_id)
   # link = f"https://www.traceedtech.com/#/forgotPassword/{access_token}"

    link = f"http://localhost:5173/#/forgotPassword/{access_token}"

    send_password_reset_email(reset_link=link, to_email=email, otp_code=otp)
    return ServiceResponse(success=True, msg='reset link sent successfully')


async def send_token_using_otp(otp: str):
    mdb_otp = await get_database().get_collection('otp').find_one({'otp': otp},{'token':1})
    if not mdb_otp:
        return ServiceResponse(success=False, msg='OTP does not exist')
    
    token = mdb_otp['token']
    await get_database().get_collection('otp').delete_many({'otp':otp})
    return ServiceResponse(data={'token':token},success=True)


async def reset_password(password:str, token:str):
    try:
        decoded = decode_jwt_token(token=token)
        user_id = decoded['id']
        bson_id = validate_bson_id(user_id)
        if not bson_id:
            return ServiceResponse(success=False, msg="Couldn't Find User", status_code=409)
        user = await get_database().get_collection('user').find_one({'_id':bson_id})
        if not user:
            return ServiceResponse(success=False, msg="Couldn't Find User", status_code=409)

        new_pass = hash_password(password=password)
        mdb_result = await get_database().get_collection('user').update_one({'_id':bson_id},{'$set':{'hashed_pass':new_pass}})
        if  mdb_result.modified_count <=0:
            return ServiceResponse(success=False, msg="Couldn't Find User", status_code=409)
        access_token = create_access_token({'id': id})
        return ServiceResponse(success=True, msg="Couldn't Find User", data={'access_token':access_token})

        
    except:
        return ServiceResponse(success=False,msg='failed to reset password')