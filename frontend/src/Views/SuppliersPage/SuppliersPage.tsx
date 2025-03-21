import { useEffect, useState } from "react";

import { AxiosError } from "axios";
import dayjs from "dayjs";
import randomInteger from "random-int";
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
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";

import styles from "./SuppliersPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar, {
  DataGridToolbarProps,
} from "../../Components/DataGridToolbar";
import AlertWindow from "../../Components/AlertWindow";

import useAuthContext from "../../Hooks/useAuthContext";
import useErrorContext from "../../Hooks/useErrorContext";

import StoreManagementSystemErrorType from "../../Types/StoreManagementSystemErrorType";
import {
  SuppliersApiColumnsType,
  SuppliersGridColumnsType,
} from "./SuppliersPage.types";

import InitSupplierRowValues from "../../Constants/InitSupplierRowValues";

import handleErrors from "../../Helpers/handleErrors";

import { getSuppliersQuery } from "./SuppliersPage.loader";

import Service from "../../Services/SupplierService";

const { AddSupplier, EditSupplier, DeleteSupplier } = Service();

const SuppliersPage = () => {
  const navigation = useNavigation();
  const loaderData = useLoaderData() as SuppliersGridColumnsType[];

  const { data, refetch } = useSuspenseQuery(getSuppliersQuery);

  const isLoading = navigation.state === "loading";

  const { account } = useAuthContext();

  const [rows, setRows] = useState<GridRowsProp>(loaderData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);

  const addMutation = useMutation({
    mutationFn: AddSupplier,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<SuppliersApiColumnsType>>
    ) => {
      const { errorObject, id } = handleErrors(err, "Suppliers Page");
      handlePushError(errorObject);
      setRows((prev) => prev.filter((row) => row.id !== id));
    },
  });

  const editMutation = useMutation({
    mutationFn: EditSupplier,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<SuppliersApiColumnsType>>
    ) => {
      const { errorObject } = handleErrors(err, "Suppliers Page");
      handlePushError(errorObject);

      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DeleteSupplier,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<{ id: number }>>
    ) => {
      const { errorObject } = handleErrors(err, "Suppliers Page");
      handlePushError(errorObject);

      refetch();
    },
    onSettled: () => setDeleteId(0),
  });

  const { handlePushError } = useErrorContext();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Supplier ID",
      minWidth: 150,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "supplierCode",
      headerName: "Supplier Code",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "supplierShortName",
      headerName: "Supplier Short Name",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "contactPerson",
      headerName: "Contact Person",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "supplierTin",
      headerName: "Supplier TIN Number",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "email",
      headerName: "Email",
      minWidth: 150,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "invoiceType",
      headerName: "Invoice Type",
      minWidth: 150,
      editable: true,
      type: "singleSelect",
      valueOptions: ["Local", "Foreign"],
      align: "left",
      headerAlign: "left",
    },
    {
      field: "paymentPeriod",
      headerName: "Payment Period",
      type: "number",
      flex: 1,
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) => (value === 1 ? "1 day" : `${value} days`),
    },
    {
      field: "active",
      headerName: "Active",
      minWidth: 150,
      editable: true,
      type: "boolean",
      renderCell: (params) => {
        return params.value ? (
          <CheckIcon
            style={{
              color: "#fff",
            }}
          />
        ) : (
          <CloseIcon
            style={{
              color: "#fff",
            }}
          />
        );
      },
    },
    {
      field: "createdBy",
      headerName: "Created By",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "createdOn",
      headerName: "Created On",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : null,
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "updatedOn",
      headerName: "Updated On",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : null,
    },
    {
      field: "actions",
      headerName: "Actions",
      minWidth: 150,
      type: "actions",
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

  useEffect(() => {
    if (data) {
      setRows(data);
    }
  }, [data]);

  const handleRowModesModelChange = function (
    newRowModesModel: GridRowModesModel
  ) {
    setRowModesModel(newRowModesModel);
  };

  const handleAddButtonClicked = function () {
    setIsAddButtonClicked(true);
    const id = randomInteger(2 ** 16, 2 ** 17);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        ...InitSupplierRowValues,
        createdBy: account.username,
        createdOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updatedBy: null,
        updatedOn: null,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "supplierCode" },
    }));
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
    const paymentPeriodValue = newRow.invoiceType === "Local" ? 7 : 30;

    if (isAddButtonClicked) {
      const addRow = {
        ...newRow,
        paymentPeriod: paymentPeriodValue,
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? addRow : row)));

      addMutation.mutate({ ...addRow });
      setIsAddButtonClicked(false);
      return addRow;
    } else {
      const updatedRow = {
        ...newRow,
        paymentPeriod: paymentPeriodValue,
        updatedBy: account.username,
        updatedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

      editMutation.mutate({ ...updatedRow });
      return updatedRow;
    }
  };

  const handleDeleteButtonClick = (id: GridRowId) => () => {
    setIsDeleteAlertOpen(true);
    setDeleteId(id as number);
  };

  const handleDeleteSupplier = function () {
    setRows(rows.filter((row) => row.id !== deleteId));
    setIsDeleteAlertOpen(false);

    deleteMutation.mutate(deleteId);
  };

  const handleSaveButtonClick = (id: GridRowId) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelButtonClick = (id: GridRowId) => () => {
    if (isAddButtonClicked) {
      setIsAddButtonClicked(false);
      const prevRows = rows.filter((row) => row.id !== id);
      setRows(prevRows);
    } else {
      setRowModesModel({
        ...rowModesModel,
        [id]: { mode: GridRowModes.View, ignoreModifications: true },
      });
    }

    const changedRow = rows.find((row) => row.id === id);
    if (changedRow!.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const handleAlertWindowClose = function () {
    setDeleteId(0);
    setIsDeleteAlertOpen(false);
  };

  return (
    <Box className={styles["suppliers-page"]}>
      {isLoading ? (
        <Box className={styles["suppliers-page__loading-spinner"]}>
          <CircularProgress size="15vw" />
        </Box>
      ) : (
        <>
          <Box className={styles["suppliers-page__title-section"]}>
            <Typography variant="h4" component="h1">
              Suppliers
            </Typography>
          </Box>
          <Box className={styles["suppliers-page__grid-container"]}>
            <DataGrid
              rows={rows}
              columns={columns}
              editMode="row"
              rowModesModel={rowModesModel}
              processRowUpdate={processRowUpdate}
              onRowModesModelChange={handleRowModesModelChange}
              onRowEditStop={handleRowEditStop}
              autosizeOnMount
              autosizeOptions={{
                columns: [
                  "supplierCode",
                  "supplierName",
                  "supplierShortName",
                  "contactPerson",
                  "phoneNumber",
                  "supplierTin",
                  "email",
                  "invoiceType",
                  "actions",
                ],
                includeOutliers: true,
                includeHeaders: true,
              }}
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
                  isAddButtonShown: true,
                  isAddButtonDisabled: isAddButtonClicked,
                  handleAddButtonClicked,
                  showQuickFilter: true,
                } as DataGridToolbarProps,
              }}
              sx={dataGridStyles}
            />
          </Box>
        </>
      )}
      <AlertWindow
        isWindowOpen={isDeleteAlertOpen}
        handleClose={handleAlertWindowClose}
        handleAgreeAction={handleDeleteSupplier}
        handleDisagreeAction={handleAlertWindowClose}
        windowTitle="Delete Supplier"
        description="Are you sure you want to delete this supplier permanently?"
      />
    </Box>
  );
};

export default SuppliersPage;
