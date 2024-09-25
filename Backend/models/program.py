from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str

class RoadMapCourse(BaseModel):
    id:str
    week_start:Optional[int]=0
    week_end:Optional[int]=0

class Program(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    min_age:Optional[int]=0
    max_age:Optional[int]=0
    road_map:Optional[list[RoadMapCourse]]=[]
    image:str
    
    
    
