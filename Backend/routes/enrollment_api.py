from fastapi import APIRouter, Body,Depends
from models.enrollments import Enrollment,RequestEnrollment,AddProgress,Comment
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
    if (not new_enrollment.student_id):
        new_enrollment.student_id = str(userId)  
    res = await enrollment_database.create_enrollment(new_enrollment)
    return res



@router.post('/get_enrollments') 
async def get_student_enrollments(userId:str = Depends(auth_user))-> ServiceResponse:
    res = await enrollment_database.get_all_enrollments(userId)
    return res

@router.post('/get_admin_enrollments') 
async def get_student_enrollments(userId:str = Depends(auth_user))-> ServiceResponse:
    res = await enrollment_database.get_admin_enrollments()
    return res

@router.post('/get_child_enrollments') 
async def get_child_enrollments(child_id:str =Body(embed=True), userId:str = Depends(auth_user))-> ServiceResponse:
    res = await enrollment_database.get_all_enrollments(child_id)
    return res





@router.post('/add_progress')
async def add_progress(enrolment_id: str=Body(embed=True), progres: AddProgress=Body(embed=True), userId:str = Depends(auth_user))-> ServiceResponse:
    res = await enrollment_database.add_progress(enrolment_id, progres,userId)
    return res


@router.post('/request_enrollment')
async def request_enrollment(request:RequestEnrollment =Body(embed=True), userId:str = Depends(auth_user))-> ServiceResponse:
    if (not request.student_id):
        request.student_id = str(userId)  
    request.parent_id=str(userId)  
    res = await enrollment_database.request_enrollment(request)
    return res

@router.post('/get_request_enrollment')
async def get_enrollment_requests(userId:str = Depends(auth_user))->ServiceResponse:
    res =await enrollment_database.get_enrollment_requests(user_id=userId)
    return res

@router.post('/get_all_request_enrollment')
async def get_all_enrollment_requests(userId:str = Depends(auth_user))->ServiceResponse:
    res =await enrollment_database.get_all_enrollment_requests(user_id=userId)
    return res

@router.post('/add_comment')
async def add_comment(enrollment_request_id:str=Body(embed=True),msg:Comment=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await enrollment_database.add_comment(enrollment_request_id,msg,userId)
    return res

@router.post('/edit_request_status')
async def edit_request_status(new_status:str=Body(embed=True),enrollment_request_id:str=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await enrollment_database.edit_request_status(new_status,enrollment_request_id,userId)
    return res

