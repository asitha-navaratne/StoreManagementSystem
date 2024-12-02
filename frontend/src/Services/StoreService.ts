import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import StoreApiColumnsType from "../Views/StoresPage/types/ApiColumnsType";
import processStoreColumns from "../Helpers/processStoreColumns";
import processStorePayload from "../Helpers/processStorePayload";

const Service = () => {
  const GetStores = async function () {
    return AxiosInstance.get(config.api.stores.GetAllStores).then((res) =>
      res.data?.map((row: StoreApiColumnsType) => processStoreColumns(row))
    );
  };

  const AddStore = function (row: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.stores.AddStore,
      processStorePayload(row)
    );
  };

  const EditStore = function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.stores.EditStore,
      processStorePayload(row)
    );
  };

  const DeleteStore = function (id: number) {
    return AxiosInstance.delete(`${config.api.stores.DeleteStore}/${id}`);
  };

  return {
    GetStores,
    AddStore,
    EditStore,
    DeleteStore,
  };
};

export default Service;
