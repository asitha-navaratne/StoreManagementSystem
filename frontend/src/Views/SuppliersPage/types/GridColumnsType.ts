type SuppliersGridColumnsType = {
  id: number;
  companyName: string;
  contactPerson: string;
  number: string;
  supplierTin: number;
  email: string;
  invoiceType: "local" | "foreign";
  paymentPeriod: number;
  active: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export default SuppliersGridColumnsType;
