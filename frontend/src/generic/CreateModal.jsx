import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Typography,
  Box,
} from "@mui/material";
import { validateField, validateFields } from "../utils/validations";
import CreateStyles from "./styles/CreateStyles";

const CreateModal = ({ open, onClose, onCreate, fields, defaultState }) => {
  const [entity, setEntity] = useState(defaultState);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (!open) {
      resetFields();
    }
  }, [open]);

  const resetFields = () => {
    setEntity(defaultState);
    setErrors({});
  };

  const handleFieldChange = (field, value) => {
    setEntity((prev) => ({ ...prev, [field]: value }));

    // Validar el campo actual
    const errorMessage = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const validateAll = () => {
    const validationErrors = validateFields(entity, fields);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateAll()) {
      onCreate(entity);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Crear</DialogTitle>
      <DialogContent>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {fields.map(({ key, label }) => (
            <Box
              key={key}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography style={{ width: "100px", marginRight: "15px" }}>
                {label}
              </Typography>
              <TextField
                label={label}
                fullWidth
                value={entity[key] || ""}
                onChange={(e) => handleFieldChange(key, e.target.value)}
                error={!!errors[key]}
                helperText={errors[key]}
                sx={{ marginTop: "20px" }}
                InputLabelProps={{
                  shrink: true, // Esto fuerza al label a permanecer arriba
                }}
              />
            </Box>
          ))}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="secondary"
          sx={CreateStyles.buttonStyle1}
        >
          Cancelar
        </Button>
        <Button
          onClick={handleCreate}
          color="primary"
          sx={CreateStyles.buttonStyle2}
        >
          Guardar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateModal;
