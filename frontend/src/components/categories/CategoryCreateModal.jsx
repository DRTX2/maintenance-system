import React, { useEffect } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
  TextField,
  Typography,
} from "@mui/material";

import Box from "@mui/material/Box";
import useCategoryValidation from "../../hooks/useCategoryValidation";

const CreateCategoryModal = ({ open, onClose, onCreate }) => {
  const { category, errors, handleFieldChange, validateFields, resetFields } =
    useCategoryValidation({ cod_dis: "", tip_dis: "", nom_dis: "" });

  useEffect(() => {
    if (!open) {
      resetFields(); // Resetea el formulario al cerrar el modal
    }
  }, [open]);

  const handleCreate = async () => {
    if (validateFields()) {
      await onCreate(category);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Este es el titulo que se musetra */}
      <DialogTitle>Registar un dispositivo</DialogTitle>

      {/* Aqui se encuentra todo el contenido */}
      <DialogContent>
        {/* Fila para el codigo */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Codigo</Typography>
          <TextField
            label="Codigo"
            fullWidth
            value={category.cod_dis || ""}
            onChange={(e) => handleFieldChange("cod_dis", e.target.value)}
            margin="normal"
            error={!!errors.cod_dis}
            helperText={errors.cod_dis}
          />
        </Box>

        {/* Fila para el tipo */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Tipo</Typography>
          <TextField
            label="Tipo"
            fullWidth
            value={category.tip_dis || ""}
            onChange={(e) => handleFieldChange("tip_dis", e.target.value)}
            margin="normal"
            error={!!errors.tip_dis}
            helperText={errors.tip_dis}
          />
        </Box>

        {/* Fila para el nombrer */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Nombre</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={category.nom_dis || ""}
            onChange={(e) => handleFieldChange("nom_dis", e.target.value)}
            margin="normal"
            error={!!errors.nom_dis}
            helperText={errors.nom_dis}
          />
        </Box>
      </DialogContent>

      {/* Lo que se puede hacer */}
      <DialogActions>
        <Box marginBottom="10px" marginRight="10px">
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

export default CreateCategoryModal;
