from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Vat


def get_vat_rate(db: Session):
    try:
        stmt = select(Vat).order_by(Vat.id.desc()).limit(1)
        result = db.execute(stmt).scalar_one_or_none()

        return result
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "get_vat_rate"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )