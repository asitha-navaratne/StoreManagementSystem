import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import { PurchaseApiColumnsType } from "../Views/PurchasesPage";

import processPurchasePayload from "../Helpers/processPurchasePayload";
import processPurchaseColumns from "../Helpers/processPurchaseColumns";

const Service = function () {
  const GetPurchasesForInvoiceNumber = async function (
    invoice: number,
    supplierName: string,
    storeName: string
  ) {
    return AxiosInstance.get(
      `${config.api.purchases.GetPurchasesForInvoiceNumber}?invoice=${invoice}&supplier=${supplierName}&store=${storeName}`
    ).then((res) => {
      if (res?.data.length) {
        return res.data?.map((row: PurchaseApiColumnsType) =>
          processPurchaseColumns(row)
        );
      }

      return null;
    });
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

  const EditPurchase = function (
    rows: GridValidRowModel[],
    supplierName: string,
    storeName: string
  ) {
    const payload = rows.map((row) =>
      processPurchasePayload(row, supplierName, storeName)
    );

    return AxiosInstance.patch(config.api.purchases.EditPurchase, payload);
  };

  return {
    GetPurchasesForInvoiceNumber,
    AddPurchases,
    EditPurchase,
  };
};

export default Service;
