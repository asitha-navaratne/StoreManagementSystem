import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9d8f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#cd7f32",
      light: "#efd7bd",
      contrastText: "#fff",
    },
    info: {
      main: "#181a1e",
      light: "#4d5a6a",
      dark: "#313943",
      contrastText: "#fff",
    },
    error: {
      main: "#d32f2f",
      contrastText: "#fff",
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h4: {
          color: "#efd7bd",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
          transition: "1s",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "0px",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          backgroundColor: "#2a9d8f",
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
        icon: {
          color: "#fff",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: "2px solid #2a9d8f",
          backgroundColor: "#181a1e",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: "#4d5a6a",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: "#fff",
        },
      },
    },
  },
  typography: {
    h4: {
      fontSize: "3vh",
    },
  },
});

export default theme;
