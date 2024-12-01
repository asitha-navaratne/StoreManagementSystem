import os
import uvicorn
from fastapi import FastAPI, Request, status
from fastapi.middleware.cors import CORSMiddleware
from fastapi.exceptions import RequestValidationError
from fastapi.responses import JSONResponse

from database.config import engine
import database.models as models

from routers import price_master, purchases, stores, suppliers, stock_movements, invoices


app = FastAPI()

origins = [
    "http://localhost:5173",
    "https://store-management-system-ecd55.web.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

models.Base.metadata.create_all(bind=engine)

@app.exception_handler(RequestValidationError)
async def validation_exception_handler(_: Request, exc: RequestValidationError):
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={
            "message": 'Validation error occurred',
            "errors": exc.errors(),
            "body": exc.body
        }
    )

app.include_router(price_master.router)
app.include_router(purchases.router)
app.include_router(stores.router)
app.include_router(suppliers.router)
app.include_router(stock_movements.router)
app.include_router(invoices.router)

PORT = os.getenv("PORT")

if __name__ == '__main__':
    uvicorn.run('main:app', host='0.0.0.0', port=PORT)