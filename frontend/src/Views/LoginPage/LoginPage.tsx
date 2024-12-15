import { useMsal } from "@azure/msal-react";

import { Button, Grid2, Paper, Stack, Typography } from "@mui/material";

import styles from "./LoginPage.module.scss";

import { loginRequest } from "../../Configs/auth.config";

const LoginPage = () => {
  const { instance } = useMsal();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
      })
      .catch((err) => {
        throw err;
      });
  };

  return (
    <Grid2
      height="100%"
      container
      spacing={0}
      direction="column"
      alignItems="center"
      justifyContent="center"
    >
      <Paper elevation={10} className={styles["login-page__form-container"]}>
        <Stack sx={{ alignItems: "center" }}>
          <Typography variant="h1" sx={{ mb: 3 }}>
            Store Management System
          </Typography>
          <Typography variant="h3">v 1.0</Typography>
          <Button variant="contained" sx={{ mt: 5 }} onClick={handleRedirect}>
            Sign In
          </Button>
        </Stack>
      </Paper>
    </Grid2>
  );
};

export default LoginPage;
