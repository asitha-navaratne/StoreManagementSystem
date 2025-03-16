import datetime
from sqlalchemy import ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import Mapped, mapped_column

from .config import Base


class Stores(Base):
    __tablename__ = 'stores'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    store_name: Mapped[str] = mapped_column(nullable=False)
    store_address: Mapped[str]
    active: Mapped[bool] = mapped_column(nullable=False)
    created_by: Mapped[str] = mapped_column(nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[str] = mapped_column(nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

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
    created_by: Mapped[str] = mapped_column(nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[str] = mapped_column(nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

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
    created_by: Mapped[str] = mapped_column(nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[str] = mapped_column(nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

class StockMovements(Base):
    __tablename__ = 'stock_movements'

    id: Mapped[int] = mapped_column(primary_key=True, index=True, autoincrement=True)
    product_id: Mapped[int] = mapped_column(ForeignKey('price_master.id'), index=True, nullable=False)
    store_id: Mapped[int] = mapped_column(ForeignKey('stores.id'), index=True, nullable=False)
    record_date: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True))
    in_hand: Mapped[int]
    sold: Mapped[int] = mapped_column(nullable=True)
    updated_by: Mapped[str] = mapped_column(nullable=False)

class Suppliers(Base):
    __tablename__ = 'suppliers'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    supplier_code: Mapped[str] = mapped_column(nullable=False)
    supplier_name: Mapped[str] = mapped_column(nullable=False)
    supplier_short_name: Mapped[str] = mapped_column(nullable=False)
    supplier_tin: Mapped[str] = mapped_column(nullable=False)
    contact_person: Mapped[str] = mapped_column(nullable=False)
    phone_number: Mapped[str] = mapped_column(nullable=False)
    email: Mapped[str]
    invoice_type: Mapped[str]
    payment_period: Mapped[int]
    active: Mapped[bool] = mapped_column(nullable=False)
    created_by: Mapped[str] = mapped_column(nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[str] = mapped_column(nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

class PriceMaster(Base):
    __tablename__ = 'price_master'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    store_id: Mapped[str] = mapped_column(ForeignKey('stores.id'), index=True, nullable=False)
    supplier_id: Mapped[int] = mapped_column(ForeignKey('suppliers.id'), index=True, nullable=False)
    brand_code: Mapped[str] = mapped_column(nullable=False)
    source_type: Mapped[str] = mapped_column(nullable=False)
    category: Mapped[str] = mapped_column(nullable=False)
    country: Mapped[str] = mapped_column(nullable=False)
    variety: Mapped[str] = mapped_column(nullable=False)
    volume: Mapped[int] = mapped_column(nullable=False)
    company_product_code: Mapped[str] = mapped_column(nullable=False)
    product_name: Mapped[str] = mapped_column(nullable=False)
    bottle_size: Mapped[int] = mapped_column(nullable=False)
    container_size: Mapped[int]
    tax_price: Mapped[int] = mapped_column(nullable=False)
    price: Mapped[int] = mapped_column(nullable=False)
    staff_margin:Mapped[int]
    active: Mapped[bool] = mapped_column(nullable=False)
    created_by: Mapped[str] = mapped_column(nullable=False)
    created_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), server_default=func.now())
    updated_by: Mapped[str] = mapped_column(nullable=True)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)

class Vat(Base):
    __tablename__ = 'vat'

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    rate: Mapped[int] = mapped_column(nullable=False)
    updated_on: Mapped[datetime.datetime] = mapped_column(DateTime(timezone=True), nullable=True)
    updated_by: Mapped[str] = mapped_column(nullable=True)