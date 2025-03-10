import { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";
import randomInteger from "random-int";
import { AxiosError } from "axios";
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

import styles from "./PriceMasterPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar, {
  DataGridToolbarProps,
} from "../../Components/DataGridToolbar";
import GridAutocompleteComponent from "../../Components/GridAutocompleteComponent";
import AlertWindow from "../../Components/AlertWindow";

import useAuthContext from "../../Hooks/useAuthContext";
import useErrorContext from "../../Hooks/useErrorContext";

import LoaderDataType from "./types/LoaderType";
import PriceMasterApiColumnsType from "./types/ApiColumnsType";
import StoreManagementSystemErrorType from "../../Types/StoreManagementSystemErrorType";

import InitPriceRowValues from "../../Constants/InitPriceRowValues";
import AlcoholCategories from "../../Constants/AlcoholCategories";

import handleErrors from "../../Helpers/handleErrors";

import { getPriceItemsQuery } from "./PriceMasterLoader";
import Service from "../../Services/PriceMasterService";

const { AddPriceItem, EditPriceItem, DeletePriceItem } = Service();

const PriceMasterPage = () => {
  const navigation = useNavigation();
  const loaderData = useLoaderData() as LoaderDataType;

  const { data, refetch } = useSuspenseQuery(getPriceItemsQuery);

  const isLoading = navigation.state === "loading";

  const { account } = useAuthContext();

  const [rows, setRows] = useState<GridRowsProp>(loaderData.products);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  const addMutation = useMutation({
    mutationFn: AddPriceItem,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<PriceMasterApiColumnsType>>
    ) => {
      const { errorObject, id } = handleErrors(err, "Price Master Page");
      handlePushError(errorObject);
      setRows((prev) => prev.filter((row) => row.id !== id));
    },
  });

  const editMutation = useMutation({
    mutationFn: EditPriceItem,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<PriceMasterApiColumnsType>>
    ) => {
      const { errorObject } = handleErrors(err, "Price Master Page");
      handlePushError(errorObject);

      refetch();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: DeletePriceItem,
    onError: (
      err: AxiosError<StoreManagementSystemErrorType<{ id: number }>>
    ) => {
      const { errorObject } = handleErrors(err, "Price Master Page");
      handlePushError(errorObject);

      refetch();
    },
    onSettled: () => setDeleteId(0),
  });

  const { handlePushError } = useErrorContext();

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Product ID",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "shopName",
      headerName: "Store Name",
      flex: 1,
      editable: true,
      type: "singleSelect",
      renderEditCell: (params) => (
        <GridAutocompleteComponent
          {...params}
          options={loaderData.stores}
          keyField="storeName"
          handleValueChange={handleStoreValueChange}
          getInitialValue={() =>
            loaderData.stores.filter(
              (option) => option.storeName === params.value
            )[0] ?? null
          }
        />
      ),
      align: "left",
      headerAlign: "left",
    },
    {
      field: "supplierName",
      headerName: "Supplier Name",
      flex: 1,
      editable: true,
      renderEditCell: (params) => (
        <GridAutocompleteComponent
          {...params}
          options={loaderData.suppliers}
          keyField="supplierName"
          handleValueChange={handleSupplierValueChange}
          getInitialValue={() =>
            loaderData.suppliers.filter(
              (option) => option.supplierName === params.value
            )[0] ?? null
          }
        />
      ),
      align: "left",
      headerAlign: "left",
    },
    {
      field: "brand",
      headerName: "Brand",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "brandCode",
      headerName: "Brand Code",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
      editable: true,
      type: "singleSelect",
      valueOptions: AlcoholCategories,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "bottleSize",
      headerName: "Bottle Size",
      flex: 1,
      editable: true,
      type: "number",
      valueFormatter: (value) => `${value}L`,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "containerSize",
      headerName: "Container Size",
      flex: 1,
      editable: true,
      type: "number",
      valueFormatter: (value) => `${value}L`,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "taxPrice",
      headerName: "Tax Price",
      flex: 1,
      editable: true,
      type: "number",
      valueFormatter: (value) => `Rs. ${value}`,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      editable: true,
      type: "number",
      valueFormatter: (value) => `Rs. ${value}`,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
      editable: true,
      type: "number",
      valueFormatter: (value) => `Rs. ${value}`,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "commissions",
      headerName: "Commissions",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "margin",
      headerName: "Margin",
      flex: 1,
      editable: true,
      type: "number",
      valueFormatter: (value) => `${value}%`,
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

  const handleStoreValueChange = useCallback(function (
    id: GridRowId,
    newValue: { [key: string]: unknown } | null
  ) {
    setRows((oldRows) =>
      oldRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            shopName: newValue?.storeName,
          };
        }
        return row;
      })
    );
  },
  []);

  const handleSupplierValueChange = useCallback(function (
    id: GridRowId,
    newValue: { [key: string]: unknown } | null
  ) {
    setRows((oldRows) =>
      oldRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            supplierName: newValue?.supplierName,
          };
        }
        return row;
      })
    );
  },
  []);

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
        ...InitPriceRowValues,
        createdBy: account.username,
        createdOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updatedBy: null,
        updatedOn: null,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "shopName" },
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
    const commissionValue = newRow.price - newRow.cost;

    if (isAddButtonClicked) {
      const addRow = { ...newRow, commissions: commissionValue, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? addRow : row)));

      addMutation.mutate({ ...addRow });
      setIsAddButtonClicked(false);
      return addRow;
    } else {
      const updatedRow = {
        ...newRow,
        commissions: commissionValue,
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
    setIsWindowOpen(true);
    setDeleteId(id as number);
  };

  const handleDeletePriceItem = function () {
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
    <Box className={styles["price-master-page"]}>
      {isLoading ? (
        <Box className={styles["price-master-page__loading-spinner"]}>
          <CircularProgress size="15vw" />
        </Box>
      ) : (
        <>
          <Box className={styles["price-master-page__title-section"]}>
            <Typography variant="h4" component="h1">
              Price Master
            </Typography>
          </Box>
          <Box className={styles["price-master-page__grid-container"]}>
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
                } as DataGridToolbarProps,
              }}
              sx={dataGridStyles}
            />
          </Box>
        </>
      )}
      <AlertWindow
        isWindowOpen={isWindowOpen}
        handleClose={handleAlertWindowClose}
        handleAgreeAction={handleDeletePriceItem}
        handleDisagreeAction={handleAlertWindowClose}
        windowTitle="Delete Price Item"
        description="Are you sure you want to delete this price item permanently?"
      />
    </Box>
  );
};

export default PriceMasterPage;
