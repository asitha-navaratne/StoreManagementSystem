from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Invoices, Suppliers, Stores


def get_invoices(db: Session):
    try:
        stmt = (
            select(Invoices, Suppliers, Stores)
            .join(Suppliers, Invoices.supplier_id == Suppliers.id, isouter=True)
            .join(Stores, Invoices.store_id == Stores.id, isouter=True)
        )
        results = db.execute(stmt).all()

        processed_results = []
        for result in results:
            result_dict = {
                'id': result[0].id,
                'invoice_date': result[0].invoice_date,
                'supplier_name': result[1].supplier_name,
                'supplier_tin': result[1].supplier_tin,
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

            processed_results.append(result_dict)

        return processed_results
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "get_invoices"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )