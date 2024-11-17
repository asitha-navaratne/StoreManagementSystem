import { GridValidRowModel } from "@mui/x-data-grid";

import InvoiceApiColumnsType from "../Views/InvoicesPage/types/ApiColumnsType";

const processInvoicePayload = function (
  payload: GridValidRowModel
): InvoiceApiColumnsType {
  return {
    id: payload.id,
    invoice_date: payload.invoiceDate,
    supplier_name: payload.supplierName,
    store_name: payload.storeName,
    invoice_number: payload.invoiceNumber,
    description: payload.description,
    value_of_purchases: payload.valueOfPurchases,
    vat: payload.vat,
    total_payable: payload.totalPayable,
    invoice_type: payload.invoiceType,
    received_date: payload.receivedDate,
    payment_date: payload.paymentDate,
    created_by: payload.createdBy,
    created_on: payload.createdOn,
    updated_by: payload.updatedBy,
    updated_on: payload.updatedOn,
  };
};

export default processInvoicePayload;
