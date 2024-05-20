from fastapi import APIRouter, Body,Depends
from models.assesment import Assesment,Question
import database.assesment_database as assesment_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse


router = APIRouter()


@router.post('/get_assesment') 
async def get_assesment(assesment_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await assesment_database.get_assesment(assesment_id)
    return res

@router.post('/create_assesment')
async def create_assesment(new_assesment:Assesment =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await assesment_database.create_assesment(new_assesment)
    return res

@router.post('/delete_assesment')
async def delete_assesment(assesment_id: str=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await assesment_database.delete_assesment(assesment_id)
    return res
    
@router.post('/update_assesment')
async def update_assesment(assesment_id: str=Body(embed=True), update: dict=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await assesment_database.update_assesment(assesment_id,update)
    return res
    





@router.post('/add_assesment_question')
async def add_question(assesment_id: str=Body(embed=True), question: Question=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await assesment_database.add_question(assesment_id,question)
    return res

    
@router.post('/delete_assesment_question')
async def delete_question(assesment_id: str=Body(embed=True), question_id: int=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await assesment_database.delete_question(assesment_id,question_id)
    return res

@router.post('/update_assesment_question')
async def update_question(assesment_id: str=Body(embed=True), question_id: int=Body(embed=True),new_question:str=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await assesment_database.update_question(assesment_id,question_id,new_question)
    return res



