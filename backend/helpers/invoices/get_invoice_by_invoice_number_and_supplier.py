from sqlalchemy import select, and_
from sqlalchemy.orm import Session, aliased

from database.models import Invoices, Suppliers, Users


def get_invoice_by_invoice_number_and_supplier(invoice_number: int, supplier_name: str, db: Session):
    user_alias_1 = aliased(Users, name="user_alias_1")
    user_alias_2 = aliased(Users, name="user_alias_2")

    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == supplier_name)).first()

    stmt = (
        select(Invoices).where(and_(Invoices.invoice_number == invoice_number, Invoices.supplier_id == supplier_id))
        .join(user_alias_1, Invoices.created_by == user_alias_1.id, isouter=True)
        .join(user_alias_2, Invoices.updated_by == user_alias_2.id, isouter=True)
    )

    result = db.scalars(stmt).first()

    return result