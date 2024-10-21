import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridRowModel,
  GridRowsProp,
  GridSlots,
} from "@mui/x-data-grid";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import styles from "./StockMovementsPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import DataGridToolbar from "../../Components/DataGridToolbar/DataGridToolbar";

import StoreGridColumnsType from "../StoresPage/types/GridColumnsType";
import StockMovementsApiColumnsType from "./types/ApiColumnsType";

import processStockMovementsColumns from "../../Helpers/processStockMovementsColumns";

import Service from "../../Services/StockMovementsService";
import getCurrentInHandAmount from "../../Helpers/getCurrentInHandAmount";

const { GetStockMovements, UpdateStockMovement } = Service();

const StockMovementsPage = () => {
  const storesList = useLoaderData() as StoreGridColumnsType[];

  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(dayjs());
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [isGridEditable, setIsGridEditable] = useState<boolean>(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);
  const [isGridDataLoading, setIsGridDataLoading] = useState<boolean>(false);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "productName",
      headerName: "Product Name",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "storeName",
      headerName: "Store Name",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "recordDate",
      headerName: "Record Date",
      flex: 1,
      type: "date",
      align: "left",
      headerAlign: "left",
      valueFormatter: (value) =>
        value ? dayjs(value).format("YYYY-MM-DD") : null,
    },
    {
      field: "inHand",
      headerName: "Previous Day Stock",
      flex: 1,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "currentInHand",
      headerName: "In Hand",
      flex: 1,
      editable: isGridEditable,
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "purchasedAmount",
      headerName: "Purchased Amount",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "sold",
      headerName: "Sold",
      type: "number",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "updatedBy",
      headerName: "Updated By",
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
  ];

  useEffect(() => {
    if (selectedStore && selectedDate) {
      setIsGridDataLoading(true);
      GetStockMovements(selectedStore, selectedDate.format("YYYY-MM-DD"))
        .then((res) => {
          setRows(
            res.data.map((column: StockMovementsApiColumnsType) =>
              processStockMovementsColumns(column)
            )
          );

          const isSoldColumnNull = res.data.some(
            (row: StockMovementsApiColumnsType) => row.sold === null
          );
          setIsGridEditable(isSoldColumnNull);
          setIsSaveButtonDisabled(!isSoldColumnNull);
        })
        .catch((err) => {
          // TODO: Handle errors properly
          console.error(err);
        })
        .finally(() => setIsGridDataLoading(false));
    }
  }, [selectedStore, selectedDate]);

  const handleStoreChange = function (e: SelectChangeEvent) {
    setSelectedStore(e.target.value);
  };

  const handleDateChange = function (value: Dayjs | null) {
    setSelectedDate(value);
  };

  const handleRowEditStart = function () {
    setIsSaveButtonDisabled(true);
  };

  const handleRowEditStop = function () {
    setIsSaveButtonDisabled(false);
  };

  const processRowUpdate = function (updatedRow: GridRowModel): GridRowModel {
    const currentInHandAmount = getCurrentInHandAmount(
      updatedRow.currentInHand,
      updatedRow.inHand,
      updatedRow.purchasedAmount
    );
    const soldAmount =
      updatedRow.purchasedAmount + updatedRow.inHand - currentInHandAmount;

    const newRow = {
      ...updatedRow,
      currentInHand: currentInHandAmount,
      sold: soldAmount,
      isNew: false,
    };
    setRows((prev) =>
      prev.map((row) => (row.id === updatedRow.id ? newRow : row))
    );

    return newRow;
  };

  const handleSaveButtonClick = function () {
    setIsGridDataLoading(true);
    UpdateStockMovement([...rows])
      .then(() => {
        return GetStockMovements(selectedStore, dayjs().format("YYYY-MM-DD"));
      })
      .then((res) => {
        setRows(
          res.data.map((column: StockMovementsApiColumnsType) =>
            processStockMovementsColumns(column)
          )
        );

        const isSoldColumnNull = res.data.some(
          (row: StockMovementsApiColumnsType) => row.sold === null
        );
        setIsGridEditable(isSoldColumnNull);
        setIsSaveButtonDisabled(!isSoldColumnNull);
      })
      .catch((err) => {
        // TODO: Handle errors properly
        console.error(err);
      })
      .finally(() => setIsGridDataLoading(false));
  };

  return (
    <Box className={styles["stock-movements-page"]}>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>
        Stock Movements
      </Typography>
      <Box
        className={styles["stock-movements-page__selection-container"]}
        sx={{ mb: 2 }}
      >
        <FormControl sx={{ mr: 2 }}>
          <InputLabel id="select-store-label">Store</InputLabel>
          <Select
            labelId="select-store-label"
            id="select-store"
            value={selectedStore}
            label="Store"
            onChange={handleStoreChange}
          >
            {storesList.map((store) => (
              <MenuItem key={store.id} value={store.storeName}>
                {store.storeName}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DesktopDatePicker
            label="Select Date"
            value={selectedDate}
            onChange={handleDateChange}
            disableFuture
            slotProps={{
              textField: {
                color: "secondary",
                sx: {
                  svg: { color: "#fff" },
                  input: { color: "#fff" },
                },
              },
            }}
          />
        </LocalizationProvider>
      </Box>
      <Box className={styles["stock-movements-page__grid-container"]}>
        <DataGrid
          rows={rows}
          columns={columns}
          editMode="row"
          loading={isGridDataLoading}
          processRowUpdate={processRowUpdate}
          onRowEditStart={handleRowEditStart}
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
              isSaveButtonDisabled: isSaveButtonDisabled,
              handleSaveButtonClick: handleSaveButtonClick,
            },
            loadingOverlay: {
              variant: "skeleton",
              noRowsVariant: "skeleton",
            },
          }}
          sx={dataGridStyles}
        />
      </Box>
    </Box>
  );
};

export default StockMovementsPage;
