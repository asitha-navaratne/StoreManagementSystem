type StockMovementsGridColumnsType = {
  id: number;
  productId: number;
  productName: string;
  storeId: number;
  storeName: string;
  recordDate: string;
  inHand: number;
  secondInHand: number;
  thirdInHand: number;
  fourthInHand: number;
  currentInHand: number;
  purchasedAmount: number;
  sold: number;
  updatedBy: string;
};

export default StockMovementsGridColumnsType;
