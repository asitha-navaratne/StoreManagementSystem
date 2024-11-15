from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

import database.models as models
from database.config import engine

from routers import price_master, purchases, stores, suppliers, stock_movements, invoices


app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

app.include_router(price_master.router)
app.include_router(purchases.router)
app.include_router(stores.router)
app.include_router(suppliers.router)
app.include_router(stock_movements.router)
app.include_router(invoices.router)