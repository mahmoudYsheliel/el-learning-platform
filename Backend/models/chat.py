from typing import Optional
from pydantic import BaseModel
from bson.objectid import ObjectId
from datetime import datetime

class Message(BaseModel):
    sender:str
    message:str
    sent_at:datetime

class Chat(BaseModel):
    id:Optional[str] = None
    participants:list[str]
    messages:Optional[list[Message]]=[]