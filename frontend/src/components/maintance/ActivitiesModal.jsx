import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  MenuItem,
} from "@mui/material";

const ActivitiesModal = ({ open, onClose, rowData, onSave, catalog }) => {
  const [selectedActivity, setSelectedActivity] = useState("");
  const [activitiesList, setActivitiesList] = useState(
    rowData?.activities || []
  );

  const handleAddActivity = () => {
    if (selectedActivity === "") {
      alert("Selecciona una actividad antes de añadir.");
      return;
    }
    if (activitiesList.some((activity) => activity === selectedActivity)) {
      alert("Esta actividad ya fue añadida.");
      return;
    }
    setActivitiesList((prev) => [...prev, selectedActivity]);
    setSelectedActivity("");
  };

  const handleRemoveActivity = (activityToRemove) => {
    setActivitiesList((prev) =>
      prev.filter((activity) => activity !== activityToRemove)
    );
  };

  const handleSave = () => {
    onSave(activitiesList);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          p: 4,
          borderRadius: 2,
          boxShadow: 24,
          width: "50%",
        }}
      >
        <Typography variant="h6" marginBottom={2}>
          Añadir Tarea
        </Typography>

        {/* Selector de actividades */}
        <Box display="flex" gap={2} alignItems="center" marginBottom={2}>
          <TextField
            select
            label="Selecciona una actividad"
            value={selectedActivity}
            onChange={(e) => setSelectedActivity(e.target.value)}
            fullWidth
          >
            {catalog.map((activity) => (
              <MenuItem key={activity} value={activity}>
                {activity}
              </MenuItem>
            ))}
          </TextField>
          <Button variant="contained" onClick={handleAddActivity}>
            Añadir
          </Button>
        </Box>

        {/* Tabla de actividades */}
        {activitiesList.length > 0 && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Actividad</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {activitiesList.map((activity, index) => (
                  <TableRow key={index}>
                    <TableCell>{activity}</TableCell>
                    <TableCell>
                      <Button
                        color="secondary"
                        onClick={() => handleRemoveActivity(activity)}
                      >
                        Quitar
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Botones de acción */}
        <Box marginTop={2} display="flex" justifyContent="flex-end" gap={2}>
          <Button onClick={onClose} color="secondary" variant="outlined">
            Cancelar
          </Button>
          <Button onClick={handleSave} color="primary" variant="contained">
            Guardar
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ActivitiesModal;
