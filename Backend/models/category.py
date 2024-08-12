from typing import Optional
from pydantic import BaseModel

class TwoLang(BaseModel):
    en:str
    ar:str
    
class Category(BaseModel):
    id:Optional[str] = None
    category:TwoLang
    image:str
    description:TwoLang