import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

// Componente que recibe 'value' y 'onChange' para controlar el estado
function CustomEmailField({ value, onChange }) {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      value={value}  // Valor controlado
      onChange={onChange}  // Actualiza el estado
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="inherit" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
    />
  );
}

export default CustomEmailField;
