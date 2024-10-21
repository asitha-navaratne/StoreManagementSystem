import { GridValidRowModel } from "@mui/x-data-grid";

import StockMovementsApiColumnsType from "../Views/StockMovementsPage/types/ApiColumnsType";

const processStockMovementsPayload = function (
  payload: GridValidRowModel
): StockMovementsApiColumnsType {
  return {
    id: payload.id,
    product_id: payload.productId,
    product_name: payload.productName,
    store_id: payload.storeId,
    store_name: payload.storeName,
    record_date: payload.recordDate,
    in_hand: payload.inHand,
    current_in_hand: payload.currentInHand,
    purchased_amount: payload.purchasedAmount,
    sold: payload.sold,
    updated_by: "AsithaN",
  };
};

export default processStockMovementsPayload;
