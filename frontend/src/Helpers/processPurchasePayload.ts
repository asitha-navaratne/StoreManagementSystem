import { GridValidRowModel } from "@mui/x-data-grid";

import PurchaseApiColumnsType from "../Views/PurchasesPage/types/ApiColumnsType";

const processPurchasePayload = function (
  row: GridValidRowModel,
  supplierId: string
): PurchaseApiColumnsType {
  const regex = /^(.+?) \((.+?)\)$/;
  const match = row.productName.match(regex);

  const productName = match[1];
  const shopName = match[2];

  return {
    id: row.id,
    category: row.category,
    shop_name: shopName,
    product_name: productName,
    supplier_id: supplierId,
    invoice_number: row.invoiceNumber,
    received_date: row.receivedDate,
    quantity_ordered: row.quantityOrdered,
    quantity_received: row.quantityReceived,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
};

export default processPurchasePayload;
