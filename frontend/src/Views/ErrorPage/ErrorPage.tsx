import { Box, Typography } from "@mui/material";

import styles from "./ErrorPage.module.scss";
import { Link } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Box className={styles["error-page"]}>
      <Typography variant="h1">404 - Not Found</Typography>
      <Typography variant="body2" sx={{ mb: 2 }}>
        The content you requested is currently under development or not
        available.
      </Typography>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Please return to the home page and navigate through the left menu.
      </Typography>
      <Link to="/" className={styles["error-page__link-button"]}>
        Home
      </Link>
    </Box>
  );
};

export default ErrorPage;
