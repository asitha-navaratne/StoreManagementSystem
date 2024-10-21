from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreatePurchaseModel(BaseModel):
    id: int
    shop_name: str
    product_name: str
    supplier_name: str
    order_date: datetime
    expected_date: datetime
    received_date: datetime
    quantity_ordered: int
    quantity_received: int
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None