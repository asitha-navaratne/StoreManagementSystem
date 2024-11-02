const dataGridStyles = {
  boxShadow: 2,
  border: 2,
  borderColor: "primary.main",
  color: "primary.contrastText",
  backgroundColor: "info.main",
  "& .MuiDataGrid-cell:hover": {
    color: "secondary.main",
  },
  "& .MuiDataGrid-columnHeader": {
    backgroundColor: "info.light",
  },
  "& .MuiDataGrid-columnHeader--filtered": {
    backgroundColor: "primary.main",
  },
  "& .MuiDataGrid-columnHeader--sorted": {
    backgroundColor: "primary.main",
  },
  "& .MuiDataGrid-columnHeader button": {
    color: "#fff",
  },
  "& .MuiDataGrid-scrollbarFiller": {
    backgroundColor: "info.light",
  },
  "& .MuiDataGrid-toolbarQuickFilter > *": {
    color: "#fff",
    marginBottom: "5px",
  },
  "& .MuiDataGrid-row--editing .MuiDataGrid-cell": {
    backgroundColor: "info.dark",
  },
  "& .MuiDataGrid-cell > .MuiInputBase-root": {
    color: "#fff",
  },
  "& .MuiTablePagination-root": {
    color: "#fff",
  },
  "& .MuiTablePagination-actions > button": {
    color: "#fff",
  },
};

export default dataGridStyles;
