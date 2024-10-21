from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreateSupplierModel import CreateSupplierModel

from helpers.suppliers.get_suppliers import get_suppliers
from helpers.suppliers.create_supplier import create_supplier
from helpers.suppliers.edit_supplier import edit_supplier
from helpers.suppliers.delete_supplier import delete_supplier


router = APIRouter(
    prefix='/suppliers',
    tags=['Suppliers']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/')
def get_all_suppliers(db: db_dependency):
    return get_suppliers(db)

@router.post('/', status_code=status.HTTP_201_CREATED)
def add_supplier(supplier: CreateSupplierModel, db: db_dependency):
    return create_supplier(supplier=supplier, db=db)

@router.patch('/')
def update_supplier(supplier: CreateSupplierModel, db: db_dependency):
    return edit_supplier(supplier=supplier, db=db)

@router.delete('/{id}')
def remove_supplier(id: int, db: db_dependency):
    return delete_supplier(id=id, db=db)