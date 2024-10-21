import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import processStockMovementsPayload from "../Helpers/processStockMovementsPayload";

const Service = () => {
  const GetStockMovements = function (store: string, date: string) {
    return AxiosInstance.get(
      `${config.api.stockMovements.GetStockMovements}?store=${store}&date=${date}`
    );
  };

  const UpdateStockMovement = function (rows: GridValidRowModel[]) {
    const payload = rows.map((row) => processStockMovementsPayload(row));

    return AxiosInstance.patch(
      config.api.stockMovements.UpdateStockMovement,
      payload
    );
  };

  return {
    GetStockMovements,
    UpdateStockMovement,
  };
};

export default Service;
