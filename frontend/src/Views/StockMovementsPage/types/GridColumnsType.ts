type StockMovementsGridColumnsType = {
  id: number;
  productId: number;
  productName: string;
  storeId: number;
  storeName: string;
  recordDate: string;
  inHand: number;
  secondInHand: number;
  secondSold: number;
  secondReceived: number;
  secondRecordDate: string;
  thirdInHand: number;
  thirdSold: number;
  thirdReceived: number;
  thirdRecordDate: string;
  fourthInHand: number;
  fourthSold: number;
  fourthReceived: number;
  fourthRecordDate: string;
  currentInHand: number;
  purchasedAmount: number;
  sold: number;
  updatedBy: string;
};

export default StockMovementsGridColumnsType;
