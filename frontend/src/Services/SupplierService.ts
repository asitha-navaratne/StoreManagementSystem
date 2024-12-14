import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import SuppliersGridColumnsType from "../Views/SuppliersPage/types/GridColumnsType";
import SuppliersApiColumnsType from "../Views/SuppliersPage/types/ApiColumnsType";

import processSupplierColumns from "../Helpers/processSupplierColumns";
import processSupplierPayload from "../Helpers/processSupplierPayload";

const Service = () => {
  const GetSuppliers = async function (): Promise<SuppliersGridColumnsType[]> {
    return AxiosInstance.get(config.api.suppliers.GetAllSuppliers)
      .then((res) =>
        res.data?.map((row: SuppliersApiColumnsType) =>
          processSupplierColumns(row)
        )
      )
      .catch((err) => {
        throw err;
      });
  };

  const AddSupplier = async function (row: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.suppliers.AddSupplier,
      processSupplierPayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const EditSupplier = async function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.suppliers.EditSupplier,
      processSupplierPayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const DeleteSupplier = async function (id: number) {
    return AxiosInstance.delete(
      `${config.api.suppliers.DeleteSupplier}/${id}`
    ).catch((err) => {
      throw err;
    });
  };

  return {
    GetSuppliers,
    AddSupplier,
    EditSupplier,
    DeleteSupplier,
  };
};

export default Service;
