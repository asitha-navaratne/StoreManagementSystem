from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreateInvoiceModel(BaseModel):
    id: int
    invoice_date: datetime
    supplier_name: str
    store_name: str
    invoice_number: int
    description: str
    value_of_purchases: int
    vat: int
    total_payable: int
    invoice_type: str
    received_date: datetime
    payment_date: Optional[datetime] = None
    created_by: str
    created_on: datetime
    updated_by: Optional[str] = None
    updated_on: Optional[datetime] = None