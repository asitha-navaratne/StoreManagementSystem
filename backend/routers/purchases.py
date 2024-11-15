from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreatePurchaseModel import CreatePurchaseModel

from helpers.purchases.get_purchases import get_purchases
from helpers.purchases.create_purchases import create_purchases


router = APIRouter(
    prefix='/purchases',
    tags=['Purchases']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('')
def get_all_purchases(db: db_dependency):
    return get_purchases(db)

@router.post('', status_code=status.HTTP_201_CREATED)
def add_purchases(purchases: list[CreatePurchaseModel], db: db_dependency):
    return create_purchases(purchases, db)