import StockMovementsGridColumnsType from "../Views/StockMovementsPage/types/GridColumnsType";
import StockMovementsApiColumnsType from "../Views/StockMovementsPage/types/ApiColumnsType";

const processStockMovementsColumns = function (
  payload: StockMovementsApiColumnsType
): StockMovementsGridColumnsType {
  return {
    id: payload.id,
    productId: payload.product_id,
    productName: payload.product_name,
    brandCode: payload.brand_code,
    storeId: payload.store_id,
    storeName: payload.store_name,
    supplierCode: payload.supplier_code,
    price: payload.price,
    recordDate: payload.record_date,
    inHand: payload.in_hand,
    secondInHand: payload.second_in_hand,
    secondSold: payload.second_sold,
    secondReceived: payload.second_received,
    secondRecordDate: payload.second_record_date,
    thirdInHand: payload.third_in_hand,
    thirdSold: payload.third_sold,
    thirdReceived: payload.third_received,
    thirdRecordDate: payload.third_record_date,
    fourthInHand: payload.fourth_in_hand,
    fourthSold: payload.fourth_sold,
    fourthReceived: payload.fourth_received,
    fourthRecordDate: payload.fourth_record_date,
    currentInHand: 0,
    purchasedAmount: payload.purchased_amount,
    sold: payload.sold,
    updatedBy: payload.updated_by,
  };
};

export default processStockMovementsColumns;
