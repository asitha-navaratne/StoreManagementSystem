from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import PriceMaster, Suppliers, Stores


def get_price_items_by_supplier_and_store(supplier_name: str, store_name: str, db: Session):
    try:
        supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.supplier_name == supplier_name)).first()
        store_id = db.scalars(select(Stores.id).where(Stores.store_name == store_name)).first()

        stmt = (
            select(PriceMaster)
            .where(PriceMaster.supplier_id == supplier_id)
            .where(PriceMaster.store_id == store_id)
        )
        results = db.execute(stmt).all()

        processed_results = []
        for result in results:
            result_dict = {
                'id': result[0].id,
                'store_id': result[0].store_id,
                'supplier_id': result[0].supplier_id,
                'brand': result[0].brand,
                'brand_code': result[0].brand_code,
                'category': result[0].category,
                'bottle_size': result[0].bottle_size,
                'container_size': result[0].container_size,
                'tax_price': result[0].tax_price,
                'cost': result[0].cost,
                'price': result[0].price,
                'commissions': result[0].commissions,
                'margin': result[0].margin,
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
                    "loc": ["function", "get_price_items_by_supplier_and_store"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": {
                    "supplier_name": supplier_name,
                    "store_name": store_name,
                }
            }
        )