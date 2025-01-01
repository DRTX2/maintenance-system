import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";

const AssetSelector = ({
  options,
  onAdd,
  error,
  helperText,
  setErrorAsset,
  setHelperTextAsset,
}) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
    setErrorAsset(false);
    setHelperTextAsset("");
  };

  const handleAdd = () => {
    if (selectedValue) {
      onAdd(selectedValue);
      setSelectedValue("");
    }
  };

  return (
    <>
      <Typography
        variant="subtitle1"
        width="100%"
        color="#6068A5"
        fontWeight="bold"
      >
        Activos
      </Typography>

      <Box
        sx={{
          marginTop: "2.2rem",
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          select
          label="Seleccione un Activo"
          fullWidth
          value={selectedValue}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          error={!!error}
          helperText={helperText}
        >
          {options.map((option) => (
            <MenuItem key={option.id} value={option}>
              {option.ser_num_ass} - {option.cod_ass}
            </MenuItem>
          ))}
        </TextField>

        <Button
          variant="contained"
          color="primary"
          onClick={handleAdd}
          disabled={!selectedValue}
          sx={{
            margin: "0 15px",
            whiteSpace: "nowrap",
          }}
        >
          +
        </Button>
      </Box>
    </>
  );
};

export default AssetSelector;
