from typing import Optional
from pydantic import BaseModel

class Lesson(BaseModel):
    id:Optional[str] = None
    title:str
    description:Optional[str]=''
    source:str