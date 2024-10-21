import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processSupplierPayload from "../Helpers/processSupplierPayload";

const Service = () => {
  const GetSuppliers = function () {
    return AxiosInstance.get(config.api.suppliers.GetAllSuppliers);
  };

  const AddSupplier = function (column: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.suppliers.AddSupplier,
      processSupplierPayload(column)
    );
  };

  const EditSupplier = function (column: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.suppliers.EditSupplier,
      processSupplierPayload(column)
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
