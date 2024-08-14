from fastapi import APIRouter, Body,Depends
from models.alaysis import (
    AnalysisQuiz,
    Answers,
    FeatureInfo,
    Careers
)
import database.analysis_database as analysis_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse



router = APIRouter()

@router.post('/create_careers_list')
async def create_careers_list(careers: Careers=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await analysis_database.create_careers_list(careers)
    return res

@router.post('/create_feature_info')
async def create_feature_info(feature_info: FeatureInfo=Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await analysis_database.create_feature_info(feature_info)
    return res

@router.post('/create_analysis_quiz')
async def create_analysis_quiz(new_analysis_quiz:AnalysisQuiz =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await analysis_database.create_analysis_quiz(new_analysis_quiz)
    return res


@router.post('/get_analysis_quiz') 
async def get_analysis_quiz(analysis_quiz_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_analysis_quiz(analysis_quiz_id,userId)
    return res







@router.post('/get_analysis') 
async def get_analysis(student_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_analysis(student_id)
    return res

@router.post('/get_all_careers') 
async def get_analysis(userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_all_careers()
    return res

@router.post('/get_all_features_info') 
async def get_analysis(userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_all_features_info()
    return res

@router.post('/add_analysis_quiz_answer') 
async def add_analysis_quiz_answer(answers:Answers=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.add_analysis_quiz_answer( answers,str(userId))
    return res
