from typing import Optional
from pydantic import BaseModel

class TwoLang(BaseModel):
    en:str
    ar:str


class Choice(BaseModel):
    id:Optional[int]=0
    choice:TwoLang

    
class Question(BaseModel):
    id:Optional[int]=0
    question:TwoLang
    choices:list[Choice]
    correct_answer_id:int

    
class Quiz(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    questions:Optional[list[Question]]=[]
    duration:Optional[int]=0
    last_question_number:Optional[int]=0
    
    
 


    
    
