from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session, aliased

from database.models import Purchases, Stores, PriceMaster, Suppliers, Invoices, Users


def get_purchases_for_invoice(invoice_number: int, supplier_name: str, store_name: str, db: Session):
    try:
        user_alias_1 = aliased(Users, name="user_alias_1")
        user_alias_2 = aliased(Users, name="user_alias_2")
        
        invoice_id = db.scalars(select(Invoices.id).where(Invoices.invoice_number == invoice_number)).first()
        supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.company_name == supplier_name)).first()
        store_id = db.scalars(select(Stores.id).where(Stores.store_name == store_name)).first()

        stmt = (
            select(Purchases, Stores.store_name, PriceMaster, Suppliers.company_name, user_alias_1.username, user_alias_2.username)
            .join(Stores, Purchases.store_id == Stores.id, isouter=True)
            .join(PriceMaster, Purchases.product_id == PriceMaster.id, isouter=True)
            .join(Suppliers, Purchases.supplier_id == Purchases.id, isouter=True)
            .join(user_alias_1, Purchases.created_by == user_alias_1.id, isouter=True)
            .join(user_alias_2, Purchases.updated_by == user_alias_2.id, isouter=True)
            .where(Purchases.invoice_id == invoice_id)
            .where(Purchases.supplier_id == supplier_id)
            .where(Purchases.store_id == store_id)
            .order_by(Purchases.received_date)
        )
        results = db.execute(stmt).all()

        processed_results = []
        for result in results:
            result_dict = {
                'id': result[0].id,
                'category': result[2].category,
                'shop_name': result[1],
                'product_name': result[2].brand,
                'supplier_name': result[3],
                'invoice_id': result[0].invoice_id,
                'received_date': result[0].received_date,
                'quantity_ordered': result[0].quantity_ordered,
                'quantity_received': result[0].quantity_received,
                'created_by': result[4],
                'created_on': result[0].created_on,
            }
            if result[5] is None:
                result_dict = {**result_dict, 'updated_by': None, 'updated_on': None}
            else:
                result_dict = {**result_dict, 'updated_by': result[5], 'updated_on': result[0].updated_on}
            
            processed_results.append(result_dict)

        return processed_results
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "get_purchases_for_invoice"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )