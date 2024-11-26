from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import PriceMaster


def delete_price_item(id: int, db: Session):
    try:
        db.execute(delete(PriceMaster).where(PriceMaster.id == id))
        db.commit()

        return 200
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "delete_price_item"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": {
                    "id": id
                }
            }
        )