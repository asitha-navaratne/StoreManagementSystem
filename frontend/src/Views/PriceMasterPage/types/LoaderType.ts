import PriceMasterGridColumnsType from "../../PriceMasterPage/types/GridColumnsType";
import StoresGridColumnsType from "../../StoresPage/types/GridColumnsType";
import SuppliersGridColumnsType from "../../SuppliersPage/types/GridColumnsType";

type LoaderDataType = {
  products: PriceMasterGridColumnsType[];
  stores: StoresGridColumnsType[];
  suppliers: SuppliersGridColumnsType[];
};

export default LoaderDataType;
