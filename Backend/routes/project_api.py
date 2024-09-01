from fastapi import APIRouter, Body,Depends
from models.project import Project
import database.project_database as project_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_project') 
async def get_projects(project_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await project_database.get_project(project_id,userId)
    return res



@router.post('/delete_project')
async def delete_project(project_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await project_database.delete_project(project_id)
    return res


@router.post('/update_project')
async def update_project(project_id:str=Body(embed=True),new_project:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await project_database.update_project(project_id,new_project)
    return res


@router.post('/create_project')
async def create_project(new_project:Project =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await project_database.create_project(new_project)
    return res

