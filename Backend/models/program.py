from typing import Optional
from pydantic import BaseModel

class TwoLang(BaseModel):
    en:str
    ar:str

class RoadMapCourse(BaseModel):
    id:str
    week_start:Optional[int]=0
    week_end:Optional[int]=0
    
class Level(BaseModel):
    id:Optional[int]=0
    title: TwoLang
    image: str
    courses: Optional[list[str]] = []

class Track(BaseModel):
    id:int
    title: TwoLang
    description: TwoLang
    female_image:Optional[str]=None
    male_image:Optional[str]=None
    image:Optional[str]=None
    video:Optional[str]=None
    levels: Optional[list[Level]] = []
    courses: Optional[list[str]] = []
    min_age:Optional[int]=0
    max_age:Optional[int]=0

class Program(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    min_age:Optional[int]=0
    max_age:Optional[int]=0
    road_map:Optional[list[RoadMapCourse]]=[]
    image:str
    tracks:Optional[list[Track]]=[]
    
    
    
