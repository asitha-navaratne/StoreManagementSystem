from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import Suppliers, Users

from models.CreateSupplierModel import CreateSupplierModel


def edit_supplier(supplier: CreateSupplierModel, db: Session):
    created_user_id = db.scalars(select(Users.id).where(Users.username == supplier.created_by)).first()
    updated_user_id = db.scalars(select(Users.id).where(Users.username == supplier.updated_by)).first()
    
    stmt = (
        update(Suppliers)
        .where(Suppliers.id == supplier.id)
        .values(
            company_name = supplier.company_name,
            contact_person = supplier.contact_person,
            number = supplier.number,
            supplier_tin = supplier.supplier_tin,
            email = supplier.email,
            invoice_type = supplier.invoice_type,
            payment_period = supplier.payment_period,
            active = supplier.active,
            created_by = created_user_id,
            created_on = supplier.created_on,
            updated_by = updated_user_id,
            updated_on = supplier.updated_on,
        )
    )
    db.execute(stmt)
    db.commit()

    return 200