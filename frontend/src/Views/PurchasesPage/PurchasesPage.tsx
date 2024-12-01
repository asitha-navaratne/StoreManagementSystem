import { ChangeEvent, useEffect, useState } from "react";

import { AxiosError } from "axios";
import { useLoaderData, useNavigation } from "react-router";
import randomInteger from "random-int";
import dayjs, { Dayjs } from "dayjs";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  Box,
  CircularProgress,
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

import DataGridToolbar from "../../Components/DataGridToolbar/DataGridToolbar";

import useErrorContext from "../../Hooks/useErrorContext";

import LoaderDataType from "./types/LoaderDataType";
import StoreManagementSystemErrorType from "../../Types/StoreManagementSystemErrorType";
import PurchaseGridColumnsType from "./types/GridColumnsType";
import PurchaseApiColumnsType from "./types/ApiColumnsType";
import InvoiceGridColumnsType from "../InvoicesPage/types/GridColumnsType";
import PriceMasterApiColumnsType from "../PriceMasterPage/types/ApiColumnsType";

import InitInvoiceData from "../../Constants/InitInvoiceData";

import handleErrors from "../../Helpers/handleErrors";

import PurchasesService from "../../Services/PurchasesService";
import PriceMasterService from "../../Services/PriceMasterService";
import InvoicesService from "../../Services/InvoicesService";

const { GetPurchasesForInvoiceNumber, AddPurchases, EditPurchase } =
  PurchasesService();
const { GetInvoiceByNumberSupplierAndStore, AddInvoice, EditInvoice } =
  InvoicesService();
const { GetPricesBySupplierAndStore } = PriceMasterService();

