import { GridValidRowModel } from "@mui/x-data-grid";

import PriceMasterApiColumnsType from "../Views/PriceMasterPage/types/ApiColumnsType";

const processPriceMasterPayload = function (
  column: GridValidRowModel
): PriceMasterApiColumnsType {
  return {
    id: column.id,
    shop_name: column.shopName,
    company_name: column.companyName,
    brand: column.brand,
    brand_code: column.brandCode,
    bottle_size: column.bottleSize,
    container_size: column.containerSize,
    price: column.price,
    commissions: column.commissions,
    margin: column.margin,
    active: column.active,
    created_by: column.createdBy,
    created_on: column.createdOn,
    updated_by: column.updatedBy,
    updated_on: column.updatedOn,
  };
};

export default processPriceMasterPayload;
