from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime

class TwoLang(BaseModel):
    en:str
    ar:str
    
class Material(BaseModel):
    Id:str
    order:int
    title:TwoLang
    type:str #Lesson Quiz Assesment

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
    price: float
    image: str
    categories: Optional[list[Categories]] = []
    objectives:Optional[list[TwoLang]] = []
    min_age:int
    max_age:int
    duration: Optional[int]  # number of days
    number_of_enrollments: Optional[int]=0