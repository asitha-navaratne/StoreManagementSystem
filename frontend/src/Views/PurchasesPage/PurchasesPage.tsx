import { useCallback, useEffect, useState } from "react";

import dayjs from "dayjs";
import randomInteger from "random-int";
import { useLoaderData } from "react-router-dom";
import { Box, Typography } from "@mui/material";
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

import styles from "./PurchasesPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar from "../../Components/DataGridToolbar/DataGridToolbar";
import GridAutocompleteComponent from "../../Components/GridAutocompleteComponent/GridAutocompleteComponent";

import LoaderDataType from "./types/LoaderDataType";
import InitPurchaseRowValues from "../../Constants/InitPurchaseRowValues";

import Service from "../../Services/PurchaseService";
import AlertWindow from "../../Components/AlertWindow/AlertWindow";

const { AddPurchase, EditPurchase, DeletePurchase } = Service();

const PurchasesPage = () => {
  const payloadData = useLoaderData() as LoaderDataType;

  const [rows, setRows] = useState<GridRowsProp>(payloadData.purchases);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [editedRow, setEditedRow] = useState<GridRowModel | null>(null);
  const [addedRow, setAddedRow] = useState<GridRowModel | null>(null);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isWindowOpen, setIsWindowOpen] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "Purchase ID",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "shopName",
      headerName: "Shop Name",
      flex: 1,
      editable: true,
      type: "singleSelect",
      renderEditCell: (params) => (
        <GridAutocompleteComponent
          {...params}
          options={payloadData.stores}
          keyField="storeName"
          handleValueChange={handleStoreValueChange}
          getInitialValue={() =>
            payloadData.stores.filter(
              (option) => option.storeName === params.value
            )[0] ?? null
          }
        />
      ),
      align: "left",
      headerAlign: "left",
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      editable: true,
      type: "singleSelect",
      renderEditCell: (params) => (
        <GridAutocompleteComponent
          {...params}
          options={payloadData.products.filter(
            (product) => product.shopName === params.row.shopName
          )}
          keyField="brand"
          handleValueChange={handleProductValueChange}
          getInitialValue={() =>
            payloadData.products.filter(
              (option) => option.brand === params.value
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
      align: "left",
      headerAlign: "left",
    },
    {
      field: "orderDate",
      headerName: "Order Date",
      flex: 1,
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : null,
    },
    {
      field: "expectedDate",
      headerName: "Expected Date",
      flex: 1,
      type: "date",
      editable: true,
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : null,
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
      field: "quantityOrdered",
      headerName: "Quantity Ordered",
      flex: 1,
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "quantityReceived",
      headerName: "Quantity Received",
      flex: 1,
      editable: true,
      type: "number",
      align: "left",
      headerAlign: "left",
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
    if (addedRow) {
      AddPurchase({
        ...addedRow,
      })
        .catch((err) => {
          // TODO: Handle errors properly
          console.error(err);
        })
        .finally(() => {
          setAddedRow(null);
        });
    }
  }, [addedRow]);

  useEffect(() => {
    if (editedRow) {
      EditPurchase({
        ...editedRow,
      })
        .catch((err) => {
          // TODO: Handle errors properly
          console.error(err);
        })
        .finally(() => {
          setEditedRow(null);
        });
    }
  }, [editedRow]);

  useEffect(() => {
    if (deleteId !== 0 && !isWindowOpen) {
      DeletePurchase(deleteId)
        .catch((err) => {
          // TODO: Handle errors properly
          console.error(err);
        })
        .finally(() => {
          setDeleteId(0);
        });
    }
  }, [deleteId, isWindowOpen]);

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

  const handleProductValueChange = useCallback(function (
    id: GridRowId,
    newValue: { [key: string]: unknown } | null
  ) {
    setRows((oldRows) =>
      oldRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            productName: newValue?.brand,
            supplierName: newValue?.companyName,
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
        ...InitPurchaseRowValues,
        createdBy: "AsithaN",
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
    if (isAddButtonClicked) {
      const addRow = { ...newRow, isNew: false };
      setRows(rows.map((row) => (row.id === newRow.id ? addRow : row)));
      setAddedRow({ ...newRow });
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
      setEditedRow({ ...updatedRow });
      return updatedRow;
    }
  };

  const handleDeleteButtonClick = (id: GridRowId) => () => {
    setIsWindowOpen(true);
    setDeleteId(id as number);
  };

  const handleDeletePurchase = function () {
    setRows(rows.filter((row) => row.id !== deleteId));
    setIsWindowOpen(false);
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
    <Box className={styles["purchases-page"]}>
      <Box className={styles["purchases-page__title-section"]}>
        <Typography variant="h4" component="h1">
          Purchases
        </Typography>
      </Box>
      <Box className={styles["purchases-page__grid-container"]}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          rowModesModel={rowModesModel}
          onRowModesModelChange={handleRowModesModelChange}
          onRowEditStop={handleRowEditStop}
          processRowUpdate={processRowUpdate}
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
              isAddButtonDisabled: isAddButtonClicked,
              handleAddButtonClicked,
              showQuickFilter: true,
            },
          }}
          sx={dataGridStyles}
        />
      </Box>
      <AlertWindow
        isWindowOpen={isWindowOpen}
        handleClose={handleAlertWindowClose}
        handleAgreeAction={handleDeletePurchase}
        handleDisagreeAction={handleAlertWindowClose}
        windowTitle="Delete Purchase"
        description="Are you sure you want to delete this purchase permanently?"
      />
    </Box>
  );
};

export default PurchasesPage;
