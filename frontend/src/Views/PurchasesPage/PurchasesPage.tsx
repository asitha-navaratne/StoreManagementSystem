import { ChangeEvent, useCallback, useEffect, useState } from "react";

import { useLoaderData } from "react-router-dom";
import randomInteger from "random-int";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
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

import styles from "./PurchasesPage.module.scss";
import dataGridStyles from "../../Styles/dataGridStyles";

import PurchasesGridToolbar from "../../Components/PurchasesGridToolbar/PurchasesGridToolbar";
import GridAutocompleteComponent from "../../Components/GridAutocompleteComponent/GridAutocompleteComponent";

import InvoicePayloadDataType from "./types/InvoicePayloadDataType";
import SuppliersGridColumnsType from "../SuppliersPage/types/GridColumnsType";
import PriceMasterGridColumnsType from "../PriceMasterPage/types/GridColumnsType";
import PriceMasterApiColumnsType from "../PriceMasterPage/types/ApiColumnsType";
import InitPurchaseRowValues from "../../Constants/InitPurchaseRowValues";
import InitInvoiceData from "../../Constants/InitInvoiceData";
import processPriceMasterColumns from "../../Helpers/processPriceMasterColumns";

import PurchasesService from "../../Services/PurchasesService";
import PriceMasterService from "../../Services/PriceMasterService";
import InvoicesService from "../../Services/InvoicesService";

const { GetPurchasesForInvoice, AddPurchases } = PurchasesService();
const { GetInvoiceByNumberAndSupplier, AddInvoice } = InvoicesService();
const { GetPricesBySupplier } = PriceMasterService();

