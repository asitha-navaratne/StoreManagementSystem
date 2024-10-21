import { Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";
import { GridToolbarContainer, GridToolbarQuickFilter } from "@mui/x-data-grid";

import PropTypes from "./types/PropTypes";

const DataGridToolbar = (props: PropTypes) => {
  return (
    <GridToolbarContainer>
      {"isSaveButtonDisabled" in props ? (
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "flex-end",
            m: 1,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            disabled={props.isSaveButtonDisabled}
            startIcon={<SaveIcon />}
            onClick={props.handleSaveButtonClick}
            sx={{
              "&.Mui-disabled": {
                color: "#555",
              },
            }}
          >
            Save All
          </Button>
        </Box>
      ) : (
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
          <Box sx={{ mt: 1, mr: 1 }}>
            <GridToolbarQuickFilter />
          </Box>
        </Box>
      )}
    </GridToolbarContainer>
  );
};

export default DataGridToolbar;
