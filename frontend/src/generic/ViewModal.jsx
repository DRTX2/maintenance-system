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
        {isEditing ? "Editar" : "Ver"}
        <Box style={{ position: "absolute", right: "20px", top: "16px" }}>
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                color="primary"
              />
            }
            label={isEditing ? "Modo Editar" : "Modo Ver"}
          />
        </Box>
      </DialogTitle>
      <DialogContent>
        {fields.map(({ key, label }) => (
          <Box key={key} className="flexRowCenterStart" marginBottom="16px">
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
            />
          </Box>
        ))}
      </DialogContent>
      <DialogActions>
        {isEditing ? (
          <Button onClick={handleUpdate} color="primary">
            Guardar
          </Button>
        ) : null}
        <Button onClick={onClose} color="secondary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ViewModal;
