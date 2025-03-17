export type SuppliersApiColumnsType = {
  id: number;
  supplier_name: string;
  supplier_short_name: string;
  contact_person: string;
  supplier_code: string;
  phone_number: string;
  supplier_tin: string;
  email: string;
  invoice_type: "Local" | "Foreign";
  payment_period: number;
  active: string;
  created_by: string;
  created_on: string;
  updated_by: string;
  updated_on: string;
};

export type SuppliersGridColumnsType = {
  id: number;
  supplierName: string;
  supplierShortName: string;
  contactPerson: string;
  supplierCode: string;
  phoneNumber: string;
  supplierTin: string;
  email: string;
  invoiceType: "Local" | "Foreign";
  paymentPeriod: number;
  active: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};
