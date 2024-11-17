from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import Invoices, Purchases


def delete_invoice(id: int, db: Session):
    db.execute(delete(Purchases).where(Purchases.invoice_id == id))
    db.execute(delete(Invoices).where(Invoices.id == id))

    db.commit()

    return 200