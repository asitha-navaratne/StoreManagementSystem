type StockMovementsApiColumnsType = {
  id: number;
  product_id: number;
  product_name: string;
  store_id: number;
  store_name: string;
  record_date: string;
  in_hand: number;
  current_in_hand: number;
  purchased_amount: number;
  sold: number;
  updated_by: string;
};

export default StockMovementsApiColumnsType;
