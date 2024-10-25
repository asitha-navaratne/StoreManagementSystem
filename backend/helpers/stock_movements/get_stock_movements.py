from datetime import datetime
from sqlalchemy import select, func, and_, desc
from sqlalchemy.orm import Session, aliased

from database.models import StockMovements, PriceMaster, Stores, Purchases, Users


def get_stock_movements(store: str, date: str, db: Session):
    store_id = db.scalars(select(Stores.id).where(Stores.store_name == store)).first()
    sm = aliased(StockMovements)
    
    processed_results = []

    if date == datetime.today().strftime('%Y-%m-%d'):
        subquery = select(func.count(func.distinct(sm.product_id, sm.store_id))).scalar_subquery()
        
        stmt = (
            select(
                sm,
                func.lag(sm.in_hand, 1).over(order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_in_hand'),
                func.lag(sm.in_hand, 2).over(order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_in_hand'),
                func.lag(sm.in_hand, 3).over(order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_in_hand'),
                PriceMaster,
                Stores,
                Purchases.quantity_received,
                Users.username
            )
            .join(PriceMaster, sm.product_id == PriceMaster.id)
            .join(Stores, sm.store_id == Stores.id)
            .join(Purchases, and_(sm.product_id == Purchases.product_id, sm.store_id == Purchases.store_id, sm.record_date == Purchases.received_date))
            .join(Users, sm.updated_by == Users.id)
            .where(sm.store_id == store_id)
            .order_by(desc(sm.record_date))
            .limit(subquery)
        )

        results = db.execute(stmt).all()
    else:
        stock_lags_cte = (
            select(
                sm,
                func.lag(sm.in_hand, 1).over(partition_by=[sm.product_id, sm.store_id], order_by=sm.record_date).label('second_in_hand'),
                func.lag(sm.in_hand, 2).over(partition_by=[sm.product_id, sm.store_id], order_by=sm.record_date).label('third_in_hand'),
                func.lag(sm.in_hand, 3).over(partition_by=[sm.product_id, sm.store_id], order_by=sm.record_date).label('fourth_in_hand')
            )
            .cte('stock_lags')
        )
        stmt = (
            select(
                sm,
                stock_lags_cte.c.second_in_hand,
                stock_lags_cte.c.third_in_hand,
                stock_lags_cte.c.fourth_in_hand,
                PriceMaster,
                Stores,
                Purchases.quantity_received,
                Users.username
            )
            .join(stock_lags_cte, sm.id == stock_lags_cte.c.id)
            .join(PriceMaster, sm.product_id == PriceMaster.id)
            .join(Stores, sm.store_id == Stores.id)
            .join(Purchases, and_(sm.product_id == Purchases.product_id, sm.store_id == Purchases.store_id, sm.record_date == Purchases.received_date))
            .join(Users, sm.updated_by == Users.id)
            .where(stock_lags_cte.c.store_id == store_id)
            .where(stock_lags_cte.c.record_date == date)
        )
        results = db.execute(stmt).all()
    
    for result in results:
        result_dict = {
            'id': result[0].id,
            'product_id': result[4].id,
            'product_name': result[4].brand,
            'store_id': result[5].id,
            'store_name': result[5].store_name,
            'record_date': result[0].record_date,
            'in_hand': result[0].in_hand,
            'second_in_hand': result[1],
            'third_in_hand': result[2],
            'fourth_in_hand': result[3],
            'purchased_amount': result[6],
            'sold': result[0].sold,
            'updated_by': result[7],
        }
        
        processed_results.append(result_dict)

    return processed_results
