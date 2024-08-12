from fastapi import APIRouter, Body,Depends
from models.program import Program
import database.program_database as program_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse


router = APIRouter()


@router.post('/get_program') 
async def get_program(program_id:str=Body(embed=True))-> ServiceResponse:
    res = await program_database.get_program(program_id)
    return res

@router.post('/get_all_program') 
async def get_program()-> ServiceResponse:
    res = await program_database.get_all_programs()
    return res

@router.post('/get_all_programs_and_courses') 
async def get_program()-> ServiceResponse:
    res = await program_database.get_all_programs_and_courses()
    return res
@router.post('/create_program')
async def create_program(new_program:Program =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await program_database.create_program(new_program)
    return res

@router.post('/delete_program')
async def delete_program(program_id: str=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await program_database.delete_program(program_id)
    return res
    
@router.post('/update_program')
async def update_program(program_id: str=Body(embed=True), update: dict=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await program_database.update_program(program_id,update)
    return res
    









