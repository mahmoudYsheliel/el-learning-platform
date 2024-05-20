from typing import Optional
from pydantic import BaseModel


class Category(BaseModel):
    id:Optional[str] = None
    category:str
    image:str
    description:str