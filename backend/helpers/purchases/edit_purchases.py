from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import Purchases, Users

from models.CreatePurchaseModel import CreatePurchaseModel


def edit_purchases(purchases: list[CreatePurchaseModel], db: Session):
    try:
        user_id = db.scalars(select(Users.id).where(Users.username == purchases[0].updated_by)).first()

        update_purchases_list = [{
            'id': purchase.id,
            'quantity_ordered': purchase.quantity_ordered,
            'quantity_received': purchase.quantity_received,
            'updated_by': user_id
        } for purchase in purchases]

        db.execute(update(Purchases), update_purchases_list)
        db.commit()

        return 200
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "get_price_items"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )