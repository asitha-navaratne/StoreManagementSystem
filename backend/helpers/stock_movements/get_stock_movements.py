from datetime import datetime
from sqlalchemy import select, func, and_
from sqlalchemy.orm import Session

from database.models import StockMovements, PriceMaster, Stores, Purchases, Users


def get_stock_movements(store: str, date: str, db: Session):
    store_id = db.scalars(select(Stores.id).where(Stores.store_name == store)).first()

    processed_results = []

    if date == datetime.today().strftime('%Y-%m-%d'):
        subquery = (
            select(StockMovements.product_id, func.max(StockMovements.record_date).label('latest_record_date'))
            .group_by(StockMovements.product_id)
            .subquery()
        )

        stmt = (
            select(StockMovements, PriceMaster, Stores, Purchases.quantity_received, Users.username)
            .join(subquery,
                  (StockMovements.product_id == subquery.c.product_id) &
                  (StockMovements.record_date == subquery.c.latest_record_date))
            .join(PriceMaster, StockMovements.product_id == PriceMaster.id, isouter=True)
            .join(Stores, StockMovements.store_id == Stores.id, isouter=True)
            .join(Purchases, and_(StockMovements.product_id == Purchases.product_id, StockMovements.store_id == Purchases.store_id, StockMovements.record_date == Purchases.received_date))
            .join(Users, StockMovements.updated_by == Users.id, isouter=True)
            .where(StockMovements.store_id == store_id)
        )

        results = db.execute(stmt).all()
    else:
        stmt = (
            select(StockMovements, PriceMaster, Stores, Purchases.quantity_received, Users.username)
            .join(PriceMaster, StockMovements.product_id == PriceMaster.id, isouter=True)
            .join(Stores, StockMovements.store_id == Stores.id, isouter=True)
            .join(Purchases, and_(StockMovements.product_id == Purchases.product_id, StockMovements.store_id == Purchases.store_id, StockMovements.record_date == Purchases.received_date))
            .join(Users, StockMovements.updated_by == Users.id, isouter=True)
            .where(StockMovements.store_id == store_id)
            .where(StockMovements.record_date == date)
        )
        results = db.execute(stmt).all()

        if len(results) == 0:
            stmt = (
                select(StockMovements, PriceMaster, Stores, Users.username)
                .join(PriceMaster, StockMovements.product_id == PriceMaster.id, isouter=True)
                .join(Stores, StockMovements.store_id == Stores.id, isouter=True)
                .join(Users, StockMovements.updated_by == Users.id, isouter=True)
                .where(StockMovements.store_id == store_id)
                .where(StockMovements.record_date == date)
            )
            results = db.execute(stmt).all()

            for result in results:
                result_dict = {
                    'id': result[0].id,
                    'product_id': result[1].id,
                    'product_name': result[1].brand,
                    'store_id': result[2].id,
                    'store_name': result[2].store_name,
                    'record_date': result[0].record_date,
                    'in_hand': result[0].in_hand,
                    'purchased_amount': 0,
                    'sold': result[0].sold,
                    'updated_by': result[3],
                }
                
                processed_results.append(result_dict)

            return processed_results
        
    for result in results:
        result_dict = {
            'id': result[0].id,
            'product_id': result[1].id,
            'product_name': result[1].brand,
            'store_id': result[2].id,
            'store_name': result[2].store_name,
            'record_date': result[0].record_date,
            'in_hand': result[0].in_hand,
            'purchased_amount': result[3],
            'sold': result[0].sold,
            'updated_by': result[4],
        }
        
        processed_results.append(result_dict)

    return processed_results
