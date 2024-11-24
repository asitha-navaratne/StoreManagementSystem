import {
  Avatar,
  Box,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import ClearIcon from "@mui/icons-material/Clear";

import styles from "./ErrorBar.module.scss";

import PropTypes from "./types/PropTypes";

import useErrorContext from "../../Hooks/useErrorContext";

const ErrorBar = (props: PropTypes) => {
  const { errorList, handleRemoveError } = useErrorContext();

  return (
    <Drawer anchor="right" open={props.isOpen} onClose={props.handleClose}>
      <Box className={styles["error-bar"]}>
        {errorList.length > 0 ? (
          <>
            <List className={styles["error-bar__error-list"]}>
              {errorList.slice(0, 7).map((error) => (
                <ListItem
                  key={error.id}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      onClick={() => handleRemoveError(error.id)}
                    >
                      <ClearIcon />
                    </IconButton>
                  }
                  sx={(theme) => ({
                    mt: 2,
                    backgroundColor: theme.palette.error.light,
                  })}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <ErrorIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    sx={{ color: "#fff" }}
                    primary={
                      error.description.length > 64
                        ? error.description.slice(0, 60) + "..."
                        : error.description
                    }
                    secondary={error.component}
                  />
                </ListItem>
              ))}
            </List>
            {errorList.length > 7 && (
              <Box className={styles["error-bar__list-footer"]}>
                + {errorList.length - 7} more
              </Box>
            )}
          </>
        ) : (
          <Box className={styles["error-bar__empty-label"]}>
            <Typography>No Errors to Show!</Typography>
            <CheckCircleIcon
              color="primary"
              fontSize="large"
              sx={{ mt: 2 }}
              className={styles["error-bar__clear-icon"]}
            />
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default ErrorBar;