const PurchasesPage = () => {
  const navigation = useNavigation();

  const isLoading = navigation.state === "loading";

  const { suppliers: suppliersList, stores: storesList } =
    useLoaderData() as LoaderDataType;

  const [selectedSupplier, setSelectedSupplier] = useState<string>("");
  const [selectedStore, setSelectedStore] = useState<string>("");
  const [invoiceNumber, setInvoiceNumber] = useState<number>(0);
  const [rows, setRows] = useState<GridRowsProp>([]);
  const [rowModesModel, setRowModesModel] = useState<GridRowModesModel>({});
  const [invoiceData, setInvoiceData] =
    useState<InvoiceGridColumnsType>(InitInvoiceData);
  const [selectedInvoiceDate, setSelectedInvoiceDate] = useState<Dayjs | null>(
    dayjs()
  );
  const [selectedReceivedDate, setSelectedReceivedDate] =
    useState<Dayjs | null>(dayjs());
  const [quantity, setQuantity] = useState<number>(0);
  const [selectedPayment, setSelectedPayment] = useState<"Paid" | "Free">(
    "Paid"
  );
  const [isExistingPurchaseRecord, setIsExistingPurchaseRecord] =
    useState<boolean>(false);
  const [isSaveButtonDisabled, setIsSaveButtonDisabled] =
    useState<boolean>(true);

  const { handlePushError } = useErrorContext();

  const columns: GridColDef[] = [
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
    if (selectedSupplier && selectedStore) {
      GetPricesBySupplierAndStore(selectedSupplier, selectedStore)
        .then((res) => {
          setRows(
            res.data.map((row: PriceMasterApiColumnsType) => {
              const id = randomInteger(2 ** 16, 2 ** 17);

              return {
                id,
                category: row.category,
                productName: row.brand,
                bottleSize: row.bottle_size,
                quantityOrdered: 0,
                price: row.price,
                quantityReceived: 0,
                payableAmount: 0,
                createdBy: null,
                createdOn: null,
                updatedBy: null,
                updatedOn: null,
              };
            })
          );
          if (res.data.length > 0) {
            setIsSaveButtonDisabled(false);
          } else {
            setIsSaveButtonDisabled(true);
          }
        })
        .catch(
          (err: AxiosError<StoreManagementSystemErrorType<{ id: number }>>) => {
            const { errorObject } = handleErrors(err, "Purchases Page");
            handlePushError(errorObject);
          }
        );
    }
  }, [selectedSupplier, selectedStore, handlePushError]);

  useEffect(() => {
    if (invoiceNumber && selectedSupplier && selectedStore) {
      GetInvoiceByNumberSupplierAndStore(
        invoiceNumber,
        selectedSupplier,
        selectedStore
      )
        .then((res) => {
          if (res) {
            setInvoiceData(res);
            setSelectedInvoiceDate(dayjs(res.invoiceDate));
            setSelectedReceivedDate(dayjs(res.receivedDate));

            return GetPurchasesForInvoiceNumber(
              invoiceNumber,
              selectedSupplier,
              selectedStore
            );
          } else {
            setInvoiceData(InitInvoiceData);
            setQuantity(0);
            setSelectedInvoiceDate(dayjs());
            setSelectedReceivedDate(dayjs());
          }
        })
        .then((res) => {
          if (res) {
            setRows((prev) =>
              prev.map((row) => {
                const match = res.find(
                  (purchase: PurchaseGridColumnsType) =>
                    purchase.productName === row.productName
                );
                if (match) {
                  const newRow = {
                    ...row,
                    id: match.id,
                    quantityOrdered: match.quantityOrdered,
                    quantityReceived: match.quantityReceived,
                    payableAmount: match.quantityReceived * row.price,
                    createdBy: match.createdBy,
                    createdOn: match.createdOn,
                    updatedBy: match.updatedBy,
                    updatedOn: match.updatedOn,
                  };
                  return newRow;
                }
                return row;
              })
            );
            setIsExistingPurchaseRecord(true);
          } else {
            setRows((prev) =>
              prev.map((row) => ({
                ...row,
                quantityOrdered: 0,
                quantityReceived: 0,
                payableAmount: 0,
              }))
            );
            setIsExistingPurchaseRecord(false);
          }
        })
        .catch(
          async (
            err: AxiosError<
              StoreManagementSystemErrorType<PurchaseApiColumnsType>
            >
          ) => {
            const { errorObject } = handleErrors(err, "Purchases Page");
            handlePushError(errorObject);
            setRows([]);
          }
        );
    }
  }, [invoiceNumber, selectedSupplier, selectedStore, handlePushError]);

  useEffect(() => {
    if (rows.length > 0) {
      const total = rows.reduce(
        (accumulator, row) => [
          accumulator[0] + row.quantityReceived,
          accumulator[1] + row.payableAmount,
        ],
        [0, 0]
      );
      setQuantity(total[0]);
      setInvoiceData((prev) => ({
        ...prev,
        valueOfPurchases: total[1],
        totalPayable: total[1] * (prev.vat / 100) + total[1],
      }));
    }
  }, [rows]);

  const handleInvoiceFieldsChange = function (
    e: ChangeEvent<HTMLInputElement> | SelectChangeEvent
  ) {
    if (e.target.name === "vat") {
      const vatRate = Number(e.target.value);
      setInvoiceData((prev) => ({
        ...prev,
        vat: vatRate,
        totalPayable:
          prev.valueOfPurchases * (vatRate / 100) + prev.valueOfPurchases,
      }));
    } else {
      setInvoiceData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

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
    const newPayableAmount = newRow.price * newRow.quantityReceived;

    const updatedRow = {
      ...newRow,
      payableAmount: newPayableAmount,
      isNew: false,
      isEdited: true,
    };

    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
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

  const handleSaveAllButtonClick = function () {
    if (isExistingPurchaseRecord) {
      const payload = rows.filter((row) => row.isEdited);
      EditInvoice({
        ...invoiceData,
        invoiceDate: selectedInvoiceDate!.format("YYYY-MM-DD"),
        receivedDate: selectedReceivedDate!.format("YYYY-MM-DD"),
        supplierName: selectedSupplier,
        storeName: selectedStore,
        invoiceNumber: invoiceNumber,
        updatedBy: "AsithaN",
        updatedOn: dayjs().format("YYYY-MM-DD"),
      })
        .then(() => {
          EditPurchase(
            payload.map((row) => ({
              ...row,
              invoiceNumber: invoiceNumber,
              receivedDate: selectedReceivedDate?.format("YYYY-MM-DD"),
              updatedBy: "AsithaN",
              updatedOn: dayjs().format("YYYY-MM-DD"),
            })),
            selectedSupplier,
            selectedStore
          );
        })
        .catch(
          async (
            err: AxiosError<
              StoreManagementSystemErrorType<PurchaseApiColumnsType>
            >
          ) => {
            const { errorObject } = handleErrors(err, "Purchases Page");
            handlePushError(errorObject);

            const initialRows = await GetPricesBySupplierAndStore(
              selectedSupplier,
              selectedStore
            );
            setRows(
              initialRows.data.map((row: PriceMasterApiColumnsType) => {
                const id = randomInteger(2 ** 16, 2 ** 17);

                return {
                  id,
                  category: row.category,
                  productName: row.brand,
                  bottleSize: row.bottle_size,
                  quantityOrdered: 0,
                  price: row.price,
                  quantityReceived: 0,
                  payableAmount: 0,
                  createdBy: null,
                  createdOn: null,
                  updatedBy: null,
                  updatedOn: null,
                };
              })
            );

            const purchases = await GetPurchasesForInvoiceNumber(
              invoiceNumber,
              selectedSupplier,
              selectedStore
            );
            setRows((prev) =>
              prev.map((row) => {
                const match = purchases.find(
                  (purchase: PurchaseGridColumnsType) =>
                    purchase.productName === row.productName
                );
                if (match) {
                  const newRow = {
                    ...row,
                    id: match.id,
                    quantityOrdered: match.quantityOrdered,
                    quantityReceived: match.quantityReceived,
                    payableAmount: match.quantityReceived * row.price,
                    createdBy: match.createdBy,
                    createdOn: match.createdOn,
                    updatedBy: match.updatedBy,
                    updatedOn: match.updatedOn,
                  };
                  return newRow;
                }
                return row;
              })
            );
          }
        );
    } else {
      const newInvoiceId = randomInteger(2 ** 16, 2 ** 17);
      AddInvoice({
        ...invoiceData,
        id: newInvoiceId,
        invoiceDate: selectedInvoiceDate!.format("YYYY-MM-DD"),
        receivedDate: selectedReceivedDate!.format("YYYY-MM-DD"),
        supplierName: selectedSupplier,
        storeName: selectedStore,
        invoiceNumber: invoiceNumber,
        createdBy: "AsithaN",
      })
        .then(() => {
          AddPurchases(
            rows
              .filter(
                (row) => row.quantityOrdered !== 0 && row.quantityReceived !== 0
              )
              .map((row) => {
                const id = randomInteger(2 ** 16, 2 ** 17);

                return {
                  ...row,
                  id,
                  invoiceNumber: invoiceNumber,
                  receivedDate: selectedReceivedDate?.format("YYYY-MM-DD"),
                  createdBy: "AsithaN",
                  createdOn: dayjs().format("YYYY-MM-DD"),
                  updatedBy: null,
                  updatedOn: null,
                };
              }),
            selectedSupplier,
            selectedStore
          );
        })
        .catch(
          async (
            err: AxiosError<
              StoreManagementSystemErrorType<PurchaseApiColumnsType>
            >
          ) => {
            const { errorObject } = handleErrors(err, "Purchases Page");
            handlePushError(errorObject);

            const initialRows = await GetPricesBySupplierAndStore(
              selectedSupplier,
              selectedStore
            );
            setRows(
              initialRows.data.map((row: PriceMasterApiColumnsType) => {
                const id = randomInteger(2 ** 16, 2 ** 17);

                return {
                  id,
                  category: row.category,
                  productName: row.brand,
                  bottleSize: row.bottle_size,
                  quantityOrdered: 0,
                  price: row.price,
                  quantityReceived: 0,
                  payableAmount: 0,
                  createdBy: null,
                  createdOn: null,
                  updatedBy: null,
                  updatedOn: null,
                };
              })
            );
          }
        );
    }
  };

  return (
    <Box className={styles["purchases-page"]}>
      {isLoading ? (
        <Box className={styles["purchases-page__loading-spinner"]}>
          <CircularProgress size="15vw" />
        </Box>
      ) : (
        <>
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
                  <TableCell>Store Name</TableCell>
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
                        width: "8vw",
                      })}
                      value={selectedSupplier}
                      onChange={(e) => setSelectedSupplier(e.target.value)}
                    >
                      {suppliersList.length > 0 ? (
                        suppliersList.map((supplier) => (
                          <MenuItem
                            key={supplier.id}
                            value={supplier.companyName}
                          >
                            {supplier.companyName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>No Suppliers</em>
                        </MenuItem>
                      )}
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Select
                      id="select-store-name"
                      sx={(theme) => ({
                        border: `1px solid ${theme.palette.primary.main}`,
                        width: "8vw",
                      })}
                      value={selectedStore}
                      onChange={(e) => setSelectedStore(e.target.value)}
                    >
                      {storesList.length > 0 ? (
                        storesList.map((store) => (
                          <MenuItem key={store.id} value={store.storeName}>
                            {store.storeName}
                          </MenuItem>
                        ))
                      ) : (
                        <MenuItem value="">
                          <em>No Stores</em>
                        </MenuItem>
                      )}
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
                      type="Number"
                      value={invoiceNumber}
                      onChange={(e) => setInvoiceNumber(Number(e.target.value))}
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
                      value={quantity}
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
                      slotProps={{ input: { readOnly: true } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="input-value-of-purchase"
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
                      slotProps={{ input: { readOnly: true } }}
                    />
                  </TableCell>
                  <TableCell>
                    <TextField
                      id="input-vat-amount"
                      type="Number"
                      name="vat"
                      value={invoiceData["vat"]}
                      onFocus={(e) => e.target.select()}
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
                      slotProps={{ input: { readOnly: true } }}
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
                      value={selectedPayment}
                      onChange={(e) =>
                        setSelectedPayment(e.target.value as "Paid" | "Free")
                      }
                      sx={(theme) => ({
                        border: `1px solid ${theme.palette.primary.main}`,
                        width: "7vw",
                      })}
                    >
                      <MenuItem value="Paid">Paid</MenuItem>
                      <MenuItem value="Free">Free</MenuItem>
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
                  handleSaveButtonClick: handleSaveAllButtonClick,
                },
              }}
              sx={dataGridStyles}
            />
          </Box>
        </>
      )}
    </Box>
  );
};

export default PurchasesPage;
