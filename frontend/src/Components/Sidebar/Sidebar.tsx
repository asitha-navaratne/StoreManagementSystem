import {
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { NavLink } from "react-router-dom";

import styles from "./Sidebar.module.scss";

import { menuConfig, settingsConfig } from "../../Configs/menu.config";

import PropTypes from "./types/PropTypes";

const Sidebar = (props: PropTypes) => {
  const handleLinkClick = function () {
    props.handleClose();
  };

  return (
    <Drawer open={props.isOpen} onClose={props.handleClose}>
      <Box className={styles["sidebar"]}>
        <List>
          {menuConfig.map((menuItem) => (
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
        <Divider sx={{ mt: 3 }} />
        <List>
          {settingsConfig.map((menuItem) => (
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
      </Box>
    </Drawer>
  );
};

export default Sidebar;
