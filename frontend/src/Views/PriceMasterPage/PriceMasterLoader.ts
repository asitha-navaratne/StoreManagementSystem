import LoaderDataType from "./types/LoaderType";

import PriceMasterService from "../../Services/PriceMasterService";
import StoreService from "../../Services/StoreService";
import SupplierService from "../../Services/SupplierService";

const { GetPriceItems } = PriceMasterService();
const { GetStores } = StoreService();
const { GetSuppliers } = SupplierService();

const loader = async function () {
  const payload: LoaderDataType = { products: [], stores: [], suppliers: [] };

  return GetPriceItems()
    .then((res) => {
      payload["products"] = res;

      return GetStores();
    })
    .then((res) => {
      payload["stores"] = res;

      return GetSuppliers();
    })
    .then((res) => {
      payload["suppliers"] = res;

      return payload;
    })
    .catch((err) => {
      throw err;
    });
};

export default loader;
