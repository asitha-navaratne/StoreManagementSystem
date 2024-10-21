import { GridValidRowModel } from "@mui/x-data-grid";

import SuppliersApiColumnsType from "../Views/SuppliersPage/types/ApiColumnsType";

const processSupplierPayload = function (
  column: GridValidRowModel
): SuppliersApiColumnsType {
  return {
    id: column.id,
    company_name: column.companyName,
    contact_person: column.contactPerson,
    number: column.number,
    email: column.email,
    active: column.active,
    created_by: column.createdBy,
    created_on: column.createdOn,
    updated_by: column.updatedBy,
    updated_on: column.updatedOn,
  };
};

export default processSupplierPayload;
