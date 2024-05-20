from fastapi import APIRouter, Body,Depends
from models.student_assesment_answers import StudentAssesmentAnswers,Answer
import database.student_assesment_answer_database as student_assesment_answer_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/add_answer')
async def add_answer(assesment_id:str=Body(embed=True),answers:list[Answer] =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await student_assesment_answer_database.add_answer(userId,assesment_id,answers)
    return res

@router.post('/get_student_assesment_answers') 
async def get_student_assesment_answers(assesment_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await student_assesment_answer_database.get_student_assesment_answers(assesment_id,userId)
    return res
