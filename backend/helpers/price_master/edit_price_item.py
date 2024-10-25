from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import PriceMaster, Stores, Suppliers, Users

from models.CreatePriceModel import CreatePriceModel


def edit_price_item(price: CreatePriceModel, db: Session):
    created_user_id = db.scalars(select(Users.id).where(Users.username == price.created_by)).first()
    updated_user_id = db.scalars(select(Users.id).where(Users.username == price.updated_by)).first()
    
    store_id = db.scalars(select(Stores.id).where(Stores.store_name == price.shop_name)).first()
    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == price.company_name)).first()

    stmt = (
        update(PriceMaster)
        .where(PriceMaster.id == price.id)
        .values(
            store_id = store_id,
            supplier_id = supplier_id,
            brand = price.brand,
            brand_code = price.brand_code,
            category = price.category,
            bottle_size = price.bottle_size,
            container_size = price.container_size,
            tax_price = price.tax_price,
            cost = price.cost,
            price = price.price,
            commissions = price.commissions,
            margin = price.margin,
            active = price.active,
            created_by = created_user_id,
            created_on = price.created_on,
            updated_by = updated_user_id,
            updated_on = price.updated_on,
        )
    )
    db.execute(stmt)
    db.commit()

    return 200