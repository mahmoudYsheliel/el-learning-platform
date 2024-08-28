from typing import Optional
from pydantic import BaseModel



    
class PromoCode(BaseModel):
    id:Optional[str] = None
    code:str
    discount:int 