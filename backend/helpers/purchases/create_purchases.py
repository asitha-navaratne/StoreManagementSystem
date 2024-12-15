from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select, insert
from sqlalchemy.orm import Session

from database.models import Purchases, PriceMaster, Stores, Suppliers, Invoices

from models.CreatePurchaseModel import CreatePurchaseModel


def create_purchases(purchases: list[CreatePurchaseModel], db: Session):
    try:
        create_purchases_list = []

        for purchase in purchases:
            product_id = db.scalars(select(PriceMaster.id).where(PriceMaster.brand == purchase.product_name)).first()
            store_id = db.scalars(select(Stores.id).where(Stores.store_name == purchase.shop_name)).first()
            supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == purchase.supplier_name)).first()
            invoice_id = db.scalars(select(Invoices.id).where(Invoices.invoice_number == purchase.invoice_number)).first()

            create_purchases_list.append({
                'id': purchase.id,
                'store_id': store_id,
                'product_id': product_id,
                'supplier_id': supplier_id,
                'invoice_id': invoice_id,
                'received_date': purchase.received_date,
                'quantity_ordered': purchase.quantity_ordered,
                'quantity_received': purchase.quantity_received,
                'created_by': purchase.created_by,
                'created_on': purchase.created_on,
                'updated_by': purchase.updated_by,
                'updated_on': purchase.updated_on,
            })

        db.execute(insert(Purchases).values(create_purchases_list))
        db.commit()

        return 201
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "create_purchases"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )