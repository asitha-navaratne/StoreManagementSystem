import { GridValidRowModel } from "@mui/x-data-grid";

import { PriceMasterApiColumnsType } from "../Views/PriceMasterPage";

function processPriceMasterPayload(
  row: GridValidRowModel
): PriceMasterApiColumnsType {
  return {
    id: row.id,
    shop_name: row.shopName,
    supplier_name: row.supplierName,
    brand_code: row.brandCode,
    source_type: row.sourceType,
    category: row.category,
    country: row.country,
    variety: row.variety,
    volume: row.volume,
    company_product_code: row.companyProductCode,
    product_name: row.productName,
    bottle_size: row.bottleSize,
    container_size: row.containerSize,
    tax_price: row.taxPrice,
    price: row.price,
    staff_margin: row.staffMargin,
    active: row.active,
    created_by: row.createdBy,
    created_on: row.createdOn,
    updated_by: row.updatedBy,
    updated_on: row.updatedOn,
  };
}

export default processPriceMasterPayload;