const PurchasesPage = () => {
  const suppliersList = useLoaderData() as SuppliersGridColumnsType[];

  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<string>("");
  const [priceItemsBySupplierList, setPriceItemsBySupplierList] = useState<
    (PriceMasterGridColumnsType & { displayName: string })[]
  >([]);
  const [invoiceData, setInvoiceData] =
    useState<InvoicePayloadDataType>(InitInvoiceData);
  const [selectedInvoiceDate, setSelectedInvoiceDate] = useState<Dayjs | null>(
    dayjs()
  );
  const [selectedReceivedDate, setSelectedReceivedDate] =
    useState<Dayjs | null>(dayjs());
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [isAddButtonClicked, setIsAddButtonClicked] = useState<boolean>(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);

  const columns: GridColDef[] = [
    {
      field: "id",
      headerName: "ID",
      type: "number",
      align: "left",
      headerAlign: "left",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
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
          options={priceItemsBySupplierList}
          keyField="displayName"
          handleValueChange={handleProductValueChange}
          getInitialValue={() =>
            priceItemsBySupplierList.filter(
              (option) => option.displayName === params.value
            )[0] ?? null
          }
        />
      ),
      align: "left",
      headerAlign: "left",
    },
    {
      field: "bottleSize",
      headerName: "Size",
      flex: 1,
      type: "number",
      valueFormatter: (value) => `${value}L`,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "quantityOrdered",
      headerName: "Quantity",
      type: "number",
      flex: 1,
      editable: true,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "price",
      headerName: "Price",
      type: "number",
      valueFormatter: (value) => `Rs. ${value}`,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "quantityReceived",
      headerName: "Received Item Amount",
      type: "number",
      editable: true,
      flex: 1,
      align: "left",
      headerAlign: "left",
    },
    {
      field: "payableAmount",
      headerName: "Payable Amount",
      type: "number",
      valueFormatter: (value) => `Rs. ${value}`,
      flex: 1,
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
        ];
      },
    },
  ];

  useEffect(() => {
    if (selectedSupplier) {
      GetPricesBySupplier(selectedSupplier)
        .then((res) =>
          setPriceItemsBySupplierList(
            res.data.map((column: PriceMasterApiColumnsType) => ({
              ...processPriceMasterColumns(column),
              displayName: `${column.brand} (${column.shop_name})`,
            }))
          )
        )
        .catch((err) => {
          // TODO: Handle errors properly
          console.error(err);
        });
    }
  }, [selectedSupplier]);

  useEffect(() => {
    const getData = async function () {
      if (invoiceNumber && selectedSupplier) {
        try {
          const invoiceResult = await GetInvoiceByNumberAndSupplier(
            invoiceNumber,
            selectedSupplier
          );

          if (invoiceResult.data) {
            const purchasesResult = await GetPurchasesForInvoice(invoiceNumber);

            setRows(purchasesResult.data);
          }
        } catch (err) {
          // TODO: Handle errors properly
          console.error(err);
        }
      }
    };

    getData();
  }, [invoiceNumber, selectedSupplier]);

  const calculateQuantityAndValueOfPurchases = useCallback(
    function () {
      const total = rows.reduce(
        (accumulator, row) => [
          accumulator[0] + row.quantityReceived,
          accumulator[1] + row.payableAmount,
        ],
        [0, 0]
      );

      setInvoiceData((prev) => ({
        ...prev,
        quantity: total[0],
        valueOfPurchases: total[1],
        totalPayable: total[1] * (prev.vat / 100) + total[1],
      }));
    },
    [rows]
  );

  useEffect(() => {
    if (rows.length > 0 && !isAddButtonClicked) {
      calculateQuantityAndValueOfPurchases();
      setIsSaveButtonDisabled(false);
    } else {
      setIsSaveButtonDisabled(true);
    }
  }, [calculateQuantityAndValueOfPurchases, isAddButtonClicked, rows]);

  const handleInvoiceFieldsChange = function (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) {
    setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (e.target.name === "vat") {
      calculateQuantityAndValueOfPurchases();
    }
  };

  const handleProductValueChange = useCallback(function (
    id: GridRowId,
    newValue: { [key: string]: unknown } | null
  ) {
    setRows((oldRows) =>
      oldRows.map((row) => {
        if (row.id === id) {
          return {
            ...row,
            category: newValue?.category,
            productName: newValue?.brand,
            bottleSize: newValue?.bottleSize,
            supplierName: newValue?.companyName,
            price: newValue?.price,
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
    const newPayableAmount = newRow.price * newRow.quantityReceived;

    if (isAddButtonClicked) {
      const addRow = {
        ...newRow,
        payableAmount: newPayableAmount,
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? addRow : row)));
      setIsAddButtonClicked(false);
      return addRow;
    } else {
      const updatedRow = {
        ...newRow,
        payableAmount: newPayableAmount,
        updatedBy: "AsithaN",
        updatedOn: dayjs().format("YYYY-MM-DD HH:mm:ss"),
        isNew: false,
      };
      setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
      return updatedRow;
    }
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

  const handleSaveAllButtonClick = function () {
    const id = randomInteger(2 ** 16, 2 ** 17);
    AddInvoice({
      id,
      ...invoiceData,
      supplierName: selectedSupplier,
      invoiceNumber: invoiceNumber,
      createdBy: "AsithaN",
    })
      .then(() => {
        AddPurchases(
          rows.map((row) => ({
            ...row,
            invoiceNumber: invoiceNumber,
            receivedDate: selectedReceivedDate?.format("YYYY-MM-DD"),
            createdBy: "AsithaN",
            createdOn: dayjs().format("YYYY-MM-DD"),
            updatedBy: null,
            updatedOn: null,
          })),
          selectedSupplier
        );
      })
      .catch((err) => {
        // TODO: Handle errors properly
        console.error(err);
      });
  };

  return (
    <Box className={styles["purchases-page"]}>
      <Box className={styles["purchases-page__title-section"]}>
        <Typography variant="h4" component="h1">
          Purchases
        </Typography>
      </Box>
      <Box className={styles["purchases-page__invoice-grid"]}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Supplier Name</TableCell>
              <TableCell>Invoice Date</TableCell>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Quantity</TableCell>
              <TableCell>Value of Purchase</TableCell>
              <TableCell>VAT Amount</TableCell>
              <TableCell>Total Purchases</TableCell>
              <TableCell>Received Date</TableCell>
              <TableCell>Invoice Type</TableCell>
              <TableCell>Payment</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                <Select
                  id="select-supplier-name"
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    width: "10vw",
                  })}
                  value={selectedSupplier}
                  onChange={(e) => setSelectedSupplier(e.target.value)}
                >
                  {suppliersList.map((supplier) => (
                    <MenuItem key={supplier.id} value={supplier.companyName}>
                      {supplier.companyName}
                    </MenuItem>
                  ))}
                </Select>
              </TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disableFuture
                    value={selectedInvoiceDate}
                    onChange={(value) => setSelectedInvoiceDate(value)}
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
              </TableCell>
              <TableCell>
                <TextField
                  id="input-invoice-number"
                  type="number"
                  value={invoiceNumber}
                  onChange={(e) => setInvoiceNumber(e.target.value)}
                  color="primary"
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    "& fieldset": {
                      borderRadius: "0px",
                    },
                    input: {
                      color: "#fff",
                    },
                  })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="input-quantity"
                  type="number"
                  value={invoiceData["quantity"]}
                  color="primary"
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    "& fieldset": {
                      borderRadius: "0px",
                    },
                    input: {
                      color: "#fff",
                    },
                  })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="input-value-of-purchase"
                  type="number"
                  value={invoiceData["valueOfPurchases"]}
                  color="primary"
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    "& fieldset": {
                      borderRadius: "0px",
                    },
                    input: {
                      color: "#fff",
                    },
                  })}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="input-vat-amount"
                  type="number"
                  name="vat"
                  value={invoiceData["vat"]}
                  onChange={(e) =>
                    handleInvoiceFieldsChange(
                      e as ChangeEvent<HTMLInputElement>
                    )
                  }
                  color="primary"
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    "& fieldset": {
                      borderRadius: "0px",
                    },
                    "& .MuiInputAdornment-root p": {
                      color: "#fff",
                    },
                    input: {
                      color: "#fff",
                    },
                  })}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">%</InputAdornment>
                      ),
                    },
                  }}
                />
              </TableCell>
              <TableCell>
                <TextField
                  id="input-total-payable"
                  type="number"
                  value={invoiceData["totalPayable"]}
                  color="primary"
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    "& fieldset": {
                      borderRadius: "0px",
                    },
                    input: {
                      color: "#fff",
                    },
                  })}
                />
              </TableCell>
              <TableCell>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DesktopDatePicker
                    disableFuture
                    value={selectedReceivedDate}
                    onChange={(value) => setSelectedReceivedDate(value)}
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
              </TableCell>
              <TableCell>
                <Select
                  id="select-invoice-type"
                  name="invoiceType"
                  value={invoiceData["invoiceType"]}
                  onChange={handleInvoiceFieldsChange}
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    width: "7vw",
                  })}
                >
                  <MenuItem value="Local">Local</MenuItem>
                  <MenuItem value="Foreign">Foreign</MenuItem>
                </Select>
              </TableCell>
              <TableCell>
                <Select
                  id="select-payment"
                  name="payment"
                  value={invoiceData["payment"]}
                  onChange={handleInvoiceFieldsChange}
                  sx={(theme) => ({
                    border: `1px solid ${theme.palette.primary.main}`,
                    width: "7vw",
                  })}
                >
                  <MenuItem value="paid">Paid</MenuItem>
                  <MenuItem value="free">Free</MenuItem>
                </Select>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box className={styles["purchases-page__purchases-grid"]}>
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
            toolbar: PurchasesGridToolbar as GridSlots["toolbar"],
          }}
          slotProps={{
            toolbar: {
              isAddButtonDisabled:
                isAddButtonClicked ||
                selectedSupplier === "" ||
                invoiceNumber === "",
              handleAddButtonClicked,
              isSaveButtonDisabled,
              handleSaveAllButtonClick,
            },
          }}
          sx={dataGridStyles}
        />
      </Box>
    </Box>
  );
};

export default PurchasesPage;
