import datetime
from typing import Optional
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from .config import Base


class Stores(Base):
    __tablename__ = 'stores'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    store_name: Mapped[str] = mapped_column(nullable=False)
    store_address: Mapped[str]
    active: Mapped[bool] = mapped_column(nullable=False)
    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

    created_user: Mapped["Users"] = relationship("Users", foreign_keys="Stores.created_by")
    updated_user: Mapped[Optional["Users"]] = relationship("Users", foreign_keys="Stores.updated_by")

class Purchases(Base):
    __tablename__ = 'purchases'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    store_id: Mapped[int] = mapped_column(ForeignKey('stores.id'), index=True, nullable=False)
    product_id: Mapped[int] = mapped_column(ForeignKey('price_master.id'), index=True, nullable=False)
    supplier_id: Mapped[int] = mapped_column(ForeignKey('suppliers.id'), index=True, nullable=False)
    invoice_id: Mapped[int] = mapped_column(ForeignKey('invoices.id'), index=True, nullable=False)
    received_date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True))
    quantity_ordered: Mapped[int]
    quantity_received: Mapped[int]
    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

    created_user: Mapped["Users"] = relationship("Users", foreign_keys="Purchases.created_by")
    updated_user: Mapped[Optional["Users"]] = relationship("Users", foreign_keys="Purchases.updated_by")

class Invoices(Base):
    __tablename__ = 'invoices'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    invoice_date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True))
    supplier_id: Mapped[int] = mapped_column(ForeignKey('suppliers.id'), index=True, nullable=False)
    store_id: Mapped[int] = mapped_column(ForeignKey('stores.id'), index=True, nullable=False)
    invoice_number: Mapped[int] = mapped_column(nullable=False)
    description: Mapped[str]
    value_of_purchases: Mapped[int] = mapped_column(nullable=False)
    vat: Mapped[int] = mapped_column(nullable=False)
    total_payable: Mapped[int] = mapped_column(nullable=False)
    invoice_type: Mapped[str] = mapped_column(nullable=False)
    received_date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=False)
    payment_date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

    created_user: Mapped["Users"] = relationship("Users", foreign_keys="Invoices.created_by")
    updated_user: Mapped[Optional["Users"]] = relationship("Users", foreign_keys="Invoices.updated_by")

class Users(Base):
    __tablename__ = 'users'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    username: Mapped[str] = mapped_column(nullable=False)
    firstname: Mapped[str]
    lastname: Mapped[str]
    type: Mapped[str] = mapped_column(nullable=False)
    hashed_password: Mapped[str] = mapped_column(nullable=False)
    active: Mapped[bool] = mapped_column(nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

class StockMovements(Base):
    __tablename__ = 'stock_movements'

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(ForeignKey('price_master.id'), index=True, nullable=False)
    store_id: Mapped[int] = mapped_column(ForeignKey('stores.id'), index=True, nullable=False)
    record_date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True))
    in_hand: Mapped[int]
    sold: Mapped[int] = mapped_column(nullable=True)
    updated_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    
    updated_user: Mapped[Optional["Users"]] = relationship("Users", foreign_keys="StockMovements.updated_by")

class Suppliers(Base):
    __tablename__ = 'suppliers'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    company_name: Mapped[str] = mapped_column(nullable=False)
    contact_person: Mapped[str] = mapped_column(nullable=False)
    supplier_code: Mapped[str]
    number: Mapped[str] = mapped_column(nullable=False)
    supplier_tin: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str]
    invoice_type: Mapped[str]
    payment_period: Mapped[int]
    active: Mapped[bool] = mapped_column(nullable=False)
    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    
    created_user: Mapped["Users"] = relationship("Users", foreign_keys="Suppliers.created_by")
    updated_user: Mapped[Optional["Users"]] = relationship("Users", foreign_keys="Suppliers.updated_by")

class PriceMaster(Base):
    __tablename__ = 'price_master'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    store_id: Mapped[str] = mapped_column(ForeignKey('stores.id'), index=True, nullable=False)
    supplier_id: Mapped[int] = mapped_column(ForeignKey('suppliers.id'), index=True, nullable=False)
    brand: Mapped[str] = mapped_column(nullable=False)
    brand_code: Mapped[str] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(nullable=False)
    bottle_size: Mapped[int] = mapped_column(nullable=False)
    container_size: Mapped[int]
    tax_price: Mapped[int] = mapped_column(nullable=False)
    cost: Mapped[int] = mapped_column(nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)
    commissions:Mapped[int]
    margin:Mapped[int]
    active: Mapped[bool] = mapped_column(nullable=False)
    created_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[int] = mapped_column(ForeignKey('users.id'), nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    
    created_user: Mapped["Users"] = relationship("Users", foreign_keys="PriceMaster.created_by")
    updated_user: Mapped[Optional["Users"]] = relationship("Users", foreign_keys="PriceMaster.updated_by")