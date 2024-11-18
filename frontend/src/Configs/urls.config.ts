const config = {
  base: "http://localhost:8000",

  api: {
    priceMaster: {
      GetAllPrices: "/price-master",
      AddPrice: "/price-master",
      EditPrice: "/price-master",
      DeletePrice: "/price-master",
      GetPricesBySupplierAndStore: "/price-master/",
    },
    stores: {
      GetAllStores: "/stores",
      AddStore: "/stores",
      EditStore: "/stores",
      DeleteStore: "/stores",
    },
    purchases: {
      GetPurchasesForInvoiceNumber: "/purchases",
      AddPurchase: "/purchases",
      EditPurchase: "/purchases",
    },
    invoices: {
      GetAllInvoices: "/invoices",
      AddInvoice: "/invoices",
      EditInvoice: "/invoices",
      DeleteInvoice: "/invoices",
      GetInvoiceByNumberSupplierAndStore: "/invoices/",
    },
    suppliers: {
      GetAllSuppliers: "/suppliers",
      AddSupplier: "/suppliers",
      EditSupplier: "/suppliers",
      DeleteSupplier: "/suppliers",
    },
    stockMovements: {
      GetStockMovements: "/stock-movements",
      UpdateStockMovement: "/stock-movements",
    },
  },
};

export default config;
