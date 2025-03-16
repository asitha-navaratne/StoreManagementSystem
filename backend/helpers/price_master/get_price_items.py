from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import PriceMaster, Stores, Suppliers


def get_price_items(db: Session):
    try:
        stmt = (
            select(PriceMaster, Stores.store_name, Suppliers.supplier_name)
            .join(Stores, PriceMaster.store_id == Stores.id, isouter=True)
            .join(Suppliers, PriceMaster.supplier_id == Suppliers.id, isouter=True)
        )
        results = db.execute(stmt).all()

        processed_results = []
        for result in results:
            result_dict = {
                'id': result[0].id,
                'shop_name': result[1],
                'supplier_name': result[2],
                'brand_code': result[0].brand_code,
                'source_type': result[0].source_type,
                'category': result[0].category,
                'country': result[0].country,
                'variety': result[0].variety,
                'volume': result[0].volume,
                'company_product_code': result[0].company_product_code,
                'product_name': result[0].product_name,
                'bottle_size': result[0].bottle_size,
                'container_size': result[0].container_size,
                'tax_price': result[0].tax_price,
                'price': result[0].price,
                'staff_margin': result[0].staff_margin,
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
                    "loc": ["function", "get_price_items"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )