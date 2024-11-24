import { GridValidRowModel } from "@mui/x-data-grid";

import InvoiceApiColumnsType from "../Views/InvoicesPage/types/ApiColumnsType";

function processInvoicePayload(row: GridValidRowModel): InvoiceApiColumnsType {
  return {
    id: row.id,
    invoice_date: row.invoiceDate,
    supplier_name: row.supplierName,
    store_name: row.storeName,
    invoice_number: row.invoiceNumber,
    description: row.description,
    value_of_purchases: row.valueOfPurchases,
    vat: row.vat,
    total_payable: row.totalPayable,
    invoice_type: row.invoiceType,
    received_date: row.receivedDate,
    payment_date: row.paymentDate,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
}

export default processInvoicePayload;
