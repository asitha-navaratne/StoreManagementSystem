from sqlalchemy import select, update
from sqlalchemy.orm import Session

from database.models import Stores, Users

from models.CreateStoreModel import CreateStoreModel


def edit_store(store: CreateStoreModel, db: Session):
    created_user_id = db.scalars(select(Users.id).where(Users.username == store.created_by)).first()
    updated_user_id = db.scalars(select(Users.id).where(Users.username == store.updated_by)).first()
    
    stmt = (
        update(Stores)
        .where(Stores.id == store.id)
        .values(
            store_name = store.store_name,
            store_address = store.store_address,
            active = store.active,
            created_by = created_user_id,
            created_on = store.created_on,
            updated_by = updated_user_id,
            updated_on = store.updated_on,
        )
    )
    db.execute(stmt)
    db.commit()

    return 200