import { QueryClient, queryOptions } from "@tanstack/react-query";

import Service from "../../Services/SupplierService";

const { GetSuppliers } = Service();

export const getSuppliersQuery = queryOptions({
  queryKey: ["suppliers", "all"],
  queryFn: GetSuppliers,
});

export const loader = (queryClient: QueryClient) =>
  async function () {
    return queryClient.ensureQueryData(getSuppliersQuery);
  };
