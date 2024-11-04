type StockMovementsApiColumnsType = {
  id: number;
  product_id: number;
  product_name: string;
  store_id: number;
  store_name: string;
  record_date: string;
  in_hand: number;
  second_in_hand: number;
  second_sold: number;
  second_received: number;
  second_record_date: string;
  third_in_hand: number;
  third_sold: number;
  third_received: number;
  third_record_date: string;
  fourth_in_hand: number;
  fourth_sold: number;
  fourth_received: number;
  fourth_record_date: string;
  current_in_hand: number;
  purchased_amount: number;
  sold: number;
  updated_by: string;
};

export default StockMovementsApiColumnsType;
