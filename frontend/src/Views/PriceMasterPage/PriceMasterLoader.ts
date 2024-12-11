import { QueryClient, queryOptions } from "@tanstack/react-query";

import LoaderDataType from "./types/LoaderType";

import PriceMasterService from "../../Services/PriceMasterService";
import StoreService from "../../Services/StoreService";
import SupplierService from "../../Services/SupplierService";

const { GetPriceItems } = PriceMasterService();
const { GetStores } = StoreService();
const { GetSuppliers } = SupplierService();

export const getPriceItemsQuery = queryOptions({
  queryKey: ["price items", "all"],
  queryFn: GetPriceItems,
});

const loader = (queryClient: QueryClient) =>
  async function () {
    const payload: LoaderDataType = { products: [], stores: [], suppliers: [] };

    const priceItemsData = queryClient.ensureQueryData(getPriceItemsQuery);

    const suppliersData = queryClient.ensureQueryData({
      queryKey: ["suppliers", "all"],
      queryFn: GetSuppliers,
    });

    const storesData = queryClient.ensureQueryData({
      queryKey: ["stores", "all"],
      queryFn: GetStores,
    });

    payload["products"] = await priceItemsData;
    payload["suppliers"] = await suppliersData;
    payload["stores"] = await storesData;

    return payload;
  };

export default loader;
