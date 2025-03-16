import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import ErrorProvider from "./Contexts/ErrorProvider";

import Root from "./Components/Root";
import Fallback from "./Components/Fallback";

import ErrorPage from "./Views/ErrorPage";
import PriceMasterPage, {
  loader as priceMasterLoader,
} from "./Views/PriceMasterPage";
import PurchasesPage from "./Views/PurchasesPage/PurchasesPage";
import InvoicesPage from "./Views/InvoicesPage/InvoicesPage";
import StoresPage from "./Views/StoresPage/StoresPage";
import SuppliersPage from "./Views/SuppliersPage/SuppliersPage";
import StockMovementsPage from "./Views/StockMovementsPage/StockMovementsPage";

import purchasesLoader from "./Views/PurchasesPage/PurchasesLoader";
import invoicesLoader from "./Views/InvoicesPage/InvoicesLoader";
import storesLoader from "./Views/StoresPage/StoresLoader";
import suppliersLoader from "./Views/SuppliersPage/SuppliersLoader";

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
