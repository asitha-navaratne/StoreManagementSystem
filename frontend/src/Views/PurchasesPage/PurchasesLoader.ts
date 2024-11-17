import LoaderDataType from "./types/LoaderDataType";
import SuppliersApiColumnsType from "../SuppliersPage/types/ApiColumnsType";
import StoreApiColumnsType from "../StoresPage/types/ApiColumnsType";

import SupplierService from "../../Services/SupplierService";
import StoreService from "../../Services/StoreService";

const { GetSuppliers } = SupplierService();
const { GetStores } = StoreService();

const loader = async function () {
  const payload: LoaderDataType = { suppliers: [], stores: [] };

  return GetSuppliers()
    .then((res) => {
      payload["suppliers"] = res.data.map((row: SuppliersApiColumnsType) => ({
        id: row.id,
        companyName: row.company_name,
        contactPerson: row.contact_person,
        supplierCode: row.supplier_code,
        number: row.number,
        supplierTin: row.supplier_tin,
        email: row.email,
        invoiceType: row.invoice_type,
        paymentPeriod: row.payment_period,
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

      return payload;
    })
    .catch((err) => {
      // TODO: Handle errors properly
      console.error(err);
    });
};

export default loader;
