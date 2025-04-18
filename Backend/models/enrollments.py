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

class SimulationProgress(BaseModel):
    simulation_id:str
    completed_at:datetime
    
class ProjectProgress(BaseModel):
    project_id:str
    completed_at:datetime
    
class ActivityProgress(BaseModel):
    activity_id:str
    completed_at:datetime
    
    

class Progress(BaseModel):
    lessons_completed:list[LessonProgress]=[]
    activities_completed:list[ActivityProgress]=[]
    simulations_completed:list[SimulationProgress]=[]
    projects_completed:list[ProjectProgress]=[]
    quizes_completed:list[QuizProgress]=[]
    
    
class AddProgress(BaseModel):
    lesson_progress:LessonProgress=None
    project_progress:ProjectProgress=None
    simulation_progress:SimulationProgress=None
    activity_progress:ActivityProgress=None
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
    package_type:Optional[str] ='course'  # course plan
    price:Optional[float]=0
    promo_code:Optional[str]=''
    discount: Optional[int]=0
    comments:Optional[list[str]]=[]
    last_comment_id:Optional[int]=0
    created_at: Optional[datetime | str]=datetime.now()
    