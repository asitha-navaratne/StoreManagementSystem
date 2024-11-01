from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Suppliers, Users

from models.CreateSupplierModel import CreateSupplierModel


def create_supplier(supplier: CreateSupplierModel, db: Session):
    fetch_user_id_stmt = select(Users.id).where(Users.username == supplier.created_by)
    user_id = db.scalars(fetch_user_id_stmt).first()

    db_supplier = Suppliers(
        id = supplier.id,
        company_name = supplier.company_name,
        contact_person = supplier.contact_person,
        supplier_code = supplier.supplier_code,
        number = supplier.number,
        supplier_tin = supplier.supplier_tin,
        email = supplier.email,
        invoice_type = supplier.invoice_type,
        payment_period = supplier.payment_period,
        active = supplier.active,
        created_by = user_id,
        created_on = supplier.created_on,
        updated_by = supplier.updated_by,
        updated_on = supplier.updated_on
    )
    db.add(db_supplier)
    db.commit()

    return 201