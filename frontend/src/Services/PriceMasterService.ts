import randomInteger from "random-int";
import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import {
  PriceMasterApiColumnsType,
  PriceMasterGridColumnsType,
} from "../Views/PriceMasterPage";
import { PurchaseGridColumnsType } from "../Views/PurchasesPage";

import processPriceMasterPayload from "../Helpers/processPriceMasterPayload";
import processPriceMasterColumns from "../Helpers/processPriceMasterColumns";

const Service = () => {
  const GetPriceItems = async function (): Promise<
    PriceMasterGridColumnsType[]
  > {
    return AxiosInstance.get(config.api.priceMaster.GetAllPrices)
      .then((res) =>
        res?.data
          ? res.data.map((row: PriceMasterApiColumnsType) =>
              processPriceMasterColumns(row)
            )
          : []
      )
      .catch((err) => {
        throw err;
      });
  };

  const AddPriceItem = async function (row: GridValidRowModel) {
    return AxiosInstance.post(
      config.api.priceMaster.AddPrice,
      processPriceMasterPayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const EditPriceItem = async function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.priceMaster.EditPrice,
      processPriceMasterPayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const DeletePriceItem = async function (id: number) {
    return AxiosInstance.delete(
      `${config.api.priceMaster.DeletePrice}/${id}`
    ).catch((err) => {
      throw err;
    });
  };

  const GetPricesBySupplierAndStore = async function (
    supplierName: string,
    storeName: string
  ): Promise<PurchaseGridColumnsType[]> {
    return AxiosInstance.get(
      `${config.api.priceMaster.GetPricesBySupplierAndStore}?supplier=${supplierName}&store=${storeName}`
    )
      .then((res) =>
        res.data.map((row: PriceMasterApiColumnsType) => {
          const id = randomInteger(2 ** 16, 2 ** 17);

          return {
            id,
            category: row.category,
            productName: row.product_name,
            bottleSize: row.bottle_size,
            quantityOrdered: 0,
            price: row.price,
            quantityReceived: 0,
            payableAmount: 0,
            createdBy: null,
            createdOn: null,
            updatedBy: null,
            updatedOn: null,
          };
        })
      )
      .catch((err) => {
        throw err;
      });
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
