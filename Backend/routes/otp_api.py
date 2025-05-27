from fastapi import APIRouter, Body,Depends
from models.otp import OTP
import database.otp_database as otp_database
from models.runtime import ServiceResponse

router  =APIRouter()


@router.post('/get_forget_pass_email')
async def get_forget_pass_email(email:str = Body(embed=True)):
    res = await otp_database.create_otp(email=email)
    return res

@router.post('/send_token_using_otp')
async def send_token_using_otp(otp:str =Body(embed=True)):
    res = await otp_database.send_token_using_otp(otp)
    return res

@router.post('/reset_pass')
async def reset_password(password:str=Body(embed=True), token:str=Body(embed=True)):
    res = await otp_database.reset_password(password,token)
    return res