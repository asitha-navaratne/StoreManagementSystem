from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreatePriceModel import CreatePriceModel

from helpers.price_master.get_price_items import get_price_items
from helpers.price_master.create_price_item import create_price_item
from helpers.price_master.edit_price_item import edit_price_item
from helpers.price_master.delete_price_item import delete_price_item
from helpers.price_master.get_price_items_by_supplier import get_price_items_by_supplier


router = APIRouter(
    prefix='/price-master',
    tags=['Price Master']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('')
def get_all_prices(db: db_dependency):
    return get_price_items(db)

@router.post('', status_code=status.HTTP_201_CREATED)
def add_price_item(price: CreatePriceModel, db: db_dependency):
    return create_price_item(price_item=price, db=db)

@router.patch('')
def update_price_item(price: CreatePriceModel, db: db_dependency):
    return edit_price_item(price=price, db=db)

@router.delete('/{id}')
def remove_price_item(id: int, db: db_dependency):
    return delete_price_item(id=id, db=db)

@router.get('/')
def get_prices_by_supplier(supplier: str, db: db_dependency):
    return get_price_items_by_supplier(supplier, db)