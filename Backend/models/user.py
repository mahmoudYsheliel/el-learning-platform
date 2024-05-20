from typing import Optional
from pydantic import BaseModel,Field
from enum import Enum
from  datetime import datetime


class UserRole(Enum):
    STUDENT = 0
    INSTRUCTOR = 1
    PARENT = 2
    ADMIN = 3       




class User(BaseModel):
    id:Optional[str] = None
    balance:Optional[float]=0
    age:Optional[int]=0
    grade:Optional[int]=0
    specialization:Optional[str]=''
    role:Optional[int] =0
    #there is a problem regarding uniquness
    email:str = Field(unique=True)
    username:str = Field(unique=True)
    hashed_pass:str
    phone_number:str
    created_at: Optional[datetime]=datetime.now().isoformat()
    #role:UserRole
    
    

     

class Token(BaseModel):
    access_token:str
    
    
class TokenData(BaseModel):
    user_id: str 
    role: UserRole
    
    
    