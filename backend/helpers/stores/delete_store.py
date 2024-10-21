from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import Stores


def delete_store(id: int, db: Session):
    db.execute(delete(Stores).where(Stores.id == id))
    db.commit()

    return 200