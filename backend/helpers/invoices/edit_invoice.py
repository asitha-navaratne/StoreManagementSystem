from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import Invoices, Suppliers, Users

from models.CreateInvoiceModel import CreateInvoiceModel


def edit_invoice(invoice: CreateInvoiceModel, db: Session):
    created_user_id = db.scalars(select(Users.id).where(Users.username == invoice.created_by)).first()
    updated_user_id = db.scalars(select(Users.id).where(Users.username == invoice.updated_by)).first()
    
    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == invoice.supplier_name)).first()
    
    stmt = (
        update(Invoices)
        .where(Invoices.id == invoice.id)
        .values(
            invoice_date = invoice.invoice_date,
            supplier_id = supplier_id,
            invoice_number = invoice.invoice_number,
            description = invoice.description,
            value_of_purchases = invoice.value_of_purchases,
            vat = invoice.vat,
            total_payable = invoice.total_payable,
            invoice_type = invoice.invoice_type,
            received_date = invoice.received_date,
            payment_date = invoice.payment_date,
            created_by = created_user_id,
            created_on = invoice.created_on,
            updated_by = updated_user_id,
            updated_on = invoice.updated_on,
        )
    )
    db.execute(stmt)
    db.commit()

    return 200