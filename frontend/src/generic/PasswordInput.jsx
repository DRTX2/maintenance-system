import { IconButton, InputAdornment, TextField } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";

const PasswordInput = ({ field, value, onChange, readOnly }) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => setShowPassword(!showPassword);

  return (
    <TextField
      type={showPassword ? "text" : "password"}
      label={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.key, e.target.value)}
      fullWidth
      InputProps={{
        readOnly: readOnly,
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={toggleShowPassword}>
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
