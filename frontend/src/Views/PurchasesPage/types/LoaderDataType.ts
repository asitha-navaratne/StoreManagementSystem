import PurchasesColumnsType from "./GridColumnsType";
import PriceMasterColumnsType from "../../PriceMasterPage/types/GridColumnsType";
import StoresColumnsType from "../../StoresPage/types/GridColumnsType";

type LoaderDataType = {
  purchases: PurchasesColumnsType[];
  products: PriceMasterColumnsType[];
  stores: StoresColumnsType[];
};

export default LoaderDataType;
