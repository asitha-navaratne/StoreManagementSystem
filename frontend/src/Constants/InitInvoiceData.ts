import dayjs from "dayjs";

const InitInvoiceData = {
  id: 0,
  invoiceDate: dayjs().format("YYYY-MM-DD"),
  supplierName: "",
  supplierTin: "",
  storeName: "",
  invoiceNumber: 0,
  description: "",
  valueOfPurchases: 0,
  vat: 0,
  totalPayable: 0,
  invoiceType: "Local",
  receivedDate: dayjs().format("YYYY-MM-DD"),
  paymentDate: null,
  createdBy: "",
  createdOn: dayjs().format("YYYY-MM-DD"),
  updatedBy: null,
  updatedOn: null,
};

export default InitInvoiceData;
