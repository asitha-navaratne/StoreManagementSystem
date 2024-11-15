from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreateInvoiceModel import CreateInvoiceModel

from helpers.invoices.get_invoices import get_invoices
from helpers.invoices.create_invoice import create_invoice
from helpers.invoices.edit_invoice import edit_invoice
from helpers.invoices.delete_invoice import delete_invoice
from helpers.invoices.get_invoice_by_invoice_number_and_supplier import get_invoice_by_invoice_number_and_supplier


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

@router.get('')
def get_all_invoices(db: db_dependency):
    return get_invoices(db)

@router.post('', status_code=status.HTTP_201_CREATED)
def add_invoice(invoice: CreateInvoiceModel, db: db_dependency):
    return create_invoice(invoice, db)

@router.patch('')
def update_invoice(invoice: CreateInvoiceModel, db: db_dependency):
    return edit_invoice(invoice=invoice, db=db)

@router.delete('/{id}')
def remove_invoice(id: int, db: db_dependency):
    return delete_invoice(id=id, db=db)

@router.get('/')
def get_invoice_by_number_and_supplier(invoice: int, supplier: str, db: db_dependency):
    return get_invoice_by_invoice_number_and_supplier(invoice, supplier, db)