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

const GeneralizedViewModal = ({
  open,
  onClose,
  item,
  onUpdate,
  isEditing,
  setIsEditing,
  fields, // array de objetos con los detalles de los campos
}) => {
  const [editedItem, setEditedItem] = useState(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleChange = (field, value) => {
    setEditedItem((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleUpdate = () => {
    onUpdate(editedItem);
    setIsEditing(false);
  };

  if (!editedItem) return null;

  return (
    <Dialog open={open} onClose={onClose}>
      {/* Título del Modal */}
      <DialogTitle>
        Ver Elemento
        <Box style={{ position: "absolute", right: "20px", top: "16px" }}>
          {/* Switch para habilitar edición */}
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
        {fields.map((field) => (
          <Box key={field.name} className="flexRowCenter">
            <Typography style={{ marginRight: "16px" }}>{field.label}</Typography>
            <TextField
              label={field.label}
              fullWidth
              value={editedItem[field.name] || ""}
              onChange={(e) => handleChange(field.name, e.target.value)}
              margin="normal"
              InputProps={{
                readOnly: !isEditing,
              }}
            />
          </Box>
        ))}
      </DialogContent>

      {/* Acciones del Modal */}
      <DialogActions>
        <Box marginBottom="10px" marginRight="10px">
          {isEditing && (
            <Button onClick={handleUpdate} color="primary">
              Guardar
            </Button>
          )}
          <Button onClick={onClose} color="secondary">
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default GeneralizedViewModal;
