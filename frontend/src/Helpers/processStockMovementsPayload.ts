import { GridValidRowModel } from "@mui/x-data-grid";

import { StockMovementsApiColumnsType } from "../Views/StockMovementsPage";

function processStockMovementsPayload(
  row: GridValidRowModel
): StockMovementsApiColumnsType {
  return {
    id: row.id,
    product_id: row.productId,
    product_name: row.productName,
    brand_code: row.brandCode,
    store_id: row.storeId,
    store_name: row.storeName,
    supplier_code: row.supplierCode,
    price: row.price,
    record_date: row.recordDate,
    in_hand: row.inHand,
    second_in_hand: row.secondInHand,
    second_sold: row.secondSold,
    second_received: row.secondReceived,
    second_record_date: row.secondRecordDate,
    third_in_hand: row.thirdInHand,
    third_sold: row.thirdSold,
    third_received: row.thirdReceived,
    third_record_date: row.thirdRecordDate,
    fourth_in_hand: row.fourthInHand,
    fourth_sold: row.fourthSold,
    fourth_received: row.fourthReceived,
    fourth_record_date: row.fourthRecordDate,
    current_in_hand: row.currentInHand,
    purchased_amount: row.purchasedAmount,
    sold: row.sold,
    updated_by: row.updatedBy,
  };
}

export default processStockMovementsPayload;
