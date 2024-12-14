import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import StoreGridColumnsType from "../Views/StoresPage/types/GridColumnsType";
import StoreApiColumnsType from "../Views/StoresPage/types/ApiColumnsType";

import processStoreColumns from "../Helpers/processStoreColumns";
import processStorePayload from "../Helpers/processStorePayload";

const Service = () => {
  const GetStores = async function (): Promise<StoreGridColumnsType[]> {
    return AxiosInstance.get(config.api.stores.GetAllStores)
      .then((res) =>
        res.data?.map((row: StoreApiColumnsType) => processStoreColumns(row))
      )
      .catch((err) => {
        throw err;
      });
  };

  const AddStore = async function (row: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.stores.AddStore,
      processStorePayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const EditStore = async function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.stores.EditStore,
      processStorePayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const DeleteStore = async function (id: number) {
    return AxiosInstance.delete(`${config.api.stores.DeleteStore}/${id}`).catch(
      (err) => {
        throw err;
      }
    );
  };

  return {
    GetStores,
    AddStore,
    EditStore,
    DeleteStore,
  };
};

export default Service;
