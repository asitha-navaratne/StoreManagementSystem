export type DataGridToolbarProps =
  | {
      isAddButtonShown: boolean;
      isAddButtonDisabled?: boolean;
      handleAddButtonClicked?: () => void;
    }
  | {
      isSaveButtonDisabled: boolean;
      handleSaveButtonClick: () => void;
    };
