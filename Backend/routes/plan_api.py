from fastapi import APIRouter, Body,Depends
from models.plan import Plan
import database.plan_database as plan_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/create_plan') 
async def create_plan(new_plan: Plan =Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await plan_database.create_plan(new_plan)
    return res

@router.post('/get_plan') 
async def get_plan(plan_id:str =Body(embed=True))-> ServiceResponse:
    res = await plan_database.get_plan(plan_id)
    return res


@router.post('/delete_plan')
async def delete_plan(plan_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await plan_database.delete_plan(plan_id)
    return res


@router.post('/get_all_plans') 
async def get_all_plans()-> ServiceResponse:
    res = await plan_database.get_all_plans()
    return res

@router.post('/get_course_plan') 
async def get_course_plan(course_id:str =Body(embed=True))-> ServiceResponse:
    res = await plan_database.get_course_plan(course_id)
    return res

@router.post('/update_plan')
async def update_plan(plan_id:str=Body(embed=True),update:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await plan_database.update_plan(plan_id,update)
    return res



