import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import SuppliersGridColumnsType from "./GridColumnsType";

const GridColDefs: GridColDef<SuppliersGridColumnsType>[] = [
  {
    field: "id",
    headerName: "Supplier ID",
    flex: 1,
    type: "number",
    align: "left",
    headerAlign: "left",
  },
  {
    field: "companyName",
    headerName: "Company Name",
    flex: 1,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "contactPerson",
    headerName: "Contact Person",
    flex: 1,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "supplierCode",
    headerName: "Supplier Code",
    flex: 1,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "number",
    headerName: "Phone Number",
    flex: 1,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "supplierTin",
    headerName: "Supplier TIN Number",
    flex: 1,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "email",
    headerName: "Email",
    flex: 1,
    editable: true,
    align: "left",
    headerAlign: "left",
  },
  {
    field: "invoiceType",
    headerName: "Invoice Type",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: ["local", "foreign"],
    align: "left",
    headerAlign: "left",
  },
  {
    field: "paymentPeriod",
    headerName: "Payment Period",
    type: "number",
    flex: 1,
    align: "left",
    headerAlign: "left",
    valueFormatter: (value) => (value === 1 ? "1 day" : `${value} days`),
  },
  {
    field: "active",
    headerName: "Active",
    flex: 1,
    editable: true,
    type: "singleSelect",
    valueOptions: ["true", "false"],
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
];

export default GridColDefs;
