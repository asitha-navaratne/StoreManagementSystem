import PriceMasterApiColumnsType from "./types/ApiColumnsType";
import StoreApiColumnsType from "../StoresPage/types/ApiColumnsType";
import SuppliersApiColumnsType from "../SuppliersPage/types/ApiColumnsType";
import LoaderDataType from "./types/LoaderType";

import PriceMasterService from "../../Services/PriceMasterService";
import StoreService from "../../Services/StoreService";
import SupplierService from "../../Services/SupplierService";

const { GetPriceItems } = PriceMasterService();
const { GetStores } = StoreService();
const { GetSuppliers } = SupplierService();

const loader = async function () {
  const payload: LoaderDataType = { products: [], stores: [], suppliers: [] };

  return GetPriceItems()
    .then((res) => {
      payload["products"] = res.data.map((row: PriceMasterApiColumnsType) => ({
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
      payload["stores"] = res.data.map((row: StoreApiColumnsType) => ({
        id: row.id,
        storeName: row.store_name,
        storeAddress: row.store_address,
        active: row.active,
        createdBy: row.created_by,
        createdOn: row.created_on,
        updatedBy: row.updated_by,
        updatedOn: row.updated_on,
      }));

      return GetSuppliers();
    })
    .then((res) => {
      payload["suppliers"] = res.data.map((row: SuppliersApiColumnsType) => ({
        id: row.id,
        companyName: row.company_name,
        contactPerson: row.contact_person,
        number: row.number,
        email: row.email,
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
