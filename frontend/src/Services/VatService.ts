import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import { VatRateType } from "../Views/PriceMasterPage";

const Service = () => {
  const GetVatRate = async function (): Promise<VatRateType> {
    return AxiosInstance.get(config.api.vat.GetVatRate)
      .then((res) => ({
        id: res.data.id,
        rate: res.data.rate,
        updatedBy: res.data.updated_by,
        updatedOn: res.data.updated_on,
      }))
      .catch((err) => {
        throw err;
      });
  };

  const UpdateVatRate = async function (payload: {
    vatRate: number;
    username: string;
    datetime: string;
  }) {
    return AxiosInstance.post(config.api.vat.UpdateVatRate, {
      rate: payload.vatRate,
      updated_by: payload.username,
      updated_on: payload.datetime,
    }).catch((err) => {
      throw err;
    });
  };

  return {
    GetVatRate,
    UpdateVatRate,
  };
};

export default Service;
