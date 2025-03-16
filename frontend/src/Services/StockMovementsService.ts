import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import { StockMovementsApiColumnsType } from "../Views/StockMovementsPage";

import processStockMovementsColumns from "../Helpers/processStockMovementsColumns";
import processStockMovementsPayload from "../Helpers/processStockMovementsPayload";

const Service = () => {
  const GetStockMovements = async function (store: string, date: string) {
    return AxiosInstance.get(
      `${config.api.stockMovements.GetStockMovements}?store=${store}&date=${date}`
    )
      .then((res) =>
        res.data?.map((column: StockMovementsApiColumnsType) =>
          processStockMovementsColumns(column)
        )
      )
      .catch((err) => {
        throw err;
      });
  };

  const UpdateStockMovement = async function (rows: GridValidRowModel[]) {
    const payload = rows.map((row) => processStockMovementsPayload(row));

    return AxiosInstance.patch(
      config.api.stockMovements.UpdateStockMovement,
      payload
    ).catch((err) => {
      throw err;
    });
  };

  return {
    GetStockMovements,
    UpdateStockMovement,
  };
};

export default Service;
