from pydantic import BaseModel
from datetime import datetime


class CreateStockMovementModel(BaseModel):
    id: int
    product_id: int
    product_name: str
    store_id: int
    store_name: str
    record_date: datetime
    in_hand: int
    current_in_hand: int
    purchased_amount: int
    sold: int
    updated_by: str