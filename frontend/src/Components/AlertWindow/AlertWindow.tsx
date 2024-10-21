import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import PropTypes from "./types/PropTypes";

const AlertWindow = (props: PropTypes) => {
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
