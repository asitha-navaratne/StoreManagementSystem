import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import PriceMasterApiColumnsType from "../Views/PriceMasterPage/types/ApiColumnsType";
import processPriceMasterPayload from "../Helpers/processPriceMasterPayload";
import processPriceMasterColumns from "../Helpers/processPriceMasterColumns";

const Service = () => {
  const GetPriceItems = async function () {
    return AxiosInstance.get(config.api.priceMaster.GetAllPrices).then((res) =>
      res.data.map((row: PriceMasterApiColumnsType) =>
        processPriceMasterColumns(row)
      )
    );
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

  const GetPricesBySupplierAndStore = function (
    supplierName: string,
    storeName: string
  ) {
    return AxiosInstance.get(
      `${config.api.priceMaster.GetPricesBySupplierAndStore}?supplier=${supplierName}&store=${storeName}`
    );
  };

  return {
    GetPriceItems,
    AddPriceItem,
    EditPriceItem,
    DeletePriceItem,
    GetPricesBySupplierAndStore,
  };
};

export default Service;
