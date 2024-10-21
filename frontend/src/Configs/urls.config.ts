const config = {
  base: "http://localhost:8000",

  api: {
    priceMaster: {
      GetAllPrices: "/price-master/",
      AddPrice: "/price-master/",
      EditPrice: "/price-master/",
      DeletePrice: "/price-master",
    },
    purchases: {
      GetAllPurchases: "/purchases/",
      AddPurchase: "/purchases/",
      EditPurchase: "/purchases/",
      DeletePurchase: "/purchases",
    },
    stores: {
      GetAllStores: "/stores/",
      AddStore: "/stores/",
      EditStore: "/stores/",
      DeleteStore: "/stores",
    },
    suppliers: {
      GetAllSuppliers: "/suppliers/",
      AddSupplier: "/suppliers/",
      EditSupplier: "/suppliers/",
      DeleteSupplier: "/suppliers",
    },
    stockMovements: {
      GetStockMovements: "/stock-movements/",
      UpdateStockMovement: "/stock-movements/",
    },
  },
};

export default config;
