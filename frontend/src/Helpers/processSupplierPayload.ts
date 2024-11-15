import { GridValidRowModel } from "@mui/x-data-grid";

import SuppliersApiColumnsType from "../Views/SuppliersPage/types/ApiColumnsType";

const processSupplierPayload = function (
  row: GridValidRowModel
): SuppliersApiColumnsType {
  return {
    id: row.id,
    company_name: row.companyName,
    contact_person: row.contactPerson,
    supplier_code: row.supplierCode,
    number: row.number,
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
};

export default processSupplierPayload;
