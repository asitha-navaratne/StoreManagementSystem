import { LoaderDataType } from "./PurchasesPage.types";

import SupplierService from "../../Services/SupplierService";
import StoreService from "../../Services/StoreService";

const { GetSuppliers } = SupplierService();
const { GetStores } = StoreService();

export const loader = async function () {
  const payload: LoaderDataType = { suppliers: [], stores: [] };

  return GetSuppliers()
    .then((res) => {
      payload["suppliers"] = res;

      return GetStores();
    })
    .then((res) => {
      payload["stores"] = res;

      return payload;
    })
    .catch((err) => {
      throw err;
    });
};
