import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Box,
  Button,
  TextField,
  Typography,
  Switch,
  FormControlLabel,
} from "@mui/material";
import useCategoryValidation from "../../hooks/useCategoryValidation";

const CategoryViewModal = ({
  open,
  onClose,
  item,
  onUpdate,
  isEditing,
  setIsEditing,
}) => {
  const {
    category: editedCategory,
    errors,
    handleFieldChange,
    validateFields,
    resetFields,
  } = useCategoryValidation(item);

  useEffect(() => {
    if (!open) {
      resetFields(); // Resetea el formulario cuando el modal se cierra
    }
  }, [open]);

  const handleUpdate = () => {
    if (validateFields()) {
      onUpdate(editedCategory);
      setIsEditing(false);
    }
  };

  if (!editedCategory) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Título del Modal */}
      <DialogTitle>
        Ver dispositivo
        <Box style={{ position: "absolute", right: "20px", top: "16px" }}>
          {/* Permite tener un switch */}
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                name="editModeSwitch"
                color={isEditing ? "primary" : "secondary"}
              />
            }
          />
        </Box>
      </DialogTitle>

      {/* Contenido del Modal */}
      <DialogContent>
        {/* Fila para el código */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Código</Typography>
          <TextField
            label="Código"
            fullWidth
            value={editedCategory.cod_dis || ""}
            onChange={(e) => handleFieldChange("cod_dis", e.target.value)}
            margin="normal"
            error={!!errors.cod_dis}
            helperText={errors.cod_dis}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </Box>

        {/* Fila para el tipo */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Tipo</Typography>
          <TextField
            label="Tipo"
            fullWidth
            value={editedCategory.tip_dis || ""}
            onChange={(e) => handleFieldChange("tip_dis", e.target.value)}
            margin="normal"
            error={!!errors.tip_dis}
            helperText={errors.tip_dis}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </Box>

        {/* Fila para el nombre */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Nombre</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={editedCategory.nom_dis || ""}
            onChange={(e) => handleFieldChange("nom_dis", e.target.value)}
            margin="normal"
            error={!!errors.nom_dis}
            helperText={errors.nom_dis}
            InputProps={{
              readOnly: !isEditing,
            }}
          />
        </Box>
      </DialogContent>

      {/* Acciones del Modal */}
      <DialogActions>
        <Box marginBottom="10px" marginRight="10px">
          {isEditing ? <Button onClick={handleUpdate}>Guardar</Button> : null}
          <Button onClick={onClose} color="secondary">
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryViewModal;
