import { Link, useRouteError } from "react-router";
import { Box, Typography } from "@mui/material";

import styles from "./ErrorPage.module.scss";

import StoreManagementSystemErrorType from "../../Types/StoreManagementSystemErrorType";

const ErrorPage = () => {
  const error = useRouteError() as {
    response: { data: StoreManagementSystemErrorType<{ id: number }> };
    message: string;
    data: string;
    status: number;
  };

  const getHeadingText = function (): string {
    if (error.status === 404) {
      return error.data;
    } else if (error?.response?.data.message) {
      return error.response?.data.message;
    } else if (error.message) {
      return error.message;
    }

    return "";
  };

  const getBodyText = function (): string {
    if (error?.response?.data.errors) {
      return `at ${error?.response.data.errors[0].loc[0]} ${error?.response.data.errors[0].loc[1]}`;
    }
    return "";
  };

  return (
    <Box className={styles["error-page"]}>
      <Typography variant="h2">An Error Occurred!</Typography>
      <Typography variant="body2">
        An error occurred when accessing the content you requested.
      </Typography>
      <Typography
        variant="body2"
        sx={(theme) => ({ mt: 5, color: theme.palette.error.light })}
      >
        {getHeadingText()}
      </Typography>
      <Typography
        variant="body2"
        sx={(theme) => ({ mb: 5, color: theme.palette.error.light })}
      >
        {getBodyText()}
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Please try refreshing the page or return to the home page and navigate
        through the left menu.
      </Typography>
      <Link to="/" className={styles["error-page__link-button"]}>
        Home
      </Link>
    </Box>
  );
};

export default ErrorPage;
