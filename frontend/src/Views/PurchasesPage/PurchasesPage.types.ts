import { StoreGridColumnsType } from "../StoresPage";
import { SuppliersGridColumnsType } from "../SuppliersPage";

export type LoaderDataType = {
  suppliers: SuppliersGridColumnsType[];
  stores: StoreGridColumnsType[];
};

export type PurchaseApiColumnsType = {
  id: number;
  category: string;
  product_name: string;
  shop_name: string;
  supplier_name: string;
  invoice_number: string;
  received_date: string;
  quantity_ordered: number;
  quantity_received: number;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
};

export type PurchaseGridColumnsType = {
  id: number;
  category: string;
  productName: string;
  shopName?: string;
  supplierName?: string;
  invoiceNumber: string;
  receivedDate: string;
  quantityOrdered: number;
  quantityReceived: number;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};
