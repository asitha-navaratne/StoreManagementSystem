import {
  SuppliersApiColumnsType,
  SuppliersGridColumnsType,
} from "../Views/SuppliersPage";

function processSupplierColumns(
  row: SuppliersApiColumnsType
): SuppliersGridColumnsType {
  return {
    id: row.id,
    supplierName: row.supplier_name,
    supplierShortName: row.supplier_short_name,
    contactPerson: row.contact_person,
    supplierCode: row.supplier_code,
    phoneNumber: row.phone_number,
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
