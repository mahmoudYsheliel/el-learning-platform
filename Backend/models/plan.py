from typing import Optional
from pydantic import BaseModel

class TwoLang(BaseModel):
    en:str
    ar:str
    
class CourseInPlan(BaseModel):
    Id:str
    ristriction_on_course:Optional[str]=''
    
class Categories(BaseModel):
    Id:str
    title:TwoLang
    
class Plan(BaseModel):
    id:Optional[str] = None
    name:str
    title:TwoLang
    description:TwoLang
    courses:Optional[list[CourseInPlan]]=[] #list of IDs
    image:str
    price:int
    categories: Optional[list[Categories]] = []
    objectives:Optional[list[TwoLang]] = []
    min_age:int
    max_age:int