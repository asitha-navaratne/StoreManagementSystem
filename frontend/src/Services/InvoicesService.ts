import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import InvoicePayloadDataType from "../Views/PurchasesPage/types/InvoicePayloadDataType";
import processInvoicePayload from "../Helpers/processInvoicePayload";

const Service = () => {
  const AddInvoice = function (row: InvoicePayloadDataType) {
    return AxiosInstance.post(
      config.api.invoices.AddInvoice,
      processInvoicePayload(row)
    );
  };

  const GetInvoiceByNumberAndSupplier = function (
    invoiceNumber: string,
    supplier: string
  ) {
    return AxiosInstance.get(
      `${config.api.invoices.GetInvoiceByNumberAndSupplier}?invoice=${invoiceNumber}&supplier=${supplier}`
    );
  };

  return { AddInvoice, GetInvoiceByNumberAndSupplier };
};

export default Service;
