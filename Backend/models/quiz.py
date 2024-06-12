from typing import Optional
from pydantic import BaseModel

class Choice(BaseModel):
    id:Optional[int]=0
    choice:str

class Question(BaseModel):
    id:Optional[int]=0
    question:str
    choices:list[Choice]
    correct_answer_id:int
    

class Quiz(BaseModel):
    id:Optional[str] = None
    title:str
    description:Optional[str]=''
    questions:Optional[list[Question]]=[]
    duaration:Optional[int]=0
    last_question_number:Optional[int]=0
    