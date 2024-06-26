from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime


    
class Material(BaseModel):
    Id:str
    order:int
    title:str
    type:str #Lesson Quiz Assesment

class Chapter(BaseModel):
    title:str
    materials:Optional[list[Material]] = []

class Categories(BaseModel):
    Id:str
    title:str
    
class Course(BaseModel):
    id: Optional[str] = None
    title: str
    description: str
    chapters: Optional[list[Chapter]] = []
    price: float
    image: str
    categories: Optional[list[Categories]] = []
    objectives:Optional[list[str]] = []
    min_age:int
    max_age:int
    duration: Optional[int]  # number of days
    number_of_enrollments: Optional[int]=0