import { GridValidRowModel } from "@mui/x-data-grid";

import StoreApiColumnsType from "../Views/StoresPage/types/ApiColumnsType";

const processStorePayload = function (
  row: GridValidRowModel
): StoreApiColumnsType {
  return {
    id: row.id,
    store_name: row.storeName,
    store_address: row.storeAddress,
    active: row.active,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
};

export default processStorePayload;
