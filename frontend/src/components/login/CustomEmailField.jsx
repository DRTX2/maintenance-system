import React from "react";
import { TextField, InputAdornment } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";

// Componente que recibe 'value' y 'onChange' para controlar el estado
function CustomEmailField({ value, onChange, errors }) {
  return (
    <TextField
      id="input-with-icon-textfield"
      label="Email"
      name="email"
      type="email"
      size="small"
      required
      fullWidth
      value={value} // Valor controlado
      onChange={onChange} // Actualiza el estado
      error={!!errors["ema_log"]}
      helperText={errors["ema_log"]}
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <AccountCircle fontSize="inherit" />
          </InputAdornment>
        ),
      }}
      variant="outlined"
      sx={{ marginBottom: "10px" }}
    />
  );
}

export default CustomEmailField;
