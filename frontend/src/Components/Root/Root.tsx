import { useCallback, useState } from "react";

import { Outlet } from "react-router-dom";
import { Box, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import styles from "./Root.module.scss";

import Sidebar from "../Sidebar/Sidebar";

const Root = () => {
  const [isMenuShown, setIsMenuShown] = useState<boolean>(false);

  const handleMenuButtonClick = function (): void {
    setIsMenuShown(true);
  };

  const handleMenuClose = useCallback(function (): void {
    setIsMenuShown(false);
  }, []);

  return (
    <Box className={styles["root"]}>
      <IconButton
        onClick={handleMenuButtonClick}
        sx={{ color: "primary.main" }}
      >
        <MenuIcon />
      </IconButton>
      <Sidebar isOpen={isMenuShown} handleClose={handleMenuClose} />
      <Outlet />
    </Box>
  );
};

export default Root;
