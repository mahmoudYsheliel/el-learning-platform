from fastapi import APIRouter, Body,Depends
from models.quiz import Quiz,Question
import database.quiz_database as quiz_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse


router = APIRouter()


@router.post('/get_quiz') 
async def get_quiz(quiz_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await quiz_database.get_quiz(quiz_id)
    return res

@router.post('/create_quiz')
async def create_quiz(new_quiz:Quiz =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await quiz_database.create_quiz(new_quiz)
    return res

@router.post('/delete_quiz')
async def delete_quiz(quiz_id: str=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await quiz_database.delete_quiz(quiz_id)
    return res
    
@router.post('/update_quiz')
async def update_quiz(quiz_id: str=Body(embed=True), update: dict=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await quiz_database.update_quiz(quiz_id,update)
    return res
    





@router.post('/add_quiz_question')
async def add_question(quiz_id: str=Body(embed=True), question: Question=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await quiz_database.add_question(quiz_id,question)
    return res

    
@router.post('/delete_quiz_question')
async def delete_question(quiz_id: str=Body(embed=True), question_id: int=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await quiz_database.delete_question(quiz_id,question_id)
    return res

@router.post('/update_quiz_question')
async def update_question(quiz_id: str=Body(embed=True), question_id: int=Body(embed=True),update:dict=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await quiz_database.update_question(quiz_id,question_id,update)
    return res



