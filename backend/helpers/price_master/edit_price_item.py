from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import PriceMaster, Stores, Suppliers, Users

from models.CreatePriceModel import CreatePriceModel


def edit_price_item(price_item: CreatePriceModel, db: Session):
    try:
        created_user_id = db.scalars(select(Users.id).where(Users.username == price_item.created_by)).first()
        updated_user_id = db.scalars(select(Users.id).where(Users.username == price_item.updated_by)).first()
        
        store_id = db.scalars(select(Stores.id).where(Stores.store_name == price_item.shop_name)).first()
        supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == price_item.company_name)).first()

        check_fields = [
            "id",
            "shop_name",
            "company_name",
            "brand",
            "brand_code",
            "category",
            "bottle_size",
            "tax_price",
            "cost",
            "price",
            "active",
            "created_by",
            "created_on",
        ]

        invalid_field = ""

        for field in check_fields:
            is_value_valid = getattr(price_item, field) not in ("", 0, None)
            if not is_value_valid:
                invalid_field = field
                break

        if invalid_field != "":
            price_item_dict = price_item.model_dump()
            price_item_dict["created_on"] = price_item.created_on.isoformat()
            price_item_dict["updated_on"] = price_item.updated_on.isoformat() if price_item.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": f"Field \"{invalid_field}\" cannot be empty!",
                    "errors": [{
                        "loc": ["body", invalid_field],
                        "msg": "field required",
                        "type": "value_error.missing"
                    }],
                    "body": price_item_dict
                }
            )

        item_exists = db.scalars(
            select(PriceMaster.id)
            .where(PriceMaster.store_id == store_id)
            .where(PriceMaster.supplier_id == supplier_id)
            .where(PriceMaster.brand == price_item.brand)
            .where(PriceMaster.id != price_item.id)
        ).first() is not None

        if item_exists:
            price_item_dict = price_item.model_dump()
            price_item_dict["created_on"] = price_item.created_on.isoformat()
            price_item_dict["updated_on"] = price_item.updated_on.isoformat() if price_item.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "A record with the given details already exists.",
                    "errors": [{
                        "loc": ["body", price_item.id],
                        "msg": "record exists",
                        "type": "conflict.record_already_exists"
                    }],
                    "body": price_item_dict
                }
            )

        stmt = (
            update(PriceMaster)
            .where(PriceMaster.id == price_item.id)
            .values(
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
                created_by = created_user_id,
                created_on = price_item.created_on,
                updated_by = updated_user_id,
                updated_on = price_item.updated_on,
            )
        )
        db.execute(stmt)
        db.commit()

        return 200
    except Exception as err:
        price_item_dict = price_item.model_dump()
        price_item_dict["created_on"] = price_item.created_on.isoformat()
        price_item_dict["updated_on"] = price_item.updated_on.isoformat() if price_item.updated_on else None
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "edit_price_item"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": price_item_dict
            }
        )