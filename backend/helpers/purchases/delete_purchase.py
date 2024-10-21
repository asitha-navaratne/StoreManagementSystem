from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import Purchases


def delete_purchase(id: int, db: Session):
    db.execute(delete(Purchases).where(Purchases.id == id))
    db.commit()

    return 200