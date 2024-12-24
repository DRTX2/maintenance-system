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
import DynamicField from "./DynamicField";

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

  // Basicamente valida un solo campo
  const handleFieldChange = (key, value) => {
    setEntity((prev) => ({ ...prev, [key]: value }));

    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMessage }));
  };

  // Cuando intente crear todos los campos
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

  const visibleFields = fields.filter((field) => field.showCreate);

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
          {visibleFields.map((field) => (
            <Box
              key={field.key}
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography
                style={{
                  width: "100px",
                  marginRight: "15px",
                }}
              >
                {field.label}
              </Typography>

              <DynamicField
                key={field.key}
                field={field}
                value={entity[field.key]}
                onChange={handleFieldChange}
                error={errors[field.key]}
                helperText={errors[field.key]}
                readOnly={false}
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
