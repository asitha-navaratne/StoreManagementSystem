from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreatePriceModel(BaseModel):
    id: int
    shop_name: str
    company_name: str
    brand: str
    brand_code: str
    bottle_size: str
    container_size: str
    price: int
    commissions: int
    margin: str
    active: bool
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None