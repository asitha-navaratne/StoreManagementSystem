from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class CreateUserModel(BaseModel):
    id: int
    username: str
    firstname: str
    lastname: str
    type: str
    hashed_password: str
    active: bool
    created_on: datetime
    updated_on: Optional[datetime] = None