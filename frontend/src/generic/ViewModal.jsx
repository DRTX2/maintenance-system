import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Switch,
  FormControlLabel,
  Box,
} from "@mui/material";
import { validateField, validateFields } from "../utils/validations";
import ViewStyles from "./styles/ViewStyles";

const ViewModal = ({
  open,
  onClose,
  item,
  onUpdate,
  isEditing,
  setIsEditing,
  fields,
}) => {
  const [entity, setEntity] = useState(item);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setEntity(item);
      setErrors({});
    }
  }, [item, open]);

  // Basicamente validar un solo campo
  const handleFieldChange = (field, value) => {
    setEntity((prev) => ({ ...prev, [field]: value }));

    // Validar el campo actual
    const errorMessage = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  // CUando intente actualizar validar todos los campos.
  const validateAll = () => {
    const validationErrors = validateFields(entity, fields);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleUpdate = () => {
    if (validateAll()) {
      onUpdate(entity);
      setIsEditing(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        Ver dispositivo
        <Box style={{ position: "absolute", right: "20px", top: "16px" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                color="primary"
              />
            }
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        {fields.map(({ key, label }) => (
          <Box key={key} className="flexRowCenterStart" sx={ViewStyles.box}>
            <Typography style={{ marginRight: "16px" }}>{label}</Typography>
            <TextField
              label={label}
              fullWidth
              value={entity[key] || ""}
              onChange={(e) => handleFieldChange(key, e.target.value)}
              error={!!errors[key]}
              helperText={errors[key]}
              InputProps={{
                readOnly: !isEditing,
              }}
              sx={{ marginTop: "15px" }}
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <Button
            onClick={handleUpdate}
            color="primary"
            sx={ViewStyles.buttonStyle2}
          >
            Guardar
          </Button>
        ) : null}
        <Button
          onClick={onClose}
          color="secondary"
          sx={ViewStyles.buttonStyle1}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
