from fastapi import APIRouter, Body,Depends,Request
from models.paymob import Paymob, PaymentVerification, Order,WebhookPayload,SubscriptionPlan
import database.paymob_database as paymob_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from fastapi.responses import RedirectResponse
import json

router = APIRouter()


@router.post('/get_payment_link') 
async def get_payment_link(paymob_data: Paymob =Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    paymob_data.user_id = str(userId)
    res = await paymob_database.get_payment_link(paymob_data)
    return res


             
@router.post('/verify_order')
async def verify_order(payment_verification:PaymentVerification = Body(embed=True),user_id:str =Depends(auth_user)):
    payment_verification.user_id = user_id
    res = await paymob_database.verify_order(payment_verification)
    return res


@router.post('/test')
async def test(user_id:str =Depends(auth_user)):
    res = await paymob_database.test(user_id)
    return res



@router.post('/create_subscription_plan')
async def create_subscription_plan(plan:SubscriptionPlan = Body(embed=True),user_id:str =Depends(auth_user)):
    res = await paymob_database.create_subscription_plan(plan)
    return res


@router.post('/paymob_subscribe_callback')
async def test(request:Request):
    body = await request.json()
    res = await paymob_database.paymob_subscribe_callback(body)
    return res