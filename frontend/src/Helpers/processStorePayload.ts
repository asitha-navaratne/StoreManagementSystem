import { GridValidRowModel } from "@mui/x-data-grid";

import StoreApiColumnsType from "../Views/StoresPage/types/ApiColumnsType";

const processStorePayload = function (
  column: GridValidRowModel
): StoreApiColumnsType {
  return {
    id: column.id,
    store_name: column.storeName,
    store_address: column.storeAddress,
    active: column.active,
    created_by: column.createdBy,
    created_on: column.createdOn,
    updated_by: column.updatedBy,
    updated_on: column.updatedOn,
  };
};

export default processStorePayload;
