from typing import Optional
from pydantic import BaseModel
from enum import Enum
from datetime import datetime


class Subscription(BaseModel):
    id: Optional[str] = None
    user_id: Optional[str] = None
    subscription_plan_id:str
    start_date: str
    end_date: str
    created_at: str
    updated_at: str
    status: str  # cancelled active paused
    auto_enroll: bool = True
 
