import React, { useState } from "react";
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

const CreateCategoryModal = ({ open, onClose, onCreate }) => {
  const [code, setCode] = useState("");
  const [type, setType] = useState("");
  const [name, setName] = useState("");

  const handleCreate = () => {
    if (type.trim() === "" || code.trim() === "" || name.trim() === "") {
      alert("Por favor ingresa un datos validos.");
      return;
    }
    onCreate({ code, type, name });
    setType("");
    setCode("");
    setName("");
    onClose();
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
            value={type}
            onChange={(e) => setType(e.target.value)}
            margin="normal"
          />
        </Box>

        {/* Fila para el tipo */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Tipo</Typography>
          <TextField
            label="Tipo"
            fullWidth
            value={code}
            onChange={(e) => setCode(e.target.value)}
            margin="normal"
          />
        </Box>

        {/* Fila para el nombrer */}
        <Box className="flexRowCenter">
          <Typography style={{ marginRight: "16px" }}>Nombre</Typography>
          <TextField
            label="Nombre"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            margin="normal"
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
