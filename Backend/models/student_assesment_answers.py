from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime

class Answer(BaseModel):
    question_id:int
    answer:str


class StudentAssesmentAnswers(BaseModel):
    id:Optional[str] = None
    assesment_id:str
    student_id:str
    answers:list[Answer]=[]
    created_at:datetime