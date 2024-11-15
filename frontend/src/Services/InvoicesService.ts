import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import InvoicePayloadDataType from "../Views/PurchasesPage/types/InvoicePayloadDataType";
import processInvoicePayload from "../Helpers/processInvoicePayload";

const Service = () => {
  const GetInvoices = function () {
    return AxiosInstance.get(config.api.invoices.GetAllInvoices);
  };

  const AddInvoice = function (row: InvoicePayloadDataType) {
    return AxiosInstance.post(
      config.api.invoices.AddInvoice,
      processInvoicePayload(row)
    );
  };

  const EditInvoice = function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.invoices.EditInvoice,
      processInvoicePayload(row)
    );
  };

  const DeleteInvoice = function (id: number) {
    return AxiosInstance.delete(`${config.api.invoices.DeleteInvoice}/${id}`);
  };

  const GetInvoiceByNumberAndSupplier = function (
    invoiceNumber: string,
    supplierName: string
  ) {
    return AxiosInstance.get(
      `${config.api.invoices.GetInvoiceByNumberAndSupplier}?invoice=${invoiceNumber}&supplier=${supplierName}`
    );
  };

  return {
    GetInvoices,
    AddInvoice,
    EditInvoice,
    DeleteInvoice,
    GetInvoiceByNumberAndSupplier,
  };
};

export default Service;
