from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str
    
class Simulation(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    image:str
    source:str