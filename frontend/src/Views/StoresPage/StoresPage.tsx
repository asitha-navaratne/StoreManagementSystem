import { useState } from "react";

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

import styles from "./StoresPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar from "../../Components/DataGridToolbar/DataGridToolbar";
import AlertWindow from "../../Components/AlertWindow/AlertWindow";

import useErrorContext from "../../Hooks/useErrorContext";

import StoreGridColumnsType from "./types/GridColumnsType";
import StoreApiColumnsType from "./types/ApiColumnsType";
import StoreManagementSystemErrorType from "../../Types/StoreManagementSystemErrorType";
import DataGridToolbarPropTypes from "../../Components/DataGridToolbar/types/PropTypes";

import InitStoreRowValues from "../../Constants/InitStoreRowValues";

import handleErrors from "../../Helpers/handleErrors";

import { getStoresQuery } from "./StoresLoader";
import Service from "../../Services/StoreService";

const { AddStore, EditStore, DeleteStore } = Service();

const StoresPage = () => {
  const navigation = useNavigation();
  const loaderData = useLoaderData() as StoreGridColumnsType[];

  const { data } = useSuspenseQuery(getStoresQuery);

  const addMutation = useMutation({
    mutationFn: AddStore,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<StoreApiColumnsType>>
    ) => {
      const { errorObject, id } = handleErrors(err, "Stores Page");
      handlePushError(errorObject);
      setRows((prev) => prev.filter((row) => row.id !== id));
    },
  });

  const editMutation = useMutation({
    mutationFn: EditStore,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<StoreApiColumnsType>>
    ) => {
      const { errorObject } = handleErrors(err, "Stores Page");
      handlePushError(errorObject);

      setRows(data);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DeleteStore,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<{ id: number }>>
    ) => {
      const { errorObject } = handleErrors(err, "Stores Page");
      handlePushError(errorObject);

      setRows(data);
    },
    onSettled: () => setDeleteId(0),
  });

  const isLoading = navigation.state === "loading";

  const [rows, setRows] = useState<GridRowsProp>(loaderData);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  const { handlePushError } = useErrorContext();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Store ID",
      flex: 1,
      type: "number",
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
      field: "storeAddress",
      headerName: "Store Address",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "active",
      headerName: "Active",
      flex: 1,
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

  const handleAddButtonClicked = function () {
    setIsAddButtonClicked(true);
    const id = randomInteger(2 ** 16, 2 ** 17);
    setRows((oldRows) => [
      ...oldRows,
      {
        id,
        ...InitStoreRowValues,
        createdBy: "AsithaN",
        createdOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updatedBy: null,
        updatedOn: null,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "storeName" },
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
    if (isAddButtonClicked) {
      const addRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? addRow : row)));

      addMutation.mutate({ ...newRow });
      setIsAddButtonClicked(false);
      return addRow;
    } else {
      const updatedRow = {
        ...newRow,
        updatedBy: "AsithaN",
        updatedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));

      editMutation.mutate({ ...updatedRow });
      return updatedRow;
    }
  };

  const handleDeleteButtonClick = (id: GridRowId) => () => {
    setIsWindowOpen(true);
    setDeleteId(id as number);
  };

  const handleDeleteStore = function () {
    setRows(rows.filter((row) => row.id !== deleteId));
    setIsWindowOpen(false);

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
    setIsWindowOpen(false);
  };

  return (
    <Box className={styles["stores-page"]}>
      {isLoading ? (
        <Box className={styles["stores-page__loading-spinner"]}>
          <CircularProgress size="15vw" />
        </Box>
      ) : (
        <>
          <Box className={styles["stores-page__title-section"]}>
            <Typography variant="h4" component="h1">
              Stores
            </Typography>
          </Box>
          <Box className={styles["stores-page__grid-container"]}>
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
                  isAddButtonShown: true,
                  isAddButtonDisabled: isAddButtonClicked,
                  handleAddButtonClicked,
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
        handleAgreeAction={handleDeleteStore}
        handleDisagreeAction={handleAlertWindowClose}
        windowTitle="Delete Store"
        description="Are you sure you want to delete this store permanently?"
      />
    </Box>
  );
};

export default StoresPage;
