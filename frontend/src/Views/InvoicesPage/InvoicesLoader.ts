import ColumnsType from "./types/ApiColumnsType";

import Service from "../../Services/InvoicesService";

const { GetInvoices } = Service();

const loader = async function () {
  return GetInvoices()
    .then((res) => {
      return res.data.map((row: ColumnsType) => ({
        id: row.id,
        invoiceDate: row.invoice_date,
        supplierName: row.supplier_name,
        storeName: row.store_name,
        invoiceNumber: row.invoice_number,
        description: row.description,
        valueOfPurchases: row.value_of_purchases,
        vat: row.vat,
        totalPayable: row.total_payable,
        invoiceType: row.invoice_type,
        receivedDate: row.received_date,
        paymentDate: row.payment_date,
        createdBy: row.created_by,
        createdOn: row.created_on,
        updatedBy: row.updated_by,
        updatedOn: row.updated_on,
      }));
    })
    .catch((err) => {
      // TODO: Handle errors properly
      console.error(err);
    });
};

export default loader;
