from fastapi import APIRouter, Body,Depends
from models.enrollments import Enrollment
import database.enrollment_database as enrollment_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_enrollment') 
async def get_enrollments(course_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await enrollment_database.get_enrollment(course_id,userId)
    return res



@router.post('/delete_enrollment')
async def delete_enrollment(enrollment_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await enrollment_database.delete_enrollment(enrollment_id)
    return res


@router.post('/update_enrollment')
async def update_enrollment(enrollment_id:str=Body(embed=True),update:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await enrollment_database.update_enrollment(enrollment_id,update)
    return res


@router.post('/create_enrollment')
async def create_enrollment(new_enrollment:Enrollment =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await enrollment_database.create_enrollment(new_enrollment,userId)
    return res



@router.post('/get_enrollments') 
async def get_student_enrollments(userId:str = Depends(auth_user))-> ServiceResponse:
    res = await enrollment_database.get_all_enrollments(userId)
    return res
