from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreatePurchaseModel import CreatePurchaseModel

from helpers.purchases.get_purchases import get_purchases
from helpers.purchases.create_purchase import create_purchase
from helpers.purchases.edit_purchase import edit_purchase
from helpers.purchases.delete_purchase import delete_purchase


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

@router.get('/')
def get_all_purchases(db: db_dependency):
    return get_purchases(db)

@router.post('/', status_code=status.HTTP_201_CREATED)
def add_purchase_record(purchase: CreatePurchaseModel, db: db_dependency):
    return create_purchase(purchase=purchase, db=db)

@router.patch('/')
def update_purchase_record(purchase: CreatePurchaseModel, db: db_dependency):
    return edit_purchase(purchase=purchase, db=db)

@router.delete('/{id}')
def remove_purchase_record(id: int, db: db_dependency):
    return delete_purchase(id=id, db=db)