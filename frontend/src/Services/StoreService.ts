import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processStorePayload from "../Helpers/processStorePayload";

const Service = () => {
  const GetStores = function () {
    return AxiosInstance.get(config.api.stores.GetAllStores);
  };

  const AddStore = function (column: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.stores.AddStore,
      processStorePayload(column)
    );
  };

  const EditStore = function (column: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.stores.EditStore,
      processStorePayload(column)
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
