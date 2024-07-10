from fastapi import APIRouter, Body,Depends
from models.lesson import Lesson
import database.lesson_database as lesson_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_lesson') 
async def get_lessons(lesson_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await lesson_database.get_lesson(lesson_id,userId)
    return res



@router.post('/delete_lesson')
async def delete_lesson(lesson_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await lesson_database.delete_lesson(lesson_id)
    return res


@router.post('/update_lesson')
async def update_lesson(lesson_id:str=Body(embed=True),new_lesson:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await lesson_database.update_lesson(lesson_id,new_lesson)
    return res


@router.post('/create_lesson')
async def create_lesson(new_lesson:Lesson =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await lesson_database.create_lesson(new_lesson)
    return res

