from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Purchases, Stores, PriceMaster, Suppliers, Users

from models.CreatePurchaseModel import CreatePurchaseModel


def create_purchase(purchase: CreatePurchaseModel, db: Session):
    user_id = db.scalars(select(Users.id).where(Users.username == purchase.created_by)).first()

    store_id = db.scalars(select(Stores.id).where(Stores.store_name == purchase.shop_name)).first()
    product_id = db.scalars(select(PriceMaster.id).where(PriceMaster.brand == purchase.product_name)).first()
    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == purchase.supplier_name)).first()

    db_purchase = Purchases(
        id = purchase.id,
        store_id = store_id,
        product_id = product_id,
        supplier_id = supplier_id,
        order_date = purchase.order_date,
        expected_date = purchase.expected_date,
        received_date = purchase.received_date,
        quantity_ordered = purchase.quantity_ordered,
        quantity_received = purchase.quantity_received,
        created_by = user_id,
        created_on = purchase.created_on,
        updated_by = purchase.updated_by,
        updated_on = purchase.updated_on
    )
    db.add(db_purchase)
    db.commit()

    return 201