from pydantic import BaseModel
from typing import Optional


class OTP(BaseModel):
    id: Optional[str] = None
    otp: str
    token: str