import {
  Box,
  Divider,
  Drawer,
  Icon,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { menuConfig, settingsConfig } from "../../Configs/menu.config";

import PropTypes from "./types/PropTypes";

const Sidebar = (props: PropTypes) => {
  const navigate = useNavigate();

  const handleLinkClick = function (url: string): void {
    navigate(url);
    props.handleClose();
  };

  return (
    <Drawer open={props.isOpen} onClose={props.handleClose}>
      <Box>
        <List>
          {menuConfig.map((menuItem) => (
            <ListItem key={menuItem.key} disablePadding sx={{ mt: 2, mr: 2 }}>
              <ListItemButton onClick={() => handleLinkClick(menuItem.url)}>
                <ListItemIcon>
                  <Icon>{menuItem.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        <Divider />
        <List>
          {settingsConfig.map((menuItem) => (
            <ListItem key={menuItem.key} disablePadding sx={{ mt: 2 }}>
              <ListItemButton onClick={() => handleLinkClick(menuItem.url)}>
                <ListItemIcon>
                  <Icon>{menuItem.icon}</Icon>
                </ListItemIcon>
                <ListItemText primary={menuItem.title} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
