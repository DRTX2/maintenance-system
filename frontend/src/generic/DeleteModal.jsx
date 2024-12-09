import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";

const DeleteModal = ({ open, onClose, onDelete, item, message }) => {
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
          ¿Estás seguro de que deseas eliminar el{" "}
          <strong>{item[message] || item?.id}</strong>? Esta acción no se puede
          deshacer.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Cancelar
        </Button>
        <Button
          onClick={() => onDelete(item?.id)}
          color="secondary"
          variant="contained"
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
