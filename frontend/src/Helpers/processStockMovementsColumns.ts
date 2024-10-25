import StockMovementsGridColumnsType from "../Views/StockMovementsPage/types/GridColumnsType";
import StockMovementsApiColumnsType from "../Views/StockMovementsPage/types/ApiColumnsType";

const processStockMovementsColumns = function (
  payload: StockMovementsApiColumnsType
): StockMovementsGridColumnsType {
  return {
    id: payload.id,
    productId: payload.product_id,
    productName: payload.product_name,
    storeId: payload.store_id,
    storeName: payload.store_name,
    recordDate: payload.record_date,
    inHand: payload.in_hand,
    secondInHand: payload.second_in_hand,
    thirdInHand: payload.third_in_hand,
    fourthInHand: payload.fourth_in_hand,
    currentInHand: 0,
    purchasedAmount: payload.purchased_amount,
    sold: payload.sold,
    updatedBy: payload.updated_by,
  };
};

export default processStockMovementsColumns;
