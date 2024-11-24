from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Invoices, Suppliers, Stores, Users

from models.CreateInvoiceModel import CreateInvoiceModel


def create_invoice(invoice: CreateInvoiceModel, db: Session):
    user_id = db.scalars(select(Users.id).where(Users.username == invoice.created_by)).first()

    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == invoice.supplier_name)).first()
    store_id = db.scalars(select(Stores.id).where(Stores.store_name == invoice.store_name)).first()

    db_invoice = Invoices(
        id = invoice.id,
        invoice_date = invoice.invoice_date,
        supplier_id = supplier_id,
        store_id = store_id,
        invoice_number = invoice.invoice_number,
        description = invoice.description,
        value_of_purchases = invoice.value_of_purchases,
        vat = invoice.vat,
        total_payable = invoice.total_payable,
        invoice_type = invoice.invoice_type,
        received_date = invoice.received_date,
        payment_date = invoice.payment_date,
        created_by = user_id,
        created_on = invoice.created_on,
        updated_by = invoice.updated_by,
        updated_on = invoice.updated_on
    )
    db.add(db_invoice)
    db.commit()

    return 201