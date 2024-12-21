import { MenuItem, TextField } from "@mui/material";
import PasswordInput from "./PasswordInput";

const fieldRenderers = {
  text: ({ field, value, onChange, error, helperText, readOnly }) => (
    <TextField
      label={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.key, e.target.value)}
      error={!!error}
      helperText={helperText}
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly }}
      sx={{ marginTop: "15px" }}
    />
  ),
  select: ({ field, value, onChange, error, helperText, readOnly }) => (
    <TextField
      select
      label={field.label}
      value={value || ""}
      onChange={(e) => onChange(field.key, e.target.value)}
      error={!!error}
      helperText={helperText}
      fullWidth
      InputLabelProps={{ shrink: true }}
      InputProps={{ readOnly }}
    >
      {field.options.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  ),
  password: ({ field, value, onChange, readOnly }) => (
    <PasswordInput
      field={field}
      value={value}
      onChange={onChange}
      readOnly={readOnly}
    />
  ),
};

export default fieldRenderers;
