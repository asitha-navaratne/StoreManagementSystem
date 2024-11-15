import PriceMasterApiColumnsType from "../Views/PriceMasterPage/types/ApiColumnsType";
import PriceMasterGridColumnsType from "../Views/PriceMasterPage/types/GridColumnsType";

const processPriceMasterColumns = function (
  payload: PriceMasterApiColumnsType
): PriceMasterGridColumnsType {
  return {
    id: payload.id,
    shopName: payload.shop_name,
    companyName: payload.company_name,
    brand: payload.brand,
    brandCode: payload.brand_code,
    category: payload.category,
    bottleSize: payload.bottle_size,
    containerSize: payload.container_size,
    taxPrice: payload.tax_price,
    cost: payload.cost,
    price: payload.price,
    commissions: payload.commissions,
    margin: payload.margin,
    active: payload.active,
    createdBy: payload.created_by,
    createdOn: payload.created_on,
    updatedBy: payload.updated_by,
    updatedOn: payload.updated_on,
  };
};

export default processPriceMasterColumns;
