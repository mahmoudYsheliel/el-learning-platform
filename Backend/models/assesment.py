from typing import Optional
from pydantic import BaseModel

class Question(BaseModel):
    id:Optional[int]=0
    question:str
    
    

class Assesment(BaseModel):
    id:Optional[str] = None
    title:str
    description:Optional[str]=''
    questions:list[Question]=[]
    last_question_number:Optional[int]=0