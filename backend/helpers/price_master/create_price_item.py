from fastapi import HTTPException, status
from fastapi.encoders import jsonable_encoder
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import PriceMaster, Stores, Suppliers, Users

from models.CreatePriceModel import CreatePriceModel


def create_price_item(price_item: CreatePriceModel, db: Session):
    user_id = db.scalars(select(Users.id).where(Users.username == price_item.created_by)).first()

    store_id = db.scalars(select(Stores.id).where(Stores.store_name == price_item.shop_name)).first()
    supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == price_item.company_name)).first()

    item_exists = db.scalars(
        select(PriceMaster.id)
        .where(PriceMaster.store_id == store_id)
        .where(PriceMaster.supplier_id == supplier_id)
        .where(PriceMaster.brand == price_item.brand)
    ).first() is not None

    if item_exists:
        return JSONResponse(
            status_code=status.HTTP_409_CONFLICT, 
            content=jsonable_encoder({
                "detail": "A record with similar data already exists!",
                "id": price_item.id
            })
        )

    db_price = PriceMaster(
        id = price_item.id,
        store_id = store_id,
        supplier_id = supplier_id,
        brand = price_item.brand,
        brand_code = price_item.brand_code,
        category = price_item.category,
        bottle_size = price_item.bottle_size,
        container_size = price_item.container_size,
        tax_price = price_item.tax_price,
        cost = price_item.cost,
        price = price_item.price,
        commissions = price_item.commissions,
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