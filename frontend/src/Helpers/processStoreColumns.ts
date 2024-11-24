import StoreApiColumnsType from "../Views/StoresPage/types/ApiColumnsType";
import StoreGridColumnsType from "../Views/StoresPage/types/GridColumnsType";

function processStoreColumns(
  payload: StoreApiColumnsType
): StoreGridColumnsType {
  return {
    id: payload.id,
    storeName: payload.store_name,
    storeAddress: payload.store_address,
    active: payload.active,
    createdBy: payload.created_by,
    createdOn: payload.created_on,
    updatedBy: payload.updated_by,
    updatedOn: payload.updated_on,
  };
}

export default processStoreColumns;
