from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import Suppliers


def delete_supplier(id: int, db: Session):
    try:
        db.execute(delete(Suppliers).where(Suppliers.id == id))
        db.commit()

        return 200
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "delete_supplier"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": {
                    "id": id
                }
            }
        )