import {
  InvoiceApiColumnsType,
  InvoiceGridColumnsType,
} from "../Views/InvoicesPage";

function processInvoiceColumns(
  payload: InvoiceApiColumnsType
): InvoiceGridColumnsType {
  return {
    id: payload.id,
    invoiceDate: payload.invoice_date,
    supplierName: payload.supplier_name,
    supplierTin: payload.supplier_tin,
    storeName: payload.store_name,
    invoiceNumber: payload.invoice_number,
    description: payload.description,
    valueOfPurchases: payload.value_of_purchases,
    vat: payload.vat,
    totalPayable: payload.total_payable,
    invoiceType: payload.invoice_type,
    receivedDate: payload.received_date,
    paymentDate: payload.payment_date,
    createdBy: payload.created_by,
    createdOn: payload.created_on,
    updatedBy: payload.updated_by,
    updatedOn: payload.updated_on,
  };
}

export default processInvoiceColumns;
