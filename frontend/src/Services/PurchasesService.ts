import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processPurchasePayload from "../Helpers/processPurchasePayload";

const Service = function () {
  const GetPurchasesForInvoiceNumber = function (
    invoice: number,
    supplierName: string,
    storeName: string
  ) {
    return AxiosInstance.get(
      `${config.api.purchases.GetPurchasesForInvoiceNumber}?invoice=${invoice}&supplier=${supplierName}&store=${storeName}`
    );
  };

  const AddPurchases = function (
    rows: GridValidRowModel[],
    supplierName: string,
    storeName: string
  ) {
    const payload = rows.map((row) =>
      processPurchasePayload(row, supplierName, storeName)
    );

    return AxiosInstance.post(config.api.purchases.AddPurchase, payload);
  };

  return {
    GetPurchasesForInvoiceNumber,
    AddPurchases,
  };
};

export default Service;
