import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processPurchasePayload from "../Helpers/processPurchasePayload";

const Service = function () {
  const GetPurchasesForInvoice = function (invoice: string) {
    return AxiosInstance.get(
      `${config.api.purchases.GetPurchasesForInvoice}?invoice=${invoice}`
    );
  };

  const AddPurchases = function (
    rows: GridValidRowModel[],
    supplierName: string
  ) {
    const payload = rows.map((row) =>
      processPurchasePayload(row, supplierName)
    );

    return AxiosInstance.post(config.api.purchases.AddPurchase, payload);
  };

  return {
    GetPurchasesForInvoice,
    AddPurchases,
  };
};

export default Service;
