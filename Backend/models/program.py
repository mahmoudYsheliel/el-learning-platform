from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str

class RoadMapCourse(BaseModel):
    id:str
    week_start:int
    week_end:int

class Program(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    min_age:int
    max_age:int
    road_map:Optional[list[RoadMapCourse]]=[]
    image:str
    
    
    
