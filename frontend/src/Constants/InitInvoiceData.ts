import dayjs from "dayjs";

const InitInvoiceData = {
  invoiceDate: dayjs().format("YYYY-MM-DD"),
  invoiceNumber: "",
  quantity: 0,
  valueOfPurchases: 0,
  vat: 0,
  totalPayable: 0,
  receivedDate: dayjs().format("YYYY-MM-DD"),
  invoiceType: "local",
  payment: "paid",
  supplierName: "",
  description: "",
  paymentDate: null,
  createdBy: "",
  createdOn: dayjs().format("YYYY-MM-DD"),
  updatedBy: null,
  updatedOn: null,
};

export default InitInvoiceData;
