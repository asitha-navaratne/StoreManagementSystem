import PurchaseApiColumnsType from "../Views/PurchasesPage/types/ApiColumnsType";
import PurchaseGridColumnsType from "../Views/PurchasesPage/types/GridColumnsType";

function processPurchaseColumns(
  payload: PurchaseApiColumnsType
): PurchaseGridColumnsType {
  return {
    id: payload.id,
    category: payload.category,
    shopName: payload.shop_name,
    productName: payload.product_name,
    supplierName: payload.supplier_name,
    invoiceNumber: payload.invoice_number,
    receivedDate: payload.received_date,
    quantityOrdered: payload.quantity_ordered,
    quantityReceived: payload.quantity_received,
    createdBy: payload.created_by,
    createdOn: payload.created_on,
    updatedBy: payload.updated_by,
    updatedOn: payload.updated_on,
  };
}

export default processPurchaseColumns;
