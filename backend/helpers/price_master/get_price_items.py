from sqlalchemy import select
from sqlalchemy.orm import Session, aliased

from database.models import PriceMaster, Stores, Suppliers, Users


def get_price_items(db: Session):
    user_alias_1 = aliased(Users, name="user_alias_1")
    user_alias_2 = aliased(Users, name="user_alias_2")

    stmt = (
        select(PriceMaster, Stores.store_name, Suppliers.company_name, user_alias_1.username, user_alias_2.username)
        .join(Stores, PriceMaster.store_id == Stores.id, isouter=True)
        .join(Suppliers, PriceMaster.supplier_id == Suppliers.id, isouter=True)
        .join(user_alias_1, PriceMaster.created_by == user_alias_1.id, isouter=True)
        .join(user_alias_2, PriceMaster.updated_by == user_alias_2.id, isouter=True)
    )
    results = db.execute(stmt).all()

    processed_results = []
    for result in results:
        result_dict = {
            'id': result[0].id,
            'shop_name': result[1],
            'company_name': result[2],
            'brand': result[0].brand,
            'brand_code': result[0].brand_code,
            'bottle_size': result[0].bottle_size,
            'container_size': result[0].container_size,
            'price': result[0].price,
            'commissions': result[0].commissions,
            'margin': result[0].margin,
            'active': result[0].active,
            'created_by': result[3],
            'created_on': result[0].created_on,
        }
        if result[4] is None:
            result_dict = {**result_dict, 'updated_by': None, 'updated_on': None}
        else:
            result_dict = {**result_dict, 'updated_by': result[4], 'updated_on': result[0].updated_on}
        
        processed_results.append(result_dict)
    
    return processed_results