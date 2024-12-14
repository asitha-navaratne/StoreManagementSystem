import { QueryClient, queryOptions } from "@tanstack/react-query";

import LoaderDataType from "./types/LoaderType";

import { getSuppliersQuery } from "../SuppliersPage/SuppliersLoader";
import { getStoresQuery } from "../StoresPage/StoresLoader";
import Service from "../../Services/PriceMasterService";

const { GetPriceItems } = Service();

export const getPriceItemsQuery = queryOptions({
  queryKey: ["price items", "all"],
  queryFn: GetPriceItems,
});

const loader = (queryClient: QueryClient) =>
  async function () {
    const payload: LoaderDataType = { products: [], stores: [], suppliers: [] };

    const priceItemsData = queryClient.ensureQueryData(getPriceItemsQuery);
    const suppliersData = queryClient.ensureQueryData(getSuppliersQuery);
    const storesData = queryClient.ensureQueryData(getStoresQuery);

    payload["products"] = await priceItemsData;
    payload["suppliers"] = await suppliersData;
    payload["stores"] = await storesData;

    return payload;
  };

export default loader;
