import { memo, SyntheticEvent, useCallback, useState } from "react";

import { Autocomplete, InputBase } from "@mui/material";
import { useGridApiContext } from "@mui/x-data-grid";

import PropTypes from "./types/PropTypes";

const GridAutocompleteComponent = <T extends { [key: string]: unknown }>(
  props: PropTypes<T>
) => {
  const { id, field, handleValueChange, keyField } = props;

  const [value, setValue] = useState<T | null>(props.getInitialValue);

  const apiRef = useGridApiContext();

  const handleChange = useCallback(
    async function (e: SyntheticEvent, newValue: T | null) {
      setValue(newValue);

      await apiRef.current.setEditCellValue({
        id: id,
        field: field,
        value: newValue && keyField in newValue ? newValue[keyField] : null,
      });

      apiRef.current.stopCellEditMode({ id, field });

      handleValueChange(id, newValue);
      return e;
    },
    [apiRef, id, field, keyField, handleValueChange]
  );

  const getOptionLabel = function (option: T) {
    return option[keyField] as string;
  };

  return (
    <Autocomplete
      value={value}
      onChange={handleChange}
      options={props.options}
      getOptionLabel={getOptionLabel}
      renderInput={(params) => (
        <InputBase
          fullWidth
          id={params.id}
          inputProps={{
            ...params.inputProps,
            autoComplete: "new-password",
          }}
          sx={{
            color: "primary.contrastText",
            paddingLeft: "5px",
            "& .MuiAutocomplete-clearIndicator": {
              color: "primary.contrastText",
            },
            "& .MuiAutocomplete-popupIndicator": {
              color: "primary.contrastText",
            },
          }}
          {...params.InputProps}
        />
      )}
      fullWidth
    />
  );
};

export default memo(GridAutocompleteComponent);
