import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import InvoiceGridColumnsType from "../Views/InvoicesPage/types/GridColumnsType";
import InvoiceApiColumnsType from "../Views/InvoicesPage/types/ApiColumnsType";
import processInvoicePayload from "../Helpers/processInvoicePayload";
import processInvoiceColumns from "../Helpers/processInvoiceColumns";

const Service = () => {
  const GetInvoices = async function () {
    return AxiosInstance.get(config.api.invoices.GetAllInvoices).then((res) =>
      res.data?.map((row: InvoiceApiColumnsType) => processInvoiceColumns(row))
    );
  };

  const AddInvoice = function (row: InvoiceGridColumnsType) {
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

  const GetInvoiceByNumberSupplierAndStore = async function (
    invoiceNumber: number,
    supplierName: string,
    storeName: string
  ) {
    return AxiosInstance.get(
      `${config.api.invoices.GetInvoiceByNumberSupplierAndStore}?invoice=${invoiceNumber}&supplier=${supplierName}&store=${storeName}`
    ).then((res) => {
      if (res.data) {
        return processInvoiceColumns(res.data);
      }
      return null;
    });
  };

  return {
    GetInvoices,
    AddInvoice,
    EditInvoice,
    DeleteInvoice,
    GetInvoiceByNumberSupplierAndStore,
  };
};

export default Service;
