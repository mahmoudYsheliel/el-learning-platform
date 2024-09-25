from typing import Optional
from pydantic import BaseModel


class TwoLang(BaseModel):
    en:str
    ar:str
    
    
class Item(BaseModel):
    id:int
    text:TwoLang
    description:Optional[TwoLang]=None
    image:Optional[str]=None
    
class ItemsSet(BaseModel):
    items:Optional[list[Item]]=None
    start_images:Optional[list[str]]=None
    end_images:Optional[list[str]]=None
    
    
class Activity(BaseModel):
    id:Optional[str] = None
    title:TwoLang
    description:Optional[TwoLang]=None
    start_images:Optional[list[str]]=None
    end_images:Optional[list[str]]=None
    sources:Optional[list[str]]=None
    objectives:Optional[ItemsSet]=None
    terms_concepts:Optional[ItemsSet]=None
    materials:Optional[ItemsSet]=None
    instructions:Optional[ItemsSet]=None
    results:Optional[ItemsSet]=None
    conclusions:Optional[ItemsSet]=None
   
