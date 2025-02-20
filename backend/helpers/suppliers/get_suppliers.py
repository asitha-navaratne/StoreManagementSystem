from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Suppliers


def get_suppliers(db: Session):
    try:
        results = db.execute(select(Suppliers)).all()

        processed_results = []
        for result in results:
            result_dict = {
                'id': result[0].id,
                'supplier_name': result[0].supplier_name,
                'contact_person': result[0].contact_person,
                'supplier_short_name': result[0].supplier_short_name,
                'supplier_code': result[0].supplier_code,
                'phone_number': result[0].phone_number,
                'supplier_tin': result[0].supplier_tin,
                'email': result[0].email,
                'invoice_type': result[0].invoice_type,
                'payment_period': result[0].payment_period,
                'active': result[0].active,
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
                    "loc": ["function", "get_suppliers"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )