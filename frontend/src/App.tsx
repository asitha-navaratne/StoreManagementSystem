import { useEffect } from "react";

import { useIsAuthenticated, useMsal } from "@azure/msal-react";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import { Button } from "@mui/material";

import ErrorProvider from "./Contexts/ErrorProvider";

import Root from "./Components/Root";
import Fallback from "./Components/Fallback";

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
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    instance.ssoSilent({ scopes: ["User.Read"] }).catch((err) => {
      throw err;
    });
  }, [instance]);

  const handleLogin = async function () {
    await instance.loginPopup({ scopes: ["User.Read"] });
  };

  return (
    <ErrorProvider>
      {isAuthenticated ? (
        <RouterProvider router={router} />
      ) : (
        <LoginPage>
          <Button variant="contained" sx={{ mt: 5 }} onClick={handleLogin}>
            Sign In
          </Button>
        </LoginPage>
      )}
    </ErrorProvider>
  );
}

export default App;
