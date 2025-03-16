import { GridValidRowModel } from "@mui/x-data-grid";

import { SuppliersApiColumnsType } from "../Views/SuppliersPage";

function processSupplierPayload(
  row: GridValidRowModel
): SuppliersApiColumnsType {
  return {
    id: row.id,
    supplier_name: row.supplierName,
    supplier_short_name: row.supplierShortName,
    contact_person: row.contactPerson,
    supplier_code: row.supplierCode,
    phone_number: row.phoneNumber,
    supplier_tin: row.supplierTin,
    email: row.email,
    invoice_type: row.invoiceType,
    payment_period: row.paymentPeriod,
    active: row.active,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
}

export default processSupplierPayload;
