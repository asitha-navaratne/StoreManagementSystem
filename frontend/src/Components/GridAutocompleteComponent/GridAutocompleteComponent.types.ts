import { GridRenderCellParams, GridRowId } from "@mui/x-data-grid";

export type GridAutocompleteComponentProps<T> = GridRenderCellParams & {
  options: T[];
  keyField: string;
  handleValueChange: (id: GridRowId, newValue: T | null) => void;
  getInitialValue: () => T;
};
