import StoresGridColumnsType from "../StoresPage/types/GridColumnsType";
import SuppliersGridColumnsType from "../SuppliersPage/types/GridColumnsType";

export type PriceMasterGridColumnsType = {
  id: number;
  shopName: string;
  supplierName: string;
  brandCode: string;
  sourceType: string;
  category: string;
  country: string;
  variety: string;
  volume: number;
  companyProductCode: string;
  productName: string;
  bottleSize: number;
  containerSize: number;
  taxPrice: number;
  price: number;
  staffMargin: number;
  active: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export type PriceMasterApiColumnsType = {
  id: number;
  shop_name: string;
  supplier_name: string;
  brand_code: string;
  source_type: string;
  category: string;
  country: string;
  variety: string;
  volume: number;
  company_product_code: string;
  product_name: string;
  bottle_size: number;
  container_size: number;
  tax_price: number;
  price: number;
  staff_margin: number;
  active: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
};

export type VatRateType = {
  id: number;
  rate: number;
  updatedBy: string;
  updatedOn: string;
};

export type LoaderDataType = {
  products: PriceMasterGridColumnsType[];
  stores: StoresGridColumnsType[];
  suppliers: SuppliersGridColumnsType[];
  vat: VatRateType | null;
};
