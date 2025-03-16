import { QueryClient, queryOptions } from "@tanstack/react-query";

import { LoaderDataType } from "./PriceMasterPage.types";

import { getSuppliersQuery } from "../SuppliersPage/SuppliersLoader";
import { getStoresQuery } from "../StoresPage/StoresLoader";

import PriceMasterService from "../../Services/PriceMasterService";
import VatService from "../../Services/VatService";

const { GetPriceItems } = PriceMasterService();
const { GetVatRate } = VatService();

export const getPriceItemsQuery = queryOptions({
  queryKey: ["price items", "all"],
  queryFn: GetPriceItems,
});

export const getVatRateQuery = queryOptions({
  queryKey: ["vat rate"],
  queryFn: GetVatRate,
});

export const loader = (queryClient: QueryClient) =>
  async function () {
    const payload: LoaderDataType = {
      products: [],
      stores: [],
      suppliers: [],
      vat: null,
    };

    const priceItemsData = queryClient.ensureQueryData(getPriceItemsQuery);
    const suppliersData = queryClient.ensureQueryData(getSuppliersQuery);
    const storesData = queryClient.ensureQueryData(getStoresQuery);
    const vatData = queryClient.ensureQueryData(getVatRateQuery);

    payload["products"] = await priceItemsData;
    payload["suppliers"] = await suppliersData;
    payload["stores"] = await storesData;
    payload["vat"] = await vatData;

    return payload;
  };
