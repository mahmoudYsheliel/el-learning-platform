from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str
    
class Lesson(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:TwoLang
    source:str