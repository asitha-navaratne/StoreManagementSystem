from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import PriceMaster, Stores


def get_price_items_by_supplier(supplier_id: int, db: Session):
    stmt = (
        select(PriceMaster, Stores)
        .join(Stores, PriceMaster.store_id == Stores.id, isouter=True).where(PriceMaster.supplier_id == supplier_id)
    )
    results = db.execute(stmt).all()

    processed_results = []
    for result in results:
        result_dict = {
            'id': result[0].id,
            'shop_name': result[1].store_name,
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