from typing import Optional
from pydantic import BaseModel


class RoadMapCourse(BaseModel):
    id:str
    week_start:int
    week_end:int

class Program(BaseModel):
    id:Optional[str] = None
    title:str
    description:Optional[str]=''
    age_group:str
    road_map:Optional[list[RoadMapCourse]]=[]
    image:str