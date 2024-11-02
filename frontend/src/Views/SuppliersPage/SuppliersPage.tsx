import { useEffect, useState } from "react";

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

import styles from "./SuppliersPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar from "../../Components/DataGridToolbar/DataGridToolbar";
import AlertWindow from "../../Components/AlertWindow/AlertWindow";

import GridColDefs from "./types/GridColDefs";
import InitSupplierRowValues from "../../Constants/InitSupplierRowValues";

import Service from "../../Services/SupplierService";

const { AddSupplier, EditSupplier, DeleteSupplier } = Service();

const SuppliersPage = () => {
  const [rows, setRows] = useState<GridRowsProp>(
    useLoaderData() as GridRowsProp
  );
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [editedRow, setEditedRow] = useState<GridRowModel | null>(null);
  const [addedRow, setAddedRow] = useState<GridRowModel | null>(null);
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<number>(0);
  const [isDeleteAlertOpen, setIsDeleteAlertOpen] = useState<boolean>(false);

  const columns: GridColDef[] = [
    ...GridColDefs,
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
              color="inherit"
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
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={handleDeleteButtonClick(id)}
            color="inherit"
          />,
        ];
      },
    },
  ];

  useEffect(() => {
    if (addedRow) {
      AddSupplier({
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
      EditSupplier({
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
    if (deleteId !== 0 && !isDeleteAlertOpen) {
      DeleteSupplier(deleteId)
        .catch((err) => {
          // TODO: Handle errors properly
          console.error(err);
        })
        .finally(() => {
          setDeleteId(0);
        });
    }
  }, [deleteId, isDeleteAlertOpen]);

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
        createdBy: "AsithaN",
        createdOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        updatedBy: null,
        updatedOn: null,
      },
    ]);
    setRowModesModel((oldModel) => ({
      ...oldModel,
      [id]: { mode: GridRowModes.Edit, fieldToFocus: "companyName" },
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
    const paymentPeriodValue = newRow.invoiceType === "local" ? 7 : 30;

    if (isAddButtonClicked) {
      const addRow = {
        ...newRow,
        paymentPeriod: paymentPeriodValue,
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? addRow : row)));
      setAddedRow({ ...addRow });
      setIsAddButtonClicked(false);
      return addRow;
    } else {
      const updatedRow = {
        ...newRow,
        paymentPeriod: paymentPeriodValue,
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
    setIsDeleteAlertOpen(true);
    setDeleteId(id as number);
  };

  const handleDeleteSupplier = function () {
    setRows(rows.filter((row) => row.id !== deleteId));
    setIsDeleteAlertOpen(false);
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
