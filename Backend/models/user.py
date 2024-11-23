from typing import Optional
from pydantic import BaseModel,Field
from datetime import datetime
   
class TwoLang(BaseModel):
    en:str
    ar:str
    
class Notification(BaseModel):
    title:TwoLang
    description:TwoLang
    type:str #analysis quiz      enrollment request
    analysis_quiz_id:Optional[str]=''
    enrollment_request_id:Optional[str]=''
    status:str #waiting  done
    
    

class User(BaseModel):
    id:Optional[str] = None
    email:str = Field(unique=True)
    hashed_pass:str
    user_type:str #Instructor Child Parent Admin
    created_at: Optional[datetime]=datetime.now().isoformat()
    phone_number:Optional[str]=''
    first_name:Optional[str]=''
    last_name:Optional[str]=''
    birth_day:Optional[str]=''
    gender:Optional[str]=''
    balance:Optional[float]=0
    image:Optional[str]=''
    notifications:Optional[list[Notification]]=[]
    
class Admin(BaseModel):
    id:Optional[str] = None
    user_id: str=Field(unique=True)

class Instructor (BaseModel):
    id:Optional[str] = None
    user_id: str=Field(unique=True)
    title:Optional[str]=''
    specializations:Optional[list[str]]=[]
    biography:Optional[str]=''
    education_background:Optional[list[str]]=[]
    experience:Optional[list[str]]=[]
    philisophy:Optional[str]=''
    courses:Optional[list[str]]=[]
    
class Parent(BaseModel):
    id:Optional[str] = None
    user_id:str =Field(unique=True)
    location:Optional[str]=''
    job:Optional[str]=''
    children:Optional[list[str]]=[]
    
class Child(BaseModel):
    id:Optional[str] = None
    user_id:str  =Field(unique=True)
    grade:Optional[str]=0 
    child_group:Optional[str]=''
    education_system:Optional[str]=''


    

class Token(BaseModel):
    access_token:str
    

    
    
    