import { GridValidRowModel } from "@mui/x-data-grid";

import PriceMasterApiColumnsType from "../Views/PriceMasterPage/types/ApiColumnsType";

function processPriceMasterPayload(
  row: GridValidRowModel
): PriceMasterApiColumnsType {
  return {
    id: row.id,
    shop_name: row.shopName,
    supplier_name: row.supplierName,
    brand: row.brand,
    brand_code: row.brandCode,
    category: row.category,
    bottle_size: row.bottleSize,
    container_size: row.containerSize,
    tax_price: row.taxPrice,
    cost: row.cost,
    price: row.price,
    commissions: row.commissions,
    margin: row.margin,
    active: row.active,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
}

export default processPriceMasterPayload;
