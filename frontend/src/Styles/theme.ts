import { createTheme } from "@mui/material";

const theme = createTheme({
  palette: {
    primary: {
      main: "#2a9d8f",
      contrastText: "#fff",
    },
    secondary: {
      main: "#cd7f32",
      light: "#EFD7BD",
      contrastText: "#fff",
    },
    info: {
      main: "#181A1E",
      light: "#4D5A6A",
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
          color: "#EFD7BD",
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
  },
});

export default theme;
