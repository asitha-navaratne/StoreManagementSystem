from datetime import datetime, timedelta
from sqlalchemy import select, insert, update
from sqlalchemy.orm import Session

from database.models import StockMovements, Users

from models.CreateStockMovementModel import CreateStockMovementModel


def update_stock_movements(stock_movements: list[CreateStockMovementModel], db: Session):
    user_id = db.scalars(select(Users.id).where(Users.username == stock_movements[0].updated_by)).first()

    update_stock_movements_list = [{
        **stock_movement.model_dump(),
        'updated_by': user_id
    } for stock_movement in stock_movements]

    next_date = datetime.today() + timedelta(days=1)
    if next_date.weekday() >= 5:
        next_date = next_date + timedelta(days=2)
    
    create_stock_movements_list = [{
        'product_id': stock_movement.product_id,
        'store_id': stock_movement.store_id,
        'record_date': next_date.strftime('%Y-%m-%d'),
        'in_hand': stock_movement.current_in_hand,
        'sold': None,
        'updated_by': user_id
    } for stock_movement in stock_movements]

    db.execute(update(StockMovements), update_stock_movements_list)
    db.execute(insert(StockMovements).values(create_stock_movements_list))

    db.commit()
    
    return 200