type PropTypes =
  | {
      isAddButtonDisabled: boolean;
      handleAddButtonClicked: () => void;
    }
  | {
      isSaveButtonDisabled: boolean;
      handleSaveButtonClick: () => void;
    };

export default PropTypes;
