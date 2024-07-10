from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime


class Answer(BaseModel):
    question_id:int
    choice_id:int
    

class QuizProgress(BaseModel):
    quiz_id:str
    answers:list[Answer]
    score_prcentage:Optional[int]=0
    time_taken:int
    created_at:datetime


class LessonProgress(BaseModel):
    lesson_id:str
    completed_at:datetime
    
    

class Progress(BaseModel):
    lessons_completed:list[LessonProgress]=[]
    quizes_completed:list[QuizProgress]=[]
    
class AddProgress(BaseModel):
    lesson_progress:LessonProgress=None
    quiz_progress:QuizProgress=None
    material_type:str

class Enrollment(BaseModel):
    id:Optional[str] = ''
    student_id:Optional[str]=''
    course_id:str
    created_at:datetime
    progress:Optional[Progress]={}
    is_completed:Optional[bool]=False
    
    
    
class Comment(BaseModel):
    id:Optional[int]=0
    sender_type:Optional[str]=''
    msg:str    
    
class RequestEnrollment(BaseModel):
    id:Optional[str] = ''
    student_id:Optional[str]=''
    parent_id:Optional[str]=''
    status:Optional[str]='Pending' #Pending Success Rejected 
    course_id:str
    comments:Optional[list[str]]=[]
    last_comment_id:Optional[int]=0
    created_at:datetime
    