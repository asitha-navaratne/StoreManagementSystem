import { Box, CircularProgress } from "@mui/material";

import styles from "./AuthLoadingSpinner.module.scss";

const AuthLoadingSpinner = () => (
  <Box className={styles["auth-loading-spinner"]}>
    Loading Data
    <CircularProgress sx={{ mt: 2 }} />
  </Box>
);

export default AuthLoadingSpinner;
