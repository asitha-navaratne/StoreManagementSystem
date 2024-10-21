import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";

type PropTypes<T> = GridRenderCellParams & {
  options: T[];
  keyField: string;
  handleValueChange: (id: GridRowId, newValue: T | null) => void;
  getInitialValue: () => T;
};

export default PropTypes;
