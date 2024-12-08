import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
  Box,
} from "@mui/material";
import "../Form.css";

const GeneralizedModal = ({ open, onClose, onSubmit, fields }) => {
  // Estado para los valores de los campos
  const [formFields, setFormFields] = useState([]);

  // Usamos useEffect para inicializar los valores de los campos cuando se abre el modal
  useEffect(() => {
    if (open) {
      setFormFields(fields);
    }
  }, [open, fields]);

  const handleChange = (fieldUsed, value) => {
    // Actualizar el valor del campo en el estado local
    const updatedFields = formFields.map((field) =>
      field.name === fieldUsed ? { ...field, value: value } : field
    );
    setFormFields(updatedFields);
  };

  const handleCreate = () => {
    const isValid = formFields.every((field) => field.value.trim() !== "");
    if (!isValid) {
      alert("Por favor, ingresa datos válidos en todos los campos.");
      return;
    }

    const formData = formFields.reduce(
      (data, field) => ({
        ...data,
        [field.name]: field.value,
      }),
      {}
    );

    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Título del Modal */}
      <DialogTitle>Registrar</DialogTitle>

      {/* Contenido del Modal */}
      <DialogContent>
        {formFields.map((field) => (
          <Box key={field.name} className="flexRowCenter">
            <Typography className="typography-item">{field.label}</Typography>
            <TextField
              label={field.label}
              fullWidth
              value={field.value}
              onChange={(e) => handleChange(field.name, e.target.value)} // Cambié aquí
              margin="normal"
            />
          </Box>
        ))}
      </DialogContent>

      {/* Acciones del Modal */}
      <DialogActions>
        <Box className="modal-button-actions">
          <Button onClick={onClose} color="secondary">
            Cancelar
          </Button>
          <Button onClick={handleCreate} color="primary">
            Guardar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralizedModal;
