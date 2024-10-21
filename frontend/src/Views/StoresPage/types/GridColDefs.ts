import { GridColDef } from "@mui/x-data-grid";
import dayjs from "dayjs";

import StoreGridColumnsType from "./GridColumnsType";

const GridColDefs: GridColDef<StoreGridColumnsType>[] = [
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
