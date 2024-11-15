from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreateInvoiceModel import CreateInvoiceModel

from helpers.invoices.get_invoice_by_invoice_number_and_supplier import get_invoice_by_invoice_number_and_supplier
from helpers.invoices.create_invoice import create_invoice


router = APIRouter(
    prefix='/invoices',
    tags=['Invoices']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/')
def get_invoice_by_number_and_supplier(invoice: int, supplier: int, db: db_dependency):
    return get_invoice_by_invoice_number_and_supplier(invoice, supplier, db)

@router.post('', status_code=status.HTTP_201_CREATED)
def add_invoice(invoice: CreateInvoiceModel, db: db_dependency):
    return create_invoice(invoice, db)