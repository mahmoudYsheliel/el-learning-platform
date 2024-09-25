from fastapi import APIRouter, Body,Depends
from models.category import Category
import database.category_database as category_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_category') 
async def get_categorys(category_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await category_database.get_category(category_id)
    return res



@router.post('/delete_category')
async def delete_category(category_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await category_database.delete_category(category_id)
    return res


@router.post('/update_category')
async def update_category(category_id:str=Body(embed=True),update:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await category_database.update_category(category_id,update)
    return res


@router.post('/create_category')
async def create_category(new_category:Category =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await category_database.create_category(new_category)
    return res





@router.post('/get_categories') 
async def get_categorys()-> ServiceResponse:
    res = await category_database.get_categories()
    return res
