from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreateStoreModel(BaseModel):
    id: int
    store_name: str
    store_address: str
    active: bool
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None