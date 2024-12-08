import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import categoryDeleteStyles from "./CategoryDeleteStyles";

const DeleteConfirmationModal = ({ open, onClose, onDelete, item }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="delete-confirmation-title"
      aria-describedby="delete-confirmation-description"
    >
      <DialogTitle id="delete-confirmation-title">
        Confirmar Eliminación
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-description">
          ¿Estás seguro de eliminar {item.nom_dis}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={categoryDeleteStyles.buttonStyle1}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onDelete(item.id)}
          color="secondary"
          variant="contained"
          sx={categoryDeleteStyles.buttonStyle2}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
