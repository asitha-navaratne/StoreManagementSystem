import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processPriceMasterPayload from "../Helpers/processPriceMasterPayload";

const Service = () => {
  const GetPriceItems = function () {
    return AxiosInstance.get(config.api.priceMaster.GetAllPrices);
  };

  const AddPriceItem = function (column: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.priceMaster.AddPrice,
      processPriceMasterPayload(column)
    );
  };

  const EditPriceItem = function (column: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.priceMaster.EditPrice,
      processPriceMasterPayload(column)
    );
  };

  const DeletePriceItem = function (id: number) {
    return AxiosInstance.delete(`${config.api.priceMaster.DeletePrice}/${id}`);
  };

  return {
    GetPriceItems,
    AddPriceItem,
    EditPriceItem,
    DeletePriceItem,
  };
};

export default Service;
