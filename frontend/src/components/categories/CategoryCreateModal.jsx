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
  const [category, setCategory] = useState({
    cod_dis: "",
    tip_dis: "",
    nom_dis: "",
  });

  const [errors, setErrors] = useState({
    cod_dis: "",
    tip_dis: "",
    nom_dis: "",
  });

  const validateFields = (data) => {
    let newErrors = {};

    if (!data.cod_dis) {
      newErrors.cod_dis = "El código es obligatorio";
    }

    if (!data.tip_dis) {
      newErrors.tip_dis = "El tipo es obligatorio";
    }

    if (!data.nom_dis) {
      newErrors.nom_dis = "El nombre es obligatorio";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreate = async () => {
    const isValid = validateFields(category);

    if (isValid) {
      await onCreate(category);
      setCategory({ cod_dis: "", tip_dis: "", nom_dis: "" });
      setErrors({ cod_dis: "", tip_dos: "", nom_dis: "" });
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
            value={category.cod_dis}
            onChange={(e) =>
              setCategory({ ...category, cod_dis: e.target.value })
            }
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
            value={category.tip_dis}
            onChange={(e) =>
              setCategory({ ...category, tip_dis: e.target.value })
            }
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
            value={category.nom_dis}
            onChange={(e) =>
              setCategory({ ...category, nom_dis: e.target.value })
            }
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
