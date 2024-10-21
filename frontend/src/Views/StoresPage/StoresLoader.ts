import ColumnsType from "./types/ApiColumnsType";

import Service from "../../Services/StoreService";

const { GetStores } = Service();

const loader = async function () {
  return GetStores()
    .then((res) => {
      return res.data.map((row: ColumnsType) => ({
        id: row.id,
        storeName: row.store_name,
        storeAddress: row.store_address,
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
