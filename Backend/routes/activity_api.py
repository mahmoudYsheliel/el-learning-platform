from fastapi import APIRouter, Body,Depends
from models.activity import Activity
import database.activity_database as activity_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_activity') 
async def get_activitys(activity_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await activity_database.get_activity(activity_id,userId)
    return res



@router.post('/delete_activity')
async def delete_activity(activity_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await activity_database.delete_activity(activity_id)
    return res


@router.post('/update_activity')
async def update_activity(activity_id:str=Body(embed=True),update:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await activity_database.update_activity(activity_id,update)
    return res


@router.post('/create_activity')
async def create_activity(new_activity:Activity =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await activity_database.create_activity(new_activity)
    return res

