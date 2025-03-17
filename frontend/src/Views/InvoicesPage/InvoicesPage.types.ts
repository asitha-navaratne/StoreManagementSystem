export type InvoiceApiColumnsType = {
  id: number;
  invoice_date: string;
  supplier_name: string;
  supplier_tin: string;
  store_name: string;
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

export type InvoiceGridColumnsType = {
  id: number;
  invoiceDate: string;
  supplierName: string;
  supplierTin: string;
  storeName: string;
  invoiceNumber: number;
  description: string;
  valueOfPurchases: number;
  vat: number;
  totalPayable: number;
  invoiceType: string;
  receivedDate: string;
  paymentDate: string | null;
  createdBy: string;
  createdOn: string;
  updatedBy: string | null;
  updatedOn: string | null;
};
