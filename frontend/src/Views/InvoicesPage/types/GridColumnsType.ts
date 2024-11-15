type InvoiceGridColumnsType = {
  id: number;
  invoiceDate: string;
  supplierId?: number;
  supplierName?: string;
  invoiceNumber: number;
  description: string;
  valueOfPurchases: number;
  vat: number;
  totalPayable: number;
  invoiceType: string;
  receivedDate: string;
  paymentDate: string;
  createdBy: string;
  createdOn: string;
  updatedBy: string;
  updatedOn: string;
};

export default InvoiceGridColumnsType;
