from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreateSupplierModel(BaseModel):
    id: int
    company_name: str
    contact_person: str
    number: str
    supplier_tin: int
    email: str
    invoice_type: str
    payment_period: int
    active: bool
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None