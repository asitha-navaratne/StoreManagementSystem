type InvoicePayloadDataType = {
  id?: number;
  invoiceDate: string;
  invoiceType: string;
  invoiceNumber: string;
  supplierName: string;
  quantity: number;
  valueOfPurchases: number;
  vat: number;
  totalPayable: number;
  receivedDate: string;
  payment: string;
  paymentDate: string | null;
  description: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string | null;
  updatedOn: string | null;
};

export default InvoicePayloadDataType;
