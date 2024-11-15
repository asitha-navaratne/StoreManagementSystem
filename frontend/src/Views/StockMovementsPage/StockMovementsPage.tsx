import { useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import {
  DataGrid,
  GridColDef,
  GridColumnGroupingModel,
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
import StockMovementsGridColumnsType from "./types/GridColumnsType";

import processStockMovementsColumns from "../../Helpers/processStockMovementsColumns";
import getCurrentInHandAmount from "../../Helpers/getCurrentInHandAmount";
import getHeadersForGroupedColumns from "../../Helpers/getHeadersForGroupedColumns";

import Service from "../../Services/StockMovementsService";

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

  const columns = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "productName",
      headerName: "Product",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "brandCode",
      headerName: "Brand Code",
      minWidth: 100,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "storeName",
      headerName: "Store",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "supplierCode",
      headerName: "Supplier Code",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      minWidth: 150,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "fourthInHand",
      headerName: "In Hand",
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: styles["header-cell--left"],
      cellClassName: styles["grouped-cell--left"],
    },
    {
      field: "fourthReceived",
      headerName: "Received",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "fourthSold",
      headerName: "Sale",
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
      cellClassName: styles["grouped-cell--right"],
    },
    {
      field: "thirdInHand",
      headerName: "In Hand",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "thirdReceived",
      headerName: "Received",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "thirdSold",
      headerName: "Sale",
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
      cellClassName: styles["grouped-cell--right"],
    },
    {
      field: "secondInHand",
      headerName: "In Hand",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "secondReceived",
      headerName: "Received",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "secondSold",
      headerName: "Sale",
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
      cellClassName: styles["grouped-cell--right"],
    },
    {
      field: "inHand",
      headerName: "In Hand",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "purchasedAmount",
      headerName: "Received",
      type: "number",
      align: "center",
      headerAlign: "center",
    },
    {
      field: "sold",
      headerName: "Sale",
      type: "number",
      align: "center",
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
      cellClassName: styles["grouped-cell--right"],
    },
    ...(selectedDate?.isSame(dayjs(), "day")
      ? [
          {
            field: "currentInHand",
            headerName: "Current In Hand",
            editable: isGridEditable,
            type: "number",
            minWidth: 150,
            align: "center",
            headerAlign: "center",
          },
        ]
      : []),
    {
      field: "updatedBy",
      headerName: "Updated By",
      align: "left",
      headerAlign: "left",
    },
  ];

  const [firstRecordDate, secondRecordDate, thirdRecordDate, fourthRecordDate] =
    getHeadersForGroupedColumns(rows[0] as StockMovementsGridColumnsType);

  const columnGroupingModel: GridColumnGroupingModel = [
    {
      groupId: firstRecordDate,
      children: [
        { field: "fourthInHand" },
        { field: "fourthReceived" },
        { field: "fourthSold" },
      ],
      headerAlign: "center",
      headerClassName: styles["header-cell--first"],
    },
    {
      groupId: secondRecordDate,
      children: [
        { field: "thirdInHand" },
        { field: "thirdReceived" },
        { field: "thirdSold" },
      ],
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
    },
    {
      groupId: thirdRecordDate,
      children: [
        { field: "secondInHand" },
        { field: "secondReceived" },
        { field: "secondSold" },
      ],
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
    },
    {
      groupId: fourthRecordDate,
      children: [
        { field: "inHand" },
        { field: "purchasedAmount" },
        { field: "sold" },
      ],
      headerAlign: "center",
      headerClassName: styles["header-cell--right"],
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
      <Box className={styles["stock-movements-page__title-section"]}>
        <Typography variant="h4" component="h1">
          Stock Movements
        </Typography>
      </Box>
      <Box className={styles["stock-movements-page__selection-container"]}>
        <FormControl sx={{ mr: 2 }}>
          <InputLabel id="select-store-label">Store</InputLabel>
          <Select
            labelId="select-store-label"
            id="select-store"
            value={selectedStore}
            label="Store"
            onChange={(e) => setSelectedStore(e.target.value)}
            sx={{ minWidth: "15vw" }}
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
            onChange={(value) => setSelectedDate(value)}
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
          columns={columns as GridColDef[]}
          columnGroupingModel={columnGroupingModel}
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
