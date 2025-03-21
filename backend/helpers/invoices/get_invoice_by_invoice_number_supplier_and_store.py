from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select, and_
from sqlalchemy.orm import Session

from database.models import Invoices, Suppliers, Stores


def get_invoice_by_invoice_number_supplier_and_store(invoice_number: int, supplier_name: str, store_name: str, db: Session):
    try:
        supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.supplier_name == supplier_name)).first()
        store_id = db.scalars(select(Stores.id).where(Stores.store_name == store_name)).first()

        stmt = (
            select(Invoices, Suppliers, Stores)
            .join(Suppliers, Invoices.supplier_id == Suppliers.id, isouter=True)
            .join(Stores, Invoices.store_id == Stores.id, isouter=True)
            .where(and_(Invoices.invoice_number == invoice_number, Invoices.supplier_id == supplier_id, Invoices.store_id == store_id))
        )

        result = db.execute(stmt).first()

        if result:
            result_dict = {
                'id': result[0].id,
                'invoice_date': result[0].invoice_date,
                'supplier_name': result[1].supplier_name,
                'store_name': result[2].store_name,
                'invoice_number': result[0].invoice_number,
                'description': result[0].description,
                'value_of_purchases': result[0].value_of_purchases,
                'vat': result[0].vat,
                'total_payable': result[0].total_payable,
                'invoice_type': result[0].invoice_type,
                'received_date': result[0].received_date,
                'payment_date': result[0].payment_date,
                'created_by': result[0].created_by,
                'created_on': result[0].created_on,
                'updated_by': result[0].updated_by,
                'updated_on': result[0].updated_on,
            }

            return result_dict
        
        return None
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "get_invoice_by_invoice_number_supplier_and_store"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )