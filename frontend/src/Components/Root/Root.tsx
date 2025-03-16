import { useCallback, useEffect, useState } from "react";

import { useIsAuthenticated } from "@azure/msal-react";
import { Outlet } from "react-router";
import { Badge, Box, Button, IconButton, Snackbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import WarningIcon from "@mui/icons-material/Warning";

import styles from "./Root.module.scss";

import LoginPage from "../../Views/LoginPage";

import Sidebar from "../Sidebar";
import ErrorBar from "../ErrorBar";

import useAuthContext from "../../Hooks/useAuthContext";
import useErrorContext from "../../Hooks/useErrorContext";

import { loginRequest } from "../../Configs/auth.config";

const Root = () => {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);
  const [isErrorBarShown, setIsErrorBarShown] = useState<boolean>(false);
  const [isSnackbarShown, setIsSnackbarShown] = useState<boolean>(false);
  const [snackbarMessage, setSnackbarMessage] = useState<string>("");

  const { instance } = useAuthContext();

  const { errorCount, errorList, newError } = useErrorContext();

  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
    if (newError) {
      setIsSnackbarShown(true);
      setSnackbarMessage(errorList[0].description);
    }
  }, [errorList, newError]);

  const handleLogin = function () {
    instance.loginRedirect(loginRequest).catch((e) => {
      console.error(e);
    });
  };

  const handleMenuButtonClick = function () {
    setIsMenuShown(true);
  };

  const handleMenuClose = useCallback(function () {
    setIsMenuShown(false);
  }, []);

  const handleErrorButtonClick = function () {
    setIsErrorBarShown(true);
  };

  const handleErrorBarClose = function () {
    setIsErrorBarShown(false);
  };

  const handleSnackbarClose = function () {
    setIsSnackbarShown(false);
    setSnackbarMessage("");
  };

  if (!isAuthenticated) {
    return (
      <LoginPage>
        <Button variant="contained" sx={{ mt: 5 }} onClick={handleLogin}>
          Sign In
        </Button>
      </LoginPage>
    );
  }

  return (
    <>
      <Box className={styles["root__button-container"]}>
        <IconButton
          onClick={handleMenuButtonClick}
          sx={{ color: "primary.main", mt: 1 }}
        >
          <MenuIcon />
        </IconButton>
        <Box sx={{ mt: 2, mr: 3 }}>
          <IconButton onClick={handleErrorButtonClick}>
            <Badge badgeContent={errorCount} color="primary">
              <WarningIcon color={errorCount > 0 ? "error" : "secondary"} />
            </Badge>
          </IconButton>
        </Box>
      </Box>
      <Sidebar isOpen={isMenuShown} handleClose={handleMenuClose} />
      <Outlet />
      <ErrorBar isOpen={isErrorBarShown} handleClose={handleErrorBarClose} />
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={isSnackbarShown}
        autoHideDuration={5000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
        action={
          <Button onClick={handleSnackbarClose} color="secondary">
            Close
          </Button>
        }
      />
    </>
  );
};

export default Root;
