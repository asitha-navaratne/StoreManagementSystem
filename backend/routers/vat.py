from fastapi import APIRouter, Depends
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreateVatModel import CreateVatModel

from helpers.vat.get_vat_rate import get_vat_rate
from helpers.vat.add_new_vat_rate import add_new_vat_rate


router = APIRouter(
    prefix='/vat',
    tags=['VAT']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('')
def get_latest_vat_rate(db: db_dependency):
    return get_vat_rate(db)

@router.post('')
def update_vat_rate(vat: CreateVatModel, db: db_dependency):
    return add_new_vat_rate(vat, db)