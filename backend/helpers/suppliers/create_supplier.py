from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Suppliers, Users

from models.CreateSupplierModel import CreateSupplierModel


def create_supplier(supplier: CreateSupplierModel, db: Session):
    try:
        user_id = db.scalars(select(Users.id).where(Users.username == supplier.created_by)).first()

        check_fields = [
            "id",
            "company_name",
            "contact_person",
            "supplier_code",
            "number",
            "supplier_tin",
            "invoice_type",
            "payment_period",
            "active",
            "created_by",
            "created_on",
        ]

        invalid_field = ""

        for field in check_fields:
            is_value_valid = getattr(supplier, field) not in ("", 0, None)
            if not is_value_valid:
                invalid_field = field
                break

        if invalid_field != "":
            supplier_dict = supplier.model_dump()
            supplier_dict["created_on"] = supplier.created_on.isoformat()
            supplier_dict["updated_on"] = supplier.updated_on.isoformat() if supplier.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": f"Field \"{invalid_field}\" cannot be empty!",
                    "errors": [{
                        "loc": ["body", invalid_field],
                        "msg": "field required",
                        "type": "value_error.missing"
                    }],
                    "body": supplier_dict
                }
            )

        item_exists = db.scalars(
            select(Suppliers.id)
            .where(Suppliers.company_name == supplier.company_name)
            .where(Suppliers.supplier_tin == supplier.supplier_tin)
        ).first() is not None

        if item_exists:
            supplier_dict = supplier.model_dump()
            supplier_dict["created_on"] = supplier.created_on.isoformat()
            supplier_dict["updated_on"] = supplier.updated_on.isoformat() if supplier.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "A record with the given details already exists.",
                    "errors": [{
                        "loc": ["body", supplier.id],
                        "msg": "record exists",
                        "type": "conflict.record_already_exists"
                    }],
                    "body": supplier_dict
                }
            )

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
    except Exception as err:
        supplier_dict = supplier.model_dump()
        supplier_dict["created_on"] = supplier.created_on.isoformat()
        supplier_dict["updated_on"] = supplier.updated_on.isoformat() if supplier.updated_on else None
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "create_supplier"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": supplier_dict
            }
        )