from datetime import datetime
from sqlalchemy import select, func, and_, desc
from sqlalchemy.orm import Session, aliased

from database.models import StockMovements, PriceMaster, Stores, Suppliers, Purchases, Users


def get_stock_movements(store: str, date: str, db: Session):
    store_id = db.scalars(select(Stores.id).where(Stores.store_name == store)).first()
    sm = aliased(StockMovements)
    
    processed_results = []

    if date == datetime.today().strftime('%Y-%m-%d'):
        subquery = select(func.count(func.distinct(sm.product_id, sm.store_id))).scalar_subquery()
        
        stmt = (
            select(
                sm,
                func.lag(sm.in_hand, 1).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_in_hand'),
                func.lag(sm.sold, 1).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_sold'),
                func.lag(Purchases.quantity_received, 1).over(partition_by=[Purchases.product_id], order_by=[Purchases.product_id, Purchases.store_id, Purchases.received_date]).label('second_received'),
                func.lag(sm.record_date, 1).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_record_date'),
                func.lag(sm.in_hand, 2).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_in_hand'),
                func.lag(sm.sold, 2).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_sold'),
                func.lag(Purchases.quantity_received, 2).over(partition_by=[Purchases.product_id], order_by=[Purchases.product_id, Purchases.store_id, Purchases.received_date]).label('third_received'),
                func.lag(sm.record_date, 2).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_record_date'),
                func.lag(sm.in_hand, 3).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_in_hand'),
                func.lag(sm.sold, 3).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_sold'),
                func.lag(Purchases.quantity_received, 3).over(partition_by=[Purchases.product_id], order_by=[Purchases.product_id, Purchases.store_id, Purchases.received_date]).label('fourth_received'),
                func.lag(sm.record_date, 3).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_record_date'),
                PriceMaster,
                Stores,
                Suppliers,
                Purchases.quantity_received,
                Users.username
            )
            .join(PriceMaster, sm.product_id == PriceMaster.id)
            .join(Stores, sm.store_id == Stores.id)
            .join(Suppliers, and_(sm.product_id == PriceMaster.id, PriceMaster.supplier_id == Suppliers.id))
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
                sm.id,
                sm.record_date,
                func.lag(sm.in_hand, 1).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_in_hand'),
                func.lag(sm.sold, 1).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_sold'),
                func.lag(Purchases.quantity_received, 1).over(partition_by=[Purchases.product_id], order_by=[Purchases.product_id, Purchases.store_id, Purchases.received_date]).label('second_received'),
                func.lag(sm.record_date, 1).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('second_record_date'),
                func.lag(sm.in_hand, 2).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_in_hand'),
                func.lag(sm.sold, 2).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_sold'),
                func.lag(Purchases.quantity_received, 2).over(partition_by=[Purchases.product_id], order_by=[Purchases.product_id, Purchases.store_id, Purchases.received_date]).label('third_received'),
                func.lag(sm.record_date, 2).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('third_record_date'),
                func.lag(sm.in_hand, 3).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_in_hand'),
                func.lag(sm.sold, 3).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_sold'),
                func.lag(Purchases.quantity_received, 3).over(partition_by=[Purchases.product_id], order_by=[Purchases.product_id, Purchases.store_id, Purchases.received_date]).label('fourth_received'),
                func.lag(sm.record_date, 3).over(partition_by=[sm.product_id], order_by=[sm.product_id, sm.store_id, sm.record_date]).label('fourth_record_date'),
            )
            .join(Purchases, and_(sm.product_id == Purchases.product_id, sm.store_id == Purchases.store_id, sm.record_date == Purchases.received_date))
            .where(sm.store_id == store_id)
            .order_by(desc(sm.record_date))
            .cte('stock_lags')
        )
        stmt = (
            select(
                sm,
                stock_lags_cte.c.second_in_hand,
                stock_lags_cte.c.second_sold,
                stock_lags_cte.c.second_received,
                stock_lags_cte.c.second_record_date,
                stock_lags_cte.c.third_in_hand,
                stock_lags_cte.c.third_sold,
                stock_lags_cte.c.third_received,
                stock_lags_cte.c.third_record_date,
                stock_lags_cte.c.fourth_in_hand,
                stock_lags_cte.c.fourth_sold,
                stock_lags_cte.c.fourth_received,
                stock_lags_cte.c.fourth_record_date,
                PriceMaster,
                Stores,
                Suppliers,
                Purchases.quantity_received,
                Users.username
            )
            .join(stock_lags_cte, sm.id == stock_lags_cte.c.id)
            .join(PriceMaster, sm.product_id == PriceMaster.id)
            .join(Stores, sm.store_id == Stores.id)
            .join(Suppliers, and_(sm.product_id == PriceMaster.id, PriceMaster.supplier_id == Suppliers.id))
            .join(Purchases, and_(sm.product_id == Purchases.product_id, sm.store_id == Purchases.store_id, sm.record_date == Purchases.received_date))
            .join(Users, sm.updated_by == Users.id)
            .where(stock_lags_cte.c.record_date == date)
        )
        results = db.execute(stmt).all()
    
    for result in results:
        result_dict = {
            'id': result[0].id,
            'product_id': result[13].id,
            'product_name': result[13].brand,
            'brand_code': result[13].brand_code,
            'store_id': result[14].id,
            'store_name': result[14].store_name,
            'supplier_code': result[15].supplier_code,
            'price': result[13].price,
            'record_date': result[0].record_date,
            'in_hand': result[0].in_hand,
            'second_in_hand': result[1],
            'second_sold': result[2],
            'second_received': result[3],
            'second_record_date': result[4],
            'third_in_hand': result[5],
            'third_sold': result[6],
            'third_received': result[7],
            'third_record_date': result[8],
            'fourth_in_hand': result[9],
            'fourth_sold': result[10],
            'fourth_received': result[11],
            'fourth_record_date': result[12],
            'purchased_amount': result[16],
            'sold': result[0].sold,
            'updated_by': result[17],
        }
        
        processed_results.append(result_dict)

    return processed_results
