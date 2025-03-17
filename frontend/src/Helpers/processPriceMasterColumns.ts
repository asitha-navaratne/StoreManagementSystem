import {
  PriceMasterApiColumnsType,
  PriceMasterGridColumnsType,
} from "../Views/PriceMasterPage";

function processPriceMasterColumns(
  payload: PriceMasterApiColumnsType
): PriceMasterGridColumnsType {
  return {
    id: payload.id,
    shopName: payload.shop_name,
    supplierName: payload.supplier_name,
    brandCode: payload.brand_code,
    sourceType: payload.source_type,
    category: payload.category,
    country: payload.country,
    variety: payload.variety,
    volume: payload.volume,
    companyProductCode: payload.company_product_code,
    productName: payload.product_name,
    bottleSize: payload.bottle_size,
    containerSize: payload.container_size,
    taxPrice: payload.tax_price,
    price: payload.price,
    staffMargin: payload.staff_margin,
    active: payload.active,
    createdBy: payload.created_by,
    createdOn: payload.created_on,
    updatedBy: payload.updated_by,
    updatedOn: payload.updated_on,
  };
}

export default processPriceMasterColumns;
