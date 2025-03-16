import { GridValidRowModel } from "@mui/x-data-grid";

import { PurchaseApiColumnsType } from "../Views/PurchasesPage";

function processPurchasePayload(
  row: GridValidRowModel,
  supplierName: string,
  storeName: string
): PurchaseApiColumnsType {
  return {
    id: row.id,
    category: row.category,
    shop_name: storeName,
    product_name: row.productName,
    supplier_name: supplierName,
    invoice_number: row.invoiceNumber,
    received_date: row.receivedDate,
    quantity_ordered: row.quantityOrdered,
    quantity_received: row.quantityReceived,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
}

export default processPurchasePayload;
