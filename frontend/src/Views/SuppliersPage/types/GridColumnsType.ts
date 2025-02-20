type SuppliersGridColumnsType = {
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

export default SuppliersGridColumnsType;
