from sqlalchemy import select
from sqlalchemy.orm import Session, aliased

from database.models import Stores, Users


def get_stores(db: Session):
    user_alias_1 = aliased(Users, name="user_alias_1")
    user_alias_2 = aliased(Users, name="user_alias_2")

    stmt = (
        select(Stores, user_alias_1.username, user_alias_2.username)
        .join(user_alias_1, Stores.created_by == user_alias_1.id, isouter=True)
        .join(user_alias_2, Stores.updated_by == user_alias_2.id, isouter=True)
    )
    results = db.execute(stmt).all()

    processed_results = []
    for result in results:
        result_dict = {
            'id': result[0].id,
            'store_name': result[0].store_name,
            'store_address': result[0].store_address,
            'active': result[0].active,
            'created_by': result[1],
            'created_on': result[0].created_on,
        }
        if result[2] is None:
            result_dict = {**result_dict, 'updated_by': None, 'updated_on': None}
        else:
            result_dict = {**result_dict, 'updated_by': result[2], 'updated_on': result[0].updated_on}
        
        processed_results.append(result_dict)

    return processed_results