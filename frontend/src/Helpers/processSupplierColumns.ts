import SuppliersApiColumnsType from "../Views/SuppliersPage/types/ApiColumnsType";
import SuppliersGridColumnsType from "../Views/SuppliersPage/types/GridColumnsType";

function processSupplierColumns(
  row: SuppliersApiColumnsType
): SuppliersGridColumnsType {
  return {
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
  };
}

export default processSupplierColumns;
