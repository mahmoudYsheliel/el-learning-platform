from fastapi import APIRouter, Body,Depends
from models.alaysis import (
    Choice,
    Question,
    AnalysisCriteria,
    Section,
    AnalysisQuiz,
    Answer,
    QuizAnalysis,
    Analysis,
    FeaturePercentage,
    FeaturesPercentages
)
import database.analysis_database as analysis_database
from lib.crypto import auth_user
from models.runtime import ServiceResponse



router = APIRouter()

@router.post('/create_analysis_quiz')
async def create_analysis_quiz(new_analysis_quiz:AnalysisQuiz =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    res = await analysis_database.create_analysis_quiz(new_analysis_quiz)
    return res
@router.post('/get_analysis_quiz') 
async def get_analysis_quiz(analysis_quiz_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_analysis_quiz(analysis_quiz_id,userId)
    return res

@router.post('/get_analysis_quiz_title') 
async def get_analysis_quiz(analysis_quiz_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_analysis_quiz(analysis_quiz_id,userId)
    return res




@router.post('/create_analysis')
async def create_analysis(new_analysis:Analysis =Body(embed=True),userId:str = Depends(auth_user))->ServiceResponse:
    new_analysis.student_id=str(userId)
    res = await analysis_database.create_analysis(new_analysis)
    return res
@router.post('/get_analysis') 
async def get_analysis(student_id:str=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.get_analysis(student_id)
    return res


@router.post('/add_analysis_quiz_answer') 
async def add_analysis_quiz_answer(analysis_quiz_id: str=Body(embed=True),answers: list[Answer]=Body(embed=True),userId:str = Depends(auth_user))-> ServiceResponse:
    res = await analysis_database.add_analysis_quiz_answer(analysis_quiz_id, userId, answers)
    return res
