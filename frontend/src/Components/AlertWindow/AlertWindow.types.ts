export type AlertWindowProps = {
  isWindowOpen: boolean;
  handleClose: () => void;
  handleDisagreeAction: () => void;
  handleAgreeAction: () => void;
  windowTitle: string;
  description: string;
};
