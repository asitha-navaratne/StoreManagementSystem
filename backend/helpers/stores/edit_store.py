from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import Stores, Users

from models.CreateStoreModel import CreateStoreModel


def edit_store(store: CreateStoreModel, db: Session):
    try:
        created_user_id = db.scalars(select(Users.id).where(Users.username == store.created_by)).first()
        updated_user_id = db.scalars(select(Users.id).where(Users.username == store.updated_by)).first()

        check_fields = [
            "id",
            "store_name",
            "active",
            "created_by",
            "created_on",
        ]

        invalid_field = ""

        for field in check_fields:
            is_value_valid = getattr(store, field) not in ("", 0, None)
            if not is_value_valid:
                invalid_field = field
                break

        if invalid_field != "":
            store_dict = store.model_dump()
            store_dict["created_on"] = store.created_on.isoformat()
            store_dict["updated_on"] = store.updated_on.isoformat() if store.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": f"Field \"{invalid_field}\" cannot be empty!",
                    "errors": [{
                        "loc": ["body", invalid_field],
                        "msg": "field required",
                        "type": "value_error.missing"
                    }],
                    "body": store_dict
                }
            )

        item_exists = db.scalars(
            select(Stores.id)
            .where(Stores.store_name == store.store_name)
        ).first() is not None

        if item_exists:
            store_dict = store.model_dump()
            store_dict["created_on"] = store.created_on.isoformat()
            store_dict["updated_on"] = store.updated_on.isoformat() if store.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "A record with the given details already exists.",
                    "errors": [{
                        "loc": ["body", store.id],
                        "msg": "record exists",
                        "type": "conflict.record_already_exists"
                    }],
                    "body": store_dict
                }
            )
        
        stmt = (
            update(Stores)
            .where(Stores.id == store.id)
            .values(
                store_name = store.store_name,
                store_address = store.store_address,
                active = store.active,
                created_by = created_user_id,
                created_on = store.created_on,
                updated_by = updated_user_id,
                updated_on = store.updated_on,
            )
        )
        db.execute(stmt)
        db.commit()

        return 200
    except Exception as err:
        store_dict = store.model_dump()
        store_dict["created_on"] = store.created_on.isoformat()
        store_dict["updated_on"] = store.updated_on.isoformat() if store.updated_on else None
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "edit_store"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": store_dict
            }
        )