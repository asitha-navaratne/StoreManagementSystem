import { QueryClient, queryOptions } from "@tanstack/react-query";

import Service from "../../Services/StoreService";

const { GetStores } = Service();

export const getStoresQuery = queryOptions({
  queryKey: ["stores", "all"],
  queryFn: GetStores,
});

const loader = (queryClient: QueryClient) =>
  async function () {
    return queryClient.ensureQueryData(getStoresQuery);
  };

export default loader;
