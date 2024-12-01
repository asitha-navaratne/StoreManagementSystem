import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";

import Root from "./Components/Root/Root";
import ErrorProvider from "./Contexts/ErrorProvider";

import LoginPage from "./Views/LoginPage/LoginPage";
import ErrorPage from "./Views/ErrorPage/ErrorPage";
import PriceMasterPage from "./Views/PriceMasterPage/PriceMasterPage";
import PurchasesPage from "./Views/PurchasesPage/PurchasesPage";
import InvoicesPage from "./Views/InvoicesPage/InvoicesPage";
import StoresPage from "./Views/StoresPage/StoresPage";
import SuppliersPage from "./Views/SuppliersPage/SuppliersPage";
import StockMovementsPage from "./Views/StockMovementsPage/StockMovementsPage";

import priceMasterLoader from "./Views/PriceMasterPage/PriceMasterLoader";
import purchasesLoader from "./Views/PurchasesPage/PurchasesLoader";
import invoicesLoader from "./Views/InvoicesPage/InvoicesLoader";
import storesLoader from "./Views/StoresPage/StoresLoader";
import suppliersLoader from "./Views/SuppliersPage/SuppliersLoader";

const router = createBrowserRouter([
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/",
    element: <Root />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <PriceMasterPage />,
        loader: priceMasterLoader,
      },
      {
        path: "purchases",
        element: <PurchasesPage />,
        loader: purchasesLoader,
      },
      {
        path: "invoices",
        element: <InvoicesPage />,
        loader: invoicesLoader,
      },
      {
        path: "stores",
        element: <StoresPage />,
        loader: storesLoader,
      },
      {
        path: "suppliers",
        element: <SuppliersPage />,
        loader: suppliersLoader,
      },
      {
        path: "stock-movements",
        element: <StockMovementsPage />,
        loader: storesLoader,
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
