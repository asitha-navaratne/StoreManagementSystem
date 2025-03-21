import { GridValidRowModel } from "@mui/x-data-grid";

import AxiosInstance from "../Utils/Axios";
import config from "../Configs/urls.config";

import {
  InvoiceApiColumnsType,
  InvoiceGridColumnsType,
} from "../Views/InvoicesPage";

import processInvoicePayload from "../Helpers/processInvoicePayload";
import processInvoiceColumns from "../Helpers/processInvoiceColumns";

const Service = () => {
  const GetInvoices = async function (): Promise<InvoiceGridColumnsType[]> {
    return AxiosInstance.get(config.api.invoices.GetAllInvoices)
      .then((res) =>
        res.data?.map((row: InvoiceApiColumnsType) =>
          processInvoiceColumns(row)
        )
      )
      .catch((err) => {
        throw err;
      });
  };

  const AddInvoice = async function (row: InvoiceGridColumnsType) {
    return AxiosInstance.post(
      config.api.invoices.AddInvoice,
      processInvoicePayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const EditInvoice = async function (row: GridValidRowModel) {
    return AxiosInstance.patch(
      config.api.invoices.EditInvoice,
      processInvoicePayload(row)
    ).catch((err) => {
      throw err;
    });
  };

  const DeleteInvoice = async function (id: number) {
    return AxiosInstance.delete(
      `${config.api.invoices.DeleteInvoice}/${id}`
    ).catch((err) => {
      throw err;
    });
  };

  const GetInvoiceByNumberSupplierAndStore = async function (
    invoiceNumber: number,
    supplierName: string,
    storeName: string
  ): Promise<InvoiceGridColumnsType | null> {
    return AxiosInstance.get(
      `${config.api.invoices.GetInvoiceByNumberSupplierAndStore}?invoice=${invoiceNumber}&supplier=${supplierName}&store=${storeName}`
    )
      .then((res) => {
        if (res.data) {
          return processInvoiceColumns(res.data);
        }
        return null;
      })
      .catch((err) => {
        throw err;
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
