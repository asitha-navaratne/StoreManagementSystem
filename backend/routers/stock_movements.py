from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreateStockMovementModel import CreateStockMovementModel

from helpers.stock_movements.get_stock_movements import get_stock_movements
from helpers.stock_movements.update_stock_movements import update_stock_movements


router = APIRouter(
    prefix='/stock-movements',
    tags=['Stock Movements']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/')
def get_all_stock_movements(store: str, date: str, db: db_dependency):
    return get_stock_movements(store, date, db)

@router.patch('/')
def update_stock_movement_records(stock_movements: list[CreateStockMovementModel], db: db_dependency):
    return update_stock_movements(stock_movements=stock_movements, db=db)