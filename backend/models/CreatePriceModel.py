from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreatePriceModel(BaseModel):
    id: int
    shop_name: str
    company_name: str
    brand: str
    brand_code: str
    category: str
    bottle_size: int
    container_size: int
    tax_price: int
    cost: int
    price: int
    commissions: int
    margin: int
    active: bool
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None