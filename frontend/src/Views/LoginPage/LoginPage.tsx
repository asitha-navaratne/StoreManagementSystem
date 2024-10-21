import { ChangeEvent, useState } from "react";

import { useNavigate } from "react-router-dom";
import {
  Button,
  Grid2,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import PersonIcon from "@mui/icons-material/Person";
import LockIcon from "@mui/icons-material/Lock";

import styles from "./LoginPage.module.scss";

const LoginPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isPasswordShown, setIsPasswordShown] = useState<boolean>(false);

  const navigate = useNavigate();

  const handleUsernameChange = function (
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setUsername(e.target.value);
  };

  const handlePasswordChange = function (
    e: ChangeEvent<HTMLInputElement>
  ): void {
    setPassword(e.target.value);
  };

  const handleShowPasswordButtonClick = function (): void {
    setIsPasswordShown((prev) => !prev);
  };

  const handleSubmitButtonClick = function (): void {
    navigate("/");
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
        <form>
          <Stack sx={{ alignItems: "center" }}>
            <Typography variant="h4" sx={{ mb: 3 }}>
              Sign In
            </Typography>
            <TextField
              sx={{ mt: 2, width: "100%" }}
              value={username}
              onChange={handleUsernameChange}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <PersonIcon />
                    </InputAdornment>
                  ),
                },
              }}
            />
            <TextField
              sx={{ mt: 2, width: "100%" }}
              value={password}
              onChange={handlePasswordChange}
              type={isPasswordShown ? "text" : "password"}
              slotProps={{
                input: {
                  startAdornment: (
                    <InputAdornment position="start">
                      <LockIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleShowPasswordButtonClick}
                        edge="end"
                      >
                        {isPasswordShown ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                },
              }}
            />
            <Button
              variant="contained"
              sx={{ mt: 5 }}
              onClick={handleSubmitButtonClick}
            >
              Submit
            </Button>
            <Button variant="text" sx={{ mt: 1 }}>
              Forgot Password?
            </Button>
          </Stack>
        </form>
      </Paper>
    </Grid2>
  );
};

export default LoginPage;
