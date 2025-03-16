from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session

from database.models import Vat

from models.CreateVatModel import CreateVatModel


def add_new_vat_rate(vat: CreateVatModel, db: Session):
    try:
        check_fields = [
            "rate",
            "updated_by",
            "updated_on"
        ]

        invalid_field = ""

        for field in check_fields:
            is_value_valid = getattr(vat, field) not in ("", None)
            if not is_value_valid:
                invalid_field = field
                break

        if invalid_field != "":
            vat_dict = vat.model_dump()
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": f"Field \"{invalid_field}\" cannot be empty!",
                    "errors": [{
                        "loc": ["body", invalid_field],
                        "msg": "field required",
                        "type": "value_error.missing"
                    }],
                    "body": vat_dict
                }
            )

        db_vat = Vat(
            rate = vat.rate,
            updated_by = vat.updated_by,
            updated_on = vat.updated_on
        )
        db.add(db_vat)
        db.commit()

        return 201
    except Exception as err:
        vat_dict = vat.model_dump()
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "add_new_vat_rate"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": vat_dict
            }
        )