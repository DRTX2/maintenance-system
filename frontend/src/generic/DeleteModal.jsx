import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteStyles from "./styles/DeleteStyles";

const DeleteModal = ({ open, onClose, onDelete, item, message }) => {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle id="delete-confirmation-title">
        Confirmar eliminación
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="delete-confirmation-description">
          ¿Estás seguro de que deseas eliminar el{" "}
          <strong style={{ color: "#6068A5" }}>
            {item[message] || item?.id || "Por defecto"}
          </strong>
          {""}?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          color="primary"
          sx={DeleteStyles.buttonStyle1}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => onDelete(item?.id)}
          color="secondary"
          variant="contained"
          sx={DeleteStyles.buttonStyle2}
        >
          Eliminar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteModal;
