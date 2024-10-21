from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import Suppliers


def delete_supplier(id: int, db: Session):
    db.execute(delete(Suppliers).where(Suppliers.id == id))
    db.commit()

    return 200