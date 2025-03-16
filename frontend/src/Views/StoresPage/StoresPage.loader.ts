import { QueryClient, queryOptions } from "@tanstack/react-query";

import Service from "../../Services/StoreService";

const { GetStores } = Service();

export const getStoresQuery = queryOptions({
  queryKey: ["stores", "all"],
  queryFn: GetStores,
});

export const loader = (queryClient: QueryClient) =>
  async function () {
    return queryClient.ensureQueryData(getStoresQuery);
  };
