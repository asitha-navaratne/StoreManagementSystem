import { Link } from "react-router-dom";
import { Box, Typography } from "@mui/material";

import styles from "./ErrorPage.module.scss";

const ErrorPage = () => {
  return (
    <Box className={styles["error-page"]}>
      <Typography variant="h1">An Error Occurred!</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        An error occurred when accessing the content you requested.
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
