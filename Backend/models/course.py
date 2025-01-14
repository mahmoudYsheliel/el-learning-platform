from typing import Optional
from pydantic import BaseModel

class TwoLang(BaseModel):
    en:str
    ar:str
    
class Material(BaseModel):
    Id:str
    order:Optional[int]=0
    title:TwoLang
    type:str #Lesson Quiz Activity Project Simulation

class Chapter(BaseModel):
    title:TwoLang
    materials:Optional[list[Material]] = []

class Categories(BaseModel):
    Id:str
    title:TwoLang
    
class Course(BaseModel):
    id: Optional[str] = None
    title: TwoLang
    description: TwoLang
    chapters: Optional[list[Chapter]] = []
    price: Optional[int]=0
    image: str
    categories: Optional[list[Categories]] = []
    objectives:Optional[list[TwoLang]] = []
    min_age:Optional[int]=0
    max_age:Optional[int]=0
    duration: Optional[int]=7  # number of days
    number_of_enrollments: Optional[int]=0
    is_locked:Optional[bool]=False
    
    
