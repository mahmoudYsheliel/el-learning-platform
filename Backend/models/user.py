from typing import Optional
from pydantic import BaseModel,Field
from datetime import datetime
   

class User(BaseModel):
    id:Optional[str] = None
    email:str = Field(unique=True)
    username:str = Field(unique=True)
    hashed_pass:str
    user_type:str #Instructor Child Parent
    created_at: Optional[datetime]=datetime.now().isoformat()
    phone_number:Optional[str]=''
    first_name:Optional[str]=''
    last_name:Optional[str]=''
    birth_day:Optional[str]=''
    gender:Optional[str]=''
    balance:Optional[float]=0
    

class Instructor (BaseModel):
    id:Optional[str] = None
    user_id: str=Field(unique=True)
    specialization:Optional[str]=''
    
    
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
    

    
    
    