import { useState } from "react";

import { AxiosError } from "axios";
import dayjs from "dayjs";
import { useLoaderData, useNavigation } from "react-router";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";
import { Box, CircularProgress, Typography } from "@mui/material";
import {
  DataGrid,
  GridActionsCellItem,
  GridColDef,
  GridEventListener,
  GridRowEditStopReasons,
  GridRowId,
  GridRowModel,
  GridRowModes,
  GridRowModesModel,
  GridRowsProp,
  GridSlots,
} from "@mui/x-data-grid";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";

import styles from "./InvoicesPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar from "../../Components/DataGridToolbar/DataGridToolbar";
import AlertWindow from "../../Components/AlertWindow/AlertWindow";

import useErrorContext from "../../Hooks/useErrorContext";

import InvoiceGridColumnsType from "./types/GridColumnsType";
import InvoiceApiColumnsType from "./types/ApiColumnsType";
import StoreManagementSystemErrorType from "../../Types/StoreManagementSystemErrorType";
import DataGridToolbarPropTypes from "../../Components/DataGridToolbar/types/PropTypes";

import handleErrors from "../../Helpers/handleErrors";

import { getInvoicesQuery } from "./InvoicesLoader";
import Service from "../../Services/InvoicesService";

const { EditInvoice, DeleteInvoice } = Service();

const InvoicesPage = () => {
  const navigation = useNavigation();
  const loaderData = useLoaderData() as InvoiceGridColumnsType[];

  const { data } = useSuspenseQuery(getInvoicesQuery);

  const isLoading = navigation.state === "loading";

  const [rows, setRows] = useState<GridRowsProp>(loaderData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  const editMutation = useMutation({
    mutationFn: EditInvoice,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<InvoiceApiColumnsType>>
    ) => {
      const { errorObject } = handleErrors(err, "Invoices Page");
      handlePushError(errorObject);

      setRows(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DeleteInvoice,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<{ id: number }>>
    ) => {
      const { errorObject } = handleErrors(err, "Invoices Page");
      handlePushError(errorObject);

      setRows(data);
    },
    onSettled: () => setDeleteId(0),
  });

  const { handlePushError } = useErrorContext();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Invoice ID",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "invoiceDate",
      headerName: "Invoice Date",
      flex: 1,
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : null,
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "storeName",
      headerName: "Store Name",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "invoiceNumber",
      headerName: "Invoice Number",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "description",
      headerName: "Description",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "valueOfPurchases",
      headerName: "Value of Purchases",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "vat",
      headerName: "Value Added Tax",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "totalPayable",
      headerName: "Total Payable",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "invoiceType",
      headerName: "Invoice Type",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Foreign", "Local"],
      align: "left",
      headerAlign: "left",
    },
    {
      field: "receivedDate",
      headerName: "Received Date",
      flex: 1,
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : null,
    },
    {
      field: "paymentDate",
      headerName: "Payment Date",
      flex: 1,
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : null,
    },
    {
      field: "createdBy",
      headerName: "Created By",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "createdOn",
      headerName: "Created On",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : null,
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "updatedOn",
      headerName: "Updated On",
      flex: 1,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : null,
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Actions",
      flex: 1,
      getActions: ({ id }) => {
        const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

        if (isInEditMode) {
          return [
            <GridActionsCellItem
              icon={<SaveIcon />}
              label="Save"
              onClick={handleSaveButtonClick(id)}
              sx={{
                color: "primary.main",
              }}
            />,
            <GridActionsCellItem
              icon={<CancelIcon />}
              label="Cancel"
              className="textPrimary"
              onClick={handleCancelButtonClick(id)}
              sx={{
                color: "error.main",
              }}
            />,
          ];
        }

        return [
          <GridActionsCellItem
            icon={<EditIcon />}
            label="Edit"
            className="textPrimary"
            onClick={handleEditButtonClick(id)}
            sx={{
              color: "primary.main",
            }}
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteButtonClick(id)}
            sx={{
              color: "error.main",
            }}
          />,
        ];
      },
    },
  ];

  const handleRowModesModelChange = function (
    newRowModesModel: GridRowModesModel
  ) {
    setRowModesModel(newRowModesModel);
  };

  const handleRowEditStop: GridEventListener<"rowEditStop"> = function (
    params,
    event
  ) {
    if (params.reason === GridRowEditStopReasons.rowFocusOut) {
      event.defaultMuiPrevented = true;
    }
  };

  const handleEditButtonClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const processRowUpdate = (newRow: GridRowModel) => {
    const updatedRow = {
      ...newRow,
      updatedBy: "AsithaN",
      updatedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
      isNew: false,
    };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

    editMutation.mutate({ ...updatedRow });
    return updatedRow;
  };

  const handleDeleteButtonClick = (id: GridRowId) => () => {
    setIsWindowOpen(true);
    setDeleteId(id as number);
  };

  const handleDeleteInvoice = function () {
    setRows(rows.filter((row) => row.id !== deleteId));

    deleteMutation.mutate(deleteId);
    setIsWindowOpen(false);
  };

  const handleSaveButtonClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelButtonClick = (id: GridRowId) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const changedRow = rows.find((row) => row.id === id);
    if (changedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleAlertWindowClose = function () {
    setDeleteId(0);
    setIsWindowOpen(false);
  };

  return (
    <Box className={styles["invoices-page"]}>
      {isLoading ? (
        <Box className={styles["invoices-page__loading-spinner"]}>
          <CircularProgress size="15vw" />
        </Box>
      ) : (
        <>
          <Box className={styles["invoices-page__title-section"]}>
            <Typography variant="h4" component="h1">
              Invoices
            </Typography>
          </Box>
          <Box className={styles["invoices-page__grid-container"]}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              processRowUpdate={processRowUpdate}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              initialState={{
                columns: {
                  columnVisibilityModel: {
                    id: false,
                    createdBy: false,
                    createdOn: false,
                    updatedBy: false,
                    updatedOn: false,
                  },
                },
              }}
              slots={{
                toolbar: DataGridToolbar as GridSlots["toolbar"],
              }}
              slotProps={{
                toolbar: {
                  isAddButtonShown: false,
                  showQuickFilter: true,
                } as DataGridToolbarPropTypes,
              }}
              sx={dataGridStyles}
            />
          </Box>
        </>
      )}
      <AlertWindow
        isWindowOpen={isWindowOpen}
        handleClose={handleAlertWindowClose}
        handleAgreeAction={handleDeleteInvoice}
        handleDisagreeAction={handleAlertWindowClose}
        windowTitle="Delete Invoice"
        description="Are you sure you want to delete this invoice and relevant purchase data permanently?"
      />
    </Box>
  );
};

export default InvoicesPage;
