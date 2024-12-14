import { QueryClient, queryOptions } from "@tanstack/react-query";

import Service from "../../Services/SupplierService";

const { GetSuppliers } = Service();

export const getSuppliersQuery = queryOptions({
  queryKey: ["suppliers", "all"],
  queryFn: GetSuppliers,
});

const loader = (queryClient: QueryClient) =>
  async function () {
    return queryClient.ensureQueryData(getSuppliersQuery);
  };

export default loader;
