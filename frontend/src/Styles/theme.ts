import { createTheme } from "@mui/material";

const colors = {
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
};

const theme = createTheme({
  palette: {
    primary: {
      main: colors.primary.main,
      contrastText: colors.primary.contrastText,
    },
    secondary: {
      main: colors.secondary.main,
      light: colors.secondary.light,
      contrastText: colors.secondary.contrastText,
    },
    info: {
      main: colors.info.main,
      light: colors.info.light,
      dark: colors.info.dark,
      contrastText: colors.info.contrastText,
    },
    error: {
      main: colors.error.main,
      contrastText: colors.error.contrastText,
    },
  },
  components: {
    MuiTypography: {
      styleOverrides: {
        h1: {
          color: colors.secondary.light,
          fontSize: "5vh",
          marginBottom: "3vh",
        },
        h4: {
          color: colors.secondary.light,
          fontSize: "3vh",
        },
        body2: {
          color: colors.primary.contrastText,
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
          backgroundColor: colors.primary.main,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          color: colors.primary.contrastText,
        },
        icon: {
          color: colors.primary.contrastText,
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.primary.contrastText,
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          border: "2px solid",
          borderColor: colors.primary.main,
          backgroundColor: "#181a1e",
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          backgroundColor: colors.primary.main,
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          color: colors.primary.contrastText,
        },
      },
    },
  },
});

export default theme;
