import React, { useState } from "react";
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

const CategoryViewModal = ({ open, onClose, item }) => {
  // Aseguramos que `item` tenga un valor válido
  const [isEditing, setIsEditing] = useState(false);
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  if (!item) return null;

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  const save = async (id) => {};

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
                onChange={toggleEditMode}
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
            value={item.cod_dis || ""}
            margin="normal"
            InputProps={{
              // !isEditign --> Esta editando
              // isEditing --> No esta editando, ya que parte desde false.
              readOnly: !isEditing, // Hacemos que el campo sea solo lectura
            }}
          />
        </Box>

        {/* Fila para el tipo */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Tipo</Typography>
          <TextField
            label="Tipo"
            fullWidth
            value={item.tip_dis || ""}
            margin="normal"
            InputProps={{
              readOnly: !isEditing, // Hacemos que el campo sea solo lectura
            }}
          />
        </Box>

        {/* Fila para el nombre */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Nombre</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={item.nom_dis || ""}
            margin="normal"
            InputProps={{
              readOnly: !isEditing, // Hacemos que el campo sea solo lectura
            }}
          />
        </Box>
      </DialogContent>

      {/* Acciones del Modal */}
      <DialogActions>
        <Box marginBottom="10px" marginRight="10px">
          {isEditing ? (
            <Button onClick={() => save(item.id)}>Guardar</Button>
          ) : null}
          <Button onClick={onClose} color="secondary">
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default CategoryViewModal;
