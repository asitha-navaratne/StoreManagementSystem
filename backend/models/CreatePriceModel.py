from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreatePriceModel(BaseModel):
    id: int
    shop_name: str
    supplier_name: str
    brand_code: str
    source_type: str
    category: str
    country: str
    variety: str
    volume: int
    company_product_code: str
    product_name: str
    bottle_size: int
    container_size: int
    tax_price: int
    price: int
    staff_margin: int
    active: bool
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None