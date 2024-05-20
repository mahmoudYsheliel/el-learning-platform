from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime

class Answer(BaseModel):
    question_id:int
    choice_id:int
    

class StudentQuizAnswers(BaseModel):
    id:Optional[str] = None
    question_id:str
    steudent_id:str
    answers:list[Answer]
    created_at:datetime