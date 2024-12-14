import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";

import ErrorProvider from "./Contexts/ErrorProvider";

import Root from "./Components/Root/Root";
import Fallback from "./Components/Fallback/Fallback";

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

import queryClient from "./Utils/QueryClient";
import { loginRequest } from "./Configs/auth.config";

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
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <ErrorProvider>
      <AuthenticatedTemplate>
        {activeAccount && <RouterProvider router={router} />}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <LoginPage handleLogin={handleRedirect} />
      </UnauthenticatedTemplate>
    </ErrorProvider>
  );
}

export default App;
