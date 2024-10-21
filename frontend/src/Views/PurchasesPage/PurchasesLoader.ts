import PurchasesColumnsType from "./types/ApiColumnsType";
import PriceMasterColumnsType from "../PriceMasterPage/types/ApiColumnsType";
import StoreColumnsType from "../StoresPage/types/ApiColumnsType";
import LoaderDataType from "./types/LoaderDataType";

import PurchaseService from "../../Services/PurchaseService";
import PriceMasterService from "../../Services/PriceMasterService";
import StoreService from "../../Services/StoreService";

const { GetPurchases } = PurchaseService();
const { GetPriceItems } = PriceMasterService();
const { GetStores } = StoreService();

const loader = async function () {
  const payload: LoaderDataType = { purchases: [], products: [], stores: [] };

  return GetPurchases()
    .then((res) => {
      payload["purchases"] = res.data.map((row: PurchasesColumnsType) => ({
        id: row.id,
        shopName: row.shop_name,
        productName: row.product_name,
        supplierName: row.supplier_name,
        orderDate: row.order_date,
        expectedDate: row.expected_date,
        receivedDate: row.received_date,
        quantityOrdered: row.quantity_ordered,
        quantityReceived: row.quantity_received,
        createdBy: row.created_by,
        createdOn: row.created_on,
        updatedBy: row.updated_by,
        updatedOn: row.updated_on,
      }));

      return GetPriceItems();
    })
    .then((res) => {
      payload["products"] = res.data.map((row: PriceMasterColumnsType) => ({
        id: row.id,
        shopName: row.shop_name,
        companyName: row.company_name,
        brand: row.brand,
        brandCode: row.brand_code,
        bottleSize: row.bottle_size,
        containerSize: row.container_size,
        price: row.price,
        commissions: row.commissions,
        margin: row.margin,
        active: row.active,
        createdBy: row.created_by,
        createdOn: row.created_on,
        updatedBy: row.updated_by,
        updatedOn: row.updated_on,
      }));

      return GetStores();
    })
    .then((res) => {
      payload["stores"] = res.data.map((row: StoreColumnsType) => ({
        id: row.id,
        storeName: row.store_name,
        storeAddress: row.store_address,
        active: row.active,
        createdBy: row.created_by,
        createdOn: row.created_on,
        updatedBy: row.updated_by,
        updatedOn: row.updated_on,
      }));

      return payload;
    })
    .catch((err) => {
      // TODO: Handle errors properly
      console.error(err);
    });
};

export default loader;
