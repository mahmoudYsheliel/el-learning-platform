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
    
class Order(BaseModel):
    id:Optional[str] = None
    order_id:str|int
    user_id:Optional[str] = None
    is_success:bool = False
    type: str # 'subscription_plan' | 'course'
    plan_course_id:str
    
class PaymentVerification(BaseModel):
    id:Optional[str] = None
    user_id:Optional[str] = None
    order_id: str
    hmac_str:str
    hmac_result: str
    success: bool
    
    
class SubscriptionPlan(BaseModel):
    id:Optional[str] = None
    frequency:int 
    name: str
    price: float
    webhook_url:Optional[str] =  "https://d78d-197-56-39-136.ngrok-free.app/paymob_subscribe_callback"
    reminder_days: Optional[int] = 2
    retrial_days: Optional[int] = 2
    plan_type:Optional[str] = "rent"
    use_transaction_amount: Optional[bool] = True
    is_active:Optional[bool]= True
    integration:Optional[int] = 5078771
    paymob_id:Optional[int] = None
    program_id: str
    track_id: int
    
    
    
    
class WebhookPayload(BaseModel):
    event: str
    data: dict