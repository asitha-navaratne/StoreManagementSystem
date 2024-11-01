import ColumnsType from "./types/ApiColumnsType";

import Service from "../../Services/SupplierService";

const { GetSuppliers } = Service();

const loader = async function () {
  return GetSuppliers()
    .then((res) => {
      return res.data.map((row: ColumnsType) => ({
        id: row.id,
        companyName: row.company_name,
        contactPerson: row.contact_person,
        supplierCode: row.supplier_code,
        number: row.number,
        supplierTin: row.supplier_tin,
        email: row.email,
        invoiceType: row.invoice_type,
        paymentPeriod: row.payment_period,
        active: row.active,
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
