import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processPriceMasterPayload from "../Helpers/processPriceMasterPayload";

const Service = () => {
  const GetPriceItems = function () {
    return AxiosInstance.get(config.api.priceMaster.GetAllPrices);
  };

  const AddPriceItem = function (row: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.priceMaster.AddPrice,
      processPriceMasterPayload(row)
    );
  };

  const EditPriceItem = function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.priceMaster.EditPrice,
      processPriceMasterPayload(row)
    );
  };

  const DeletePriceItem = function (id: number) {
    return AxiosInstance.delete(`${config.api.priceMaster.DeletePrice}/${id}`);
  };

  const GetPricesBySupplier = function (supplierName: string) {
    return AxiosInstance.get(
      `${config.api.priceMaster.GetPricesBySupplier}?supplier=${supplierName}`
    );
  };

  return {
    GetPriceItems,
    AddPriceItem,
    EditPriceItem,
    DeletePriceItem,
    GetPricesBySupplier,
  };
};

export default Service;
