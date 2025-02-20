from fastapi import status
from fastapi.responses import JSONResponse
from sqlalchemy import select
from sqlalchemy.orm import Session

from database.models import Invoices, Suppliers, Stores

from models.CreateInvoiceModel import CreateInvoiceModel


def create_invoice(invoice: CreateInvoiceModel, db: Session):
    try:
        supplier_id = db.scalars(select(Suppliers.id).where(Suppliers.supplier_name == invoice.supplier_name)).first()
        store_id = db.scalars(select(Stores.id).where(Stores.store_name == invoice.store_name)).first()

        check_fields = [
            "invoice_date",
            "supplier_name",
            "store_name",
            "invoice_number",
            "value_of_purchases",
            "vat",
            "total_payable",
            "invoice_type",
            "received_date",
            "payment_date",
            "created_by",
            "created_on",
        ]

        invalid_field = ""

        for field in check_fields:
            is_value_valid = getattr(invoice, field) not in ("", 0, None)
            if not is_value_valid:
                invalid_field = field
                break

        if invalid_field != "":
            invoice_dict = invoice.model_dump()
            invoice_dict["created_on"] = invoice.created_on.isoformat()
            invoice_dict["updated_on"] = invoice.updated_on.isoformat() if invoice.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_400_BAD_REQUEST,
                content={
                    "message": f"Field \"{invalid_field}\" cannot be empty!",
                    "errors": [{
                        "loc": ["body", invalid_field],
                        "msg": "field required",
                        "type": "value_error.missing"
                    }],
                    "body": invoice_dict
                }
            )

        item_exists = db.scalars(
            select(Invoices.id)
            .where(Invoices.invoice_number == invoice.invoice_number)
        ).first() is not None

        if item_exists:
            invoice_dict = invoice.model_dump()
            invoice_dict["created_on"] = invoice.created_on.isoformat()
            invoice_dict["updated_on"] = invoice.updated_on.isoformat() if invoice.updated_on else None
            return JSONResponse(
                status_code=status.HTTP_409_CONFLICT,
                content={
                    "message": "A record with the given details already exists.",
                    "errors": [{
                        "loc": ["body", invoice.id],
                        "msg": "record exists",
                        "type": "conflict.record_already_exists"
                    }],
                    "body": invoice_dict
                }
            )

        db_invoice = Invoices(
            id = invoice.id,
            invoice_date = invoice.invoice_date,
            supplier_id = supplier_id,
            store_id = store_id,
            invoice_number = invoice.invoice_number,
            description = invoice.description,
            value_of_purchases = invoice.value_of_purchases,
            vat = invoice.vat,
            total_payable = invoice.total_payable,
            invoice_type = invoice.invoice_type,
            received_date = invoice.received_date,
            payment_date = invoice.payment_date,
            created_by = invoice.created_by,
            created_on = invoice.created_on,
            updated_by = invoice.updated_by,
            updated_on = invoice.updated_on
        )
        db.add(db_invoice)
        db.commit()

        return 201
    except Exception as err:
        return JSONResponse(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            content={
                "message": str(err),
                "errors": [{
                    "loc": ["function", "create_invoice"],
                    "msg": str(err),
                    "type": "server_error.unexpected"
                }],
                "body": None
            }
        )