from fastapi import APIRouter, Body,Depends
from models.paymob import Paymob
import database.paymob_database as paymob_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse


router = APIRouter()


@router.post('/get_payment_link') 
async def get_payment_link(paymob_data: Paymob =Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    paymob_data.user_id = userId
    print('pay user id: ' ,userId)
    res = await paymob_database.get_payment_link(paymob_data)
    return res