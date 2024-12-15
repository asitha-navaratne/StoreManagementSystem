import { FC } from "react";

import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import { AlertWindowProps } from "./AlertWindow.types";

const AlertWindow: FC<AlertWindowProps> = (props) => {
  return (
    <Dialog open={props.isWindowOpen} onClose={props.handleClose}>
      <DialogTitle>{props.windowTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>{props.description}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.handleDisagreeAction}>No</Button>
        <Button onClick={props.handleAgreeAction} autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AlertWindow;
