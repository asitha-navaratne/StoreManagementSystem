import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import SuppliersApiColumnsType from "../Views/SuppliersPage/types/ApiColumnsType";
import processSupplierColumns from "../Helpers/processSupplierColumns";
import processSupplierPayload from "../Helpers/processSupplierPayload";

const Service = () => {
  const GetSuppliers = async function () {
    return AxiosInstance.get(config.api.suppliers.GetAllSuppliers).then((res) =>
      res.data.map((row: SuppliersApiColumnsType) =>
        processSupplierColumns(row)
      )
    );
  };

  const AddSupplier = function (row: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.suppliers.AddSupplier,
      processSupplierPayload(row)
    );
  };

  const EditSupplier = function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.suppliers.EditSupplier,
      processSupplierPayload(row)
    );
  };

  const DeleteSupplier = function (id: number) {
    return AxiosInstance.delete(`${config.api.suppliers.DeleteSupplier}/${id}`);
  };

  return {
    GetSuppliers,
    AddSupplier,
    EditSupplier,
    DeleteSupplier,
  };
};

export default Service;
