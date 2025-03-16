from pydantic import BaseModel
from datetime import datetime


class CreateVatModel(BaseModel):
    rate: int
    updated_by: str
    updated_on: datetime