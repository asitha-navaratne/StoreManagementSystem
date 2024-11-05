import { GridValidRowModel } from "@mui/x-data-grid";

import StockMovementsApiColumnsType from "../Views/StockMovementsPage/types/ApiColumnsType";

const processStockMovementsPayload = function (
  payload: GridValidRowModel
): StockMovementsApiColumnsType {
  return {
    id: payload.id,
    product_id: payload.productId,
    product_name: payload.productName,
    brand_code: payload.brandCode,
    store_id: payload.storeId,
    store_name: payload.storeName,
    supplier_code: payload.supplierCode,
    price: payload.price,
    record_date: payload.recordDate,
    in_hand: payload.inHand,
    second_in_hand: payload.secondInHand,
    second_sold: payload.secondSold,
    second_received: payload.secondReceived,
    second_record_date: payload.secondRecordDate,
    third_in_hand: payload.thirdInHand,
    third_sold: payload.thirdSold,
    third_received: payload.thirdReceived,
    third_record_date: payload.thirdRecordDate,
    fourth_in_hand: payload.fourthInHand,
    fourth_sold: payload.fourthSold,
    fourth_received: payload.fourthReceived,
    fourth_record_date: payload.fourthRecordDate,
    current_in_hand: payload.currentInHand,
    purchased_amount: payload.purchasedAmount,
    sold: payload.sold,
    updated_by: "AsithaN",
  };
};

export default processStockMovementsPayload;
