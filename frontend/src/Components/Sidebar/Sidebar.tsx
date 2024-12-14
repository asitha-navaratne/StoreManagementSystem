import { FC } from "react";

import { useMsal } from "@azure/msal-react";
import {
  Box,
  Button,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { NavLink } from "react-router";

import styles from "./Sidebar.module.scss";

import { config } from "../../Configs/menu.config";

import PropTypes from "./types/PropTypes";

const Sidebar: FC<PropTypes> = (props) => {
  const { instance } = useMsal();

  const handleLinkClick = function () {
    props.handleClose();
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect().catch((err) => {
      throw err;
    });
  };

  return (
    <Drawer open={props.isOpen} onClose={props.handleClose}>
      <Box className={styles["sidebar"]}>
        <List>
          {config.map((menuItem) => (
            <NavLink
              key={menuItem.key}
              to={menuItem.url}
              onClick={handleLinkClick}
              className={({ isActive }) =>
                isActive
                  ? styles["sidebar__link--active"]
                  : styles["sidebar__link"]
              }
            >
              {({ isActive }) => (
                <ListItem disablePadding sx={{ mt: 3 }}>
                  <ListItemIcon>
                    <Icon sx={{ color: isActive ? "#fff" : "#333" }}>
                      {menuItem.icon}
                    </Icon>
                  </ListItemIcon>
                  <ListItemText primary={menuItem.title} />
                </ListItem>
              )}
            </NavLink>
          ))}
        </List>
        <Box className={styles["sidebar__logout-button"]}>
          <Button
            variant="text"
            sx={{ color: "#333" }}
            onClick={handleLogoutRedirect}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
