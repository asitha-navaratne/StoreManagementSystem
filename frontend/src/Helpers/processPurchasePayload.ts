import { GridValidRowModel } from "@mui/x-data-grid";

import PurchaseApiColumnsType from "../Views/PurchasesPage/types/ApiColumnsType";

const processPurchasePayload = function (
  column: GridValidRowModel
): PurchaseApiColumnsType {
  return {
    id: column.id,
    shop_name: column.shopName,
    product_name: column.productName,
    supplier_name: column.supplierName,
    order_date: column.orderDate,
    expected_date: column.expectedDate,
    received_date: column.receivedDate,
    quantity_ordered: column.quantityOrdered,
    quantity_received: column.quantityReceived,
    created_by: column.createdBy,
    created_on: column.createdOn,
    updated_by: column.updatedBy,
    updated_on: column.updatedOn,
  };
};

export default processPurchasePayload;
