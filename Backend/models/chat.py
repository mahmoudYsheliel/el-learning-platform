from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime

class Message(BaseModel):
    id:int
    content:str
    senderId:str
    username:str
    date:str
    timestamp:str
    read_by:Optional[list[str]]=[]


class Participant(BaseModel):
    id:str
    username:str
    
class Chat(BaseModel):
    id:Optional[str] = None
    student_name:str
    course_title:str
    student_id:Optional[str]=''
    course_id:str
    avatar:str
    participants:list[Participant]=[]
    messages:Optional[list[Message]]=[]