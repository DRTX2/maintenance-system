import React, { useState } from "react";
import { Box, TextField, MenuItem, Button, Typography } from "@mui/material";

const AssetSelector = ({ options, onAdd }) => {
  const [selectedValue, setSelectedValue] = useState("");

  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleAdd = () => {
    if (selectedValue) {
      onAdd(selectedValue);
      setSelectedValue("");
    }
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
      <Typography
        variant="subtitle1"
        width="100%"
        color="#6068A5"
        fontWeight="bold"
      >
        Activos
      </Typography>

      <TextField
        select
        label="Seleccione un Activo"
        fullWidth
        value={selectedValue}
        onChange={handleChange}
        sx={{ width: "300px" }}
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
      >
        +
      </Button>
    </Box>
  );
};

export default AssetSelector;
