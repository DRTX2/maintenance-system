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

const CategoryViewModal = ({
  open,
  onClose,
  item,
  onUpdate,
  isEditing,
  setIsEditing,
}) => {
  const [editedCategory, setEditedCategory] = useState(item);

  useEffect(() => {
    setEditedCategory(item);
  }, [item]);

  const handleChange = (field, value) => {
    setEditedCategory((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedCategory);
    setIsEditing(false);
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
            onChange={(e) => handleChange("cod_dis", e.target.value)}
            margin="normal"
            InputProps={{
              // !isEditign --> Esta editando
              // isEditing --> No esta editando, ya que parte desde false.
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
            onChange={(e) => handleChange("tip_dis", e.target.value)}
            margin="normal"
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
            onChange={(e) => handleChange("nom_dis", e.target.value)}
            margin="normal"
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
