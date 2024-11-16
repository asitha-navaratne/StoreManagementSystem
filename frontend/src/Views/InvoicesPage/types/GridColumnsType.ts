type InvoiceGridColumnsType = {
  id: number;
  invoiceDate: string;
  supplierName: string;
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

export default InvoiceGridColumnsType;
