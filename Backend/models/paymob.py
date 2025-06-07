from pydantic import BaseModel
from typing import Optional


class Paymob(BaseModel):
    id:Optional[str] = None
    user_id:Optional[str] = None
    type: str # 'subscription_plan' | 'course'
    plan_course_id:str
    promo_code: str
    first_name: str
    last_name: str
    phone_number: str
    