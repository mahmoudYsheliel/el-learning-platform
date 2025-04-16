from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str
    

class Activity(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:Optional[TwoLang]=None
    content:Optional[TwoLang]=None
    
