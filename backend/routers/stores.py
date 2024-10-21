from fastapi import APIRouter, Depends, status
from typing import Annotated
from sqlalchemy.orm import Session

from database.config import SessionLocal

from models.CreateStoreModel import CreateStoreModel

from helpers.stores.get_stores import get_stores
from helpers.stores.create_store import create_store
from helpers.stores.edit_store import edit_store
from helpers.stores.delete_store import delete_store


router = APIRouter(
    prefix='/stores',
    tags=['Stores']
)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

db_dependency = Annotated[Session, Depends(get_db)]

@router.get('/')
def get_all_stores(db: db_dependency):
    return get_stores(db)

@router.post('/', status_code=status.HTTP_201_CREATED)
def add_store(store: CreateStoreModel, db: db_dependency):
    return create_store(store=store, db=db)

@router.patch('/')
def update_store(store: CreateStoreModel, db: db_dependency):
    return edit_store(store=store, db=db)

@router.delete('/{id}')
def remove_store(id: int, db: db_dependency):
    return delete_store(id=id, db=db)