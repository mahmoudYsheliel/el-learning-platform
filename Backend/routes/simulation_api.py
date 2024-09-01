from fastapi import APIRouter, Body,Depends
from models.simulation import Simulation
import database.simulation_database as simulation_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse
from database.mongo_driver import get_database


router = APIRouter()


@router.post('/get_simulation') 
async def get_simulations(simulation_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await simulation_database.get_simulation(simulation_id,userId)
    return res



@router.post('/delete_simulation')
async def delete_simulation(simulation_id:str = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await simulation_database.delete_simulation(simulation_id)
    return res


@router.post('/update_simulation')
async def update_simulation(simulation_id:str=Body(embed=True),new_simulation:dict = Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await simulation_database.update_simulation(simulation_id,new_simulation)
    return res


@router.post('/create_simulation')
async def create_simulation(new_simulation:Simulation =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await simulation_database.create_simulation(new_simulation)
    return res

