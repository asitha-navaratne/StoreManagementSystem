type PurchaseGridColumnsType = {
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

export default PurchaseGridColumnsType;
