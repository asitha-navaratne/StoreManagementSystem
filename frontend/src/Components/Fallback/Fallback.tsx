import { Box, CircularProgress, Typography } from "@mui/material";

import styles from "./Fallback.module.scss";

const Fallback = () => {
  return (
    <Box className={styles["fallback"]}>
      <Typography variant="body2" sx={{ mb: 5 }}>
        Loading content. Please wait...
      </Typography>
      <CircularProgress size="15vw" />
    </Box>
  );
};

export default Fallback;
