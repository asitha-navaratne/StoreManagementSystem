from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import PriceMaster, Stores, Suppliers, Users

from models.CreatePriceModel import CreatePriceModel


def create_price_item(price_item: CreatePriceModel, db: Session):
    user_id = db.scalars(select(Users.id).where(Users.username == price_item.created_by)).first()

    store_id = db.scalars(select(Stores.id).where(Stores.store_name == price_item.shop_name)).first()
    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == price_item.company_name)).first()

    db_price = PriceMaster(
        id = price_item.id,
        store_id = store_id,
        supplier_id = supplier_id,
        brand = price_item.brand,
        brand_code = price_item.brand_code,
        bottle_size = price_item.bottle_size,
        commissions = price_item.commissions,
        container_size = price_item.container_size,
        price = price_item.price,
        margin = price_item.margin,
        active = price_item.active,
        created_by = user_id,
        created_on = price_item.created_on,
        updated_by = price_item.updated_by,
        updated_on = price_item.updated_on
    )
    db.add(db_price)
    db.commit()

    return 201