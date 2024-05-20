from fastapi import APIRouter, Body,Depends
from models.student_quiz_answers import StudentQuizAnswers,Answer
import database.student_quiz_answer_database as student_quiz_answer_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/add_quiz_answer')
async def add_answer(quiz_id:str=Body(embed=True),answers:list[Answer] =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await student_quiz_answer_database.add_answer(userId,quiz_id,answers)
    return res

@router.post('/get_student_quiz_answers') 
async def get_student_quiz_answers(quiz_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await student_quiz_answer_database.get_student_quiz_answers(quiz_id,userId)
    return res
