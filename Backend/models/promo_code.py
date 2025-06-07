from typing import Optional
from pydantic import BaseModel



    
class PromoCode(BaseModel):
    id:Optional[str] = None
    code:str
    discount_type:str # fixed or percent
    discount_value: float
    expiry_date:str
    usage_limit: int
    used_count:int = 0