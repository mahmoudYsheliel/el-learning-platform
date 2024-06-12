from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime


class LessonProgress(BaseModel):
    lesson_id:str
    completed_at:datetime
    
class QuizScores(BaseModel):
    quiz_id:str
    score:float
    
class AssesmentScores(BaseModel):
    assesment_id:str
    score:float

class Progress(BaseModel):
    lessons_completed:list[LessonProgress]=[]
    quizes_scores:list[QuizScores]=[]
    assesments_scores:list[AssesmentScores]=[]
    

    

class Enrollment(BaseModel):
    id:Optional[str] = ''
    student_id:Optional[str]=''
    course_id:str
    created_at:datetime
    progress:Optional[Progress]={}
    
    
class RequestEnrollment(BaseModel):
    id:Optional[str] = ''
    student_id:Optional[str]=''
    course_id:str
    created_at:datetime