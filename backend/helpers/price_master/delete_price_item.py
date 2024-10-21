from sqlalchemy import delete
from sqlalchemy.orm import Session

from database.models import PriceMaster


def delete_price_item(id: int, db: Session):
    db.execute(delete(PriceMaster).where(PriceMaster.id == id))
    db.commit()

    return 200