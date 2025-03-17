import { QueryClient, queryOptions } from "@tanstack/react-query";

import Service from "../../Services/InvoicesService";

const { GetInvoices } = Service();

export const getInvoicesQuery = queryOptions({
  queryKey: ["invoices", "all"],
  queryFn: GetInvoices,
});

export const loader = (queryClient: QueryClient) =>
  async function () {
    return queryClient.ensureQueryData(getInvoicesQuery);
  };
