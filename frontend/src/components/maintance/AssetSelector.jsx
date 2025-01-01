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
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        flexWrap: "wrap",
        width: "100%",
        marginLeft: "60px",
      }}
    >
      <Typography
        variant="subtitle1"
        sx={{
          flexShrink: 0,
          fontWeight: "bold",
          color: "#6068A5",
          marginRight: "80px",
        }}
      >
        Activos
      </Typography>

      <TextField
        select
        label="Seleccione un Activo"
        fullWidth
        value={selectedValue}
        onChange={handleChange}
        sx={{
          flexGrow: 1,
          minWidth: "200px",
          maxWidth: "215px",
          width: "100%",
        }}
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
          flexShrink: 0,
          whiteSpace: "nowrap",
        }}
      >
        +
      </Button>
    </Box>
  );
};

export default AssetSelector;
