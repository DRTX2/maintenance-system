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
import { validateField, validateCategoryFields } from "../../utils/validations";
import categoryViewStyles from "./CategoryViewStyles";

const CategoryViewModal = ({
  open,
  onClose,
  item,
  onUpdate,
  isEditing,
  setIsEditing,
}) => {
  const [editedCategory, setEditedCategory] = useState(item);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setEditedCategory(item);
    if (!open) {
      resetFields(); // Resetear el formulario cuando el modal se cierra
    }
  }, [open]);

  const handleFieldChange = (field, value) => {
    setEditedCategory((prev) => ({ ...prev, [field]: value }));

    const errorMessage = validateField(field, value);
    setErrors((prevErrors) => ({ ...prevErrors, [field]: errorMessage }));
  };

  const validateFields = () => {
    const validationErrors = validateCategoryFields(editedCategory);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const resetFields = () => {
    setErrors({});
  };

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
        <Box className="flexRowCenterStart">
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
        <Box className="flexRowCenterStart">
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
        <Box className="flexRowCenterStart">
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
          {isEditing ? (
            <Button onClick={handleUpdate} sx={categoryViewStyles.buttonStyle2}>
              Guardar
            </Button>
          ) : null}
          <Button
            onClick={onClose}
            color="secondary"
            sx={categoryViewStyles.buttonStyle1}
          >
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryViewModal;
