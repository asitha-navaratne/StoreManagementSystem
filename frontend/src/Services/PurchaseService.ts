import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processPurchasePayload from "../Helpers/processPurchasePayload";

const Service = () => {
  const GetPurchases = function () {
    return AxiosInstance.get(config.api.purchases.GetAllPurchases);
  };

  const AddPurchase = function (column: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.purchases.AddPurchase,
      processPurchasePayload(column)
    );
  };

  const EditPurchase = function (column: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.purchases.EditPurchase,
      processPurchasePayload(column)
    );
  };

  const DeletePurchase = function (id: number) {
    return AxiosInstance.delete(`${config.api.purchases.DeletePurchase}/${id}`);
  };

  return {
    GetPurchases,
    AddPurchase,
    EditPurchase,
    DeletePurchase,
  };
};

export default Service;
