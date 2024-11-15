type InvoiceApiColumnsType = {
  id: number;
  invoice_date: string;
  supplier_name: string;
  invoice_number: number;
  description: string;
  value_of_purchases: number;
  vat: number;
  total_payable: number;
  invoice_type: string;
  received_date: string;
  payment_date: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
};

export default InvoiceApiColumnsType;
