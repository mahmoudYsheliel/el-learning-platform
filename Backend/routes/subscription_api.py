from fastapi import APIRouter, Body,Depends
from models.subscription import Subscription
import database.subscription_database as subscription_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_subscription') 
async def get_subscriptions(subscription_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await subscription_database.get_subscription(subscription_id,userId)
    return res



@router.post('/delete_subscription')
async def delete_subscription(subscription_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await subscription_database.delete_subscription(subscription_id)
    return res


@router.post('/update_subscription')
async def update_subscription(subscription_id:str=Body(embed=True),update:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await subscription_database.update_subscription(subscription_id,update)
    return res


@router.post('/create_subscription')
async def create_subscription(new_subscription:Subscription =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    new_subscription.user_id = str(userId)
    res = await subscription_database.create_subscription(new_subscription)
    return res

