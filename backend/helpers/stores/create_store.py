from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Stores, Users

from models.CreateStoreModel import CreateStoreModel


def create_store(store: CreateStoreModel, db: Session):
    user_id = db.scalars(select(Users.id).where(Users.username == store.created_by)).first()

    db_store = Stores(
        id = store.id,
        store_name = store.store_name,
        store_address = store.store_address,
        active = store.active,
        created_by = user_id,
        created_on = store.created_on,
        updated_by = store.updated_by,
        updated_on = store.updated_on
    )
    db.add(db_store)
    db.commit()

    return 201