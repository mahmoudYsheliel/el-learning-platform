from fastapi import APIRouter, Body,Depends
from models.course import Course
import database.course_database as course_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_course') 
async def get_courses(course_id:str=Body(embed=True))-> ServiceResponse:
    res = await course_database.get_course(course_id)
    return res



@router.post('/delete_course')
async def delete_course(course_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await course_database.delete_course(course_id)
    return res


@router.post('/update_course')
async def update_course(course_id:str=Body(embed=True),new_course:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await course_database.update_course(course_id,new_course)
    return res


@router.post('/create_course')
async def create_course(new_course:Course =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await course_database.create_course(new_course)
    return res





@router.post('/get_courses') 
async def get_student_courses()-> ServiceResponse:
    res = await course_database.get_all_courses()
    return res

@router.post('/get_instructor_courses') 
async def get_instructor_courses(userId:str = Depends(auth_user))-> ServiceResponse:
    res = await course_database.get_all_instructor_courses(userId)
    return res


@router.post('/get_all_courses_with_free_lessons') 
async def get_all_courses_with_free_lessons()-> ServiceResponse:
    res = await course_database.get_all_courses_with_free_lessons()
    return res

@router.post('/get_course_free_lessons') 
async def get_course_free_lessons(course_id:str =Body(embed=True))-> ServiceResponse:
    res = await course_database.get_course_free_lessons(course_id)
    return res





