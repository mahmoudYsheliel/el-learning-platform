from fastapi import APIRouter, Body,Depends
from models.promo_code import PromoCode
import database.promo_code_database as promo_code_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse


router = APIRouter()


@router.post('/get_promo_code') 
async def get_promo_codes(promo_code_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await promo_code_database.get_promo_code(promo_code_id)
    return res



@router.post('/delete_promo_code')
async def delete_promo_code(promo_code_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await promo_code_database.delete_promo_code(promo_code_id)
    return res


@router.post('/update_promo_code')
async def update_promo_code(promo_code_id:str=Body(embed=True),new_promo_code:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await promo_code_database.update_promo_code(promo_code_id,new_promo_code)
    return res


@router.post('/create_promo_code')
async def create_promo_code(new_promo_code:PromoCode =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await promo_code_database.create_promo_code(new_promo_code)
    return res

