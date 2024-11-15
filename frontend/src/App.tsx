import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Root from "./Components/Root/Root";

import LoginPage from "./Views/LoginPage/LoginPage";
import PriceMasterPage from "./Views/PriceMasterPage/PriceMasterPage";
import PurchasesPage from "./Views/PurchasesPage/PurchasesPage";
import StoresPage from "./Views/StoresPage/StoresPage";
import SuppliersPage from "./Views/SuppliersPage/SuppliersPage";
import StockMovementsPage from "./Views/StockMovementsPage/StockMovementsPage";

import priceMasterLoader from "./Views/PriceMasterPage/PriceMasterLoader";
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
    children: [
      {
        index: true,
        element: <PriceMasterPage />,
        loader: priceMasterLoader,
      },
      {
        path: "purchases",
        element: <PurchasesPage />,
        loader: suppliersLoader,
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
  return <RouterProvider router={router} />;
}

export default App;