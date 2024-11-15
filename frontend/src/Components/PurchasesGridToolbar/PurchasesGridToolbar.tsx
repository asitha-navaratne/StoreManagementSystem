import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { GridToolbarContainer } from "@mui/x-data-grid";

import PropTypes from "./types/PropTypes";

const PurchasesGridToolbar = (props: PropTypes) => {
  return (
    <GridToolbarContainer>
      <Box
        sx={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Button
          variant="text"
          color="primary"
          startIcon={<AddIcon />}
          onClick={props.handleAddButtonClicked}
          disabled={props.isAddButtonDisabled}
          sx={{
            "&.Mui-disabled": {
              color: "#555",
            },
          }}
        >
          Add record
        </Button>
        <Button
          variant="outlined"
          color="primary"
          disabled={props.isSaveButtonDisabled}
          startIcon={<SaveIcon />}
          onClick={props.handleSaveAllButtonClick}
          sx={{
            marginY: 1,
            marginRight: 1,
            "&.Mui-disabled": {
              color: "#555",
            },
          }}
        >
          Save All
        </Button>
      </Box>
    </GridToolbarContainer>
  );
};

export default PurchasesGridToolbar;
