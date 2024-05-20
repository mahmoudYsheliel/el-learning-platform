from fastapi import APIRouter, Body,Depends
from models.user import User
from database.user_database import validate_user,create_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database

from lib.crypto import create_access_token,get_password_hash
from typing import Annotated
from fastapi.security import  OAuth2PasswordRequestForm
from datetime import  timedelta
from models.user import Token
from lib.crypto import auth_user
import database.user_database as user_database



router = APIRouter()

async def get_userid(username):
    id=await get_database().get_collection('user').find_one({'username':username},{ 'id': {'$toString': '$_id'},'_id':0})
    return  id['id']

async def get_user_role(username):
    role=await get_database().get_collection('user').find_one({'username':username},{'role':1,'_id':0})
    return  role['role']


@router.post("/token")
async def login_for_access_token(
    form_data: Annotated[OAuth2PasswordRequestForm, Depends()]
) -> Token|ServiceResponse:
    valid = await validate_user(form_data.username,form_data.password)
    if not valid:
        return ServiceResponse(success=False,msg="no such user",status_code=404)

    userid = await get_userid(form_data.username)
    user_role = await get_user_role(form_data.username)
    access_token_expires = timedelta(minutes=1e6)
    access_token = create_access_token(
        data={'userId':userid,'user_role':user_role}, expires_delta=access_token_expires
    )
    return Token(access_token=access_token)

@router.post('/signup')
async def signup(user:User =Body(embed=True)):
    try:
        return await create_user(user)
    except:
        return ServiceResponse(success=False,msg="couldn't add user",status_code=400)


@router.post('/personal_info')
async def personal_info(userId:str = Depends(auth_user)):
    res =  await user_database.personal_info(userId)
    return res




