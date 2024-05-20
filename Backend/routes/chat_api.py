from fastapi import APIRouter, Body,Depends
from models.chat import Chat,Message
import database.chat_database as chat_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse


router = APIRouter()


@router.post('/get_chat') 
async def get_chat(chat_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await chat_database.get_chat(chat_id)
    return res




@router.post('/create_chat')
async def create_chat(new_chat:Chat =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await chat_database.create_chat(new_chat)
    return res


@router.post('/send_message')
async def send_message(chat_id:str=Body(embed=True),message:Message =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await chat_database.send_message(chat_id,message)
    return res
