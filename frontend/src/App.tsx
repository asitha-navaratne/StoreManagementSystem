import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import ErrorProvider from "./Contexts/ErrorProvider";

import Root from "./Components/Root";
import Fallback from "./Components/Fallback";

import ErrorPage from "./Views/ErrorPage";
import PriceMasterPage, {
  loader as priceMasterLoader,
} from "./Views/PriceMasterPage";
import PurchasesPage, {
  loader as purchasesLoader,
} from "./Views/PurchasesPage";
import InvoicesPage, { loader as invoicesLoader } from "./Views/InvoicesPage";
import StoresPage, { loader as storesLoader } from "./Views/StoresPage";
import SuppliersPage, {
  loader as suppliersLoader,
} from "./Views/SuppliersPage";
import StockMovementsPage from "./Views/StockMovementsPage";

import queryClient from "./Utils/QueryClient";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    hydrateFallbackElement: <Fallback />,
    children: [
      {
        index: true,
        element: <PriceMasterPage />,
        loader: priceMasterLoader(queryClient),
      },
      {
        path: "purchases",
        element: <PurchasesPage />,
        loader: purchasesLoader,
      },
      {
        path: "invoices",
        element: <InvoicesPage />,
        loader: invoicesLoader(queryClient),
      },
      {
        path: "stores",
        element: <StoresPage />,
        loader: storesLoader(queryClient),
      },
      {
        path: "suppliers",
        element: <SuppliersPage />,
        loader: suppliersLoader(queryClient),
      },
      {
        path: "stock-movements",
        element: <StockMovementsPage />,
        loader: storesLoader(queryClient),
      },
    ],
  },
]);

function App() {
  return (
    <ErrorProvider>
      <RouterProvider router={router} />
    </ErrorProvider>
  );
}

export default App;
