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
import "../Form.css";

const FormModal = ({
  open,
  onClose,
  item,
  onUpdate,
  isEditing,
  setIsEditing,
  columns
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
        Ver detalles
        <Box style={{ position: "absolute", right: "1.25rem", top: "1rem" }}>
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
      {columns.map((column) => (
          <Box key={column.field} className="flexRowCenter">
            <Typography className="typography-item">
              {column.label}
            </Typography>
            <TextField
              label={column.label}
              fullWidth
              value={editedItem[column.field] || ""}
              onChange={(e) => handleChange(column.field, e.target.value)}
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
        <Box className="myBox">
          {isEditing ? <Button onClick={handleUpdate}>Guardar</Button> : null}
          <Button onClick={onClose} color="secondary">
            Cerrar
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default FormModal;
{/* <FormModal
  open={true}
  onClose={() => console.log("Cerrado")}
  item={{ cod_dis: "123", tip_dis: "Laptop", nom_dis: "MacBook Pro" }}
  onUpdate={(updatedItem) => console.log(updatedItem)}
  isEditing={false}
  setIsEditing={(value) => console.log("Edit mode:", value)}
  columns={[
    { field: "cod_dis", label: "Código" },
    { field: "tip_dis", label: "Tipo" },
    { field: "nom_dis", label: "Nombre" },
    { field: "desc_dis", label: "Descripción" }, // Ejemplo de nueva columna
  ]}
/> */}
