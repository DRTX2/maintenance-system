import React, { act, useEffect, useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  TableContainer,
  Paper,
  Table,
  TablePagination,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  MenuItem,
} from "@mui/material";
import categoryCreateStyles from "../../../generic/styles/CreateStyles";
import tableStyles from "../../../generic/styles/TableStyles";
import CustomTablePaginationActions from "../../../generic/CustomTablePaginationActions";
import { toast } from "react-toastify";

const ComponentsModal = ({
  open,
  columns,
  onClose,
  onSave,
  catalog,
  currentComponents,
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [selectedComponentId, setSelectedComponentId] = useState("");
  const [selectedComponents, setSelectedComponents] = useState([]);

  useEffect(() => {
    if (open) {
      setSelectedComponents(currentComponents);
    }
  }, [open, currentComponents]);

  // Paginación
  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Acciones en la tabla
  const handleAddComponent = () => {
    if (!selectedComponentId) {
      toast.warning("Seleccione un componente para añadir.");
      return;
    }

    if (
      selectedComponents.some(
        (component) => component.id === selectedComponentId
      )
    ) {
      toast.warning("El componente ya ha sido añadido.");
      return;
    }

    const component = catalog.find((comp) => comp.id === selectedComponentId);
    if (component) {
      setSelectedComponents((prev) => [
        ...prev,
        { ...component, description: "" },
      ]);
      setSelectedComponentId("");
    }

    console.log("Lo que se añadio a la tabla es", selectedComponents);
  };

  const handleRemoveComponent = (componentId) => {
    setSelectedComponents((prev) =>
      prev.filter((component) => component.id !== componentId)
    );
  };

  // Cambio basado en la fila y su valor.
  const handleDescriptionChange = (componentId, description) => {
    setSelectedComponents((prev) =>
      prev.map((component) =>
        component.id === componentId ? { ...component, description } : component
      )
    );

    console.log("Lo que se cambio en la tabla es", selectedComponents);
  };

  const handleSave = () => {
    onSave(selectedComponents);
    onClose();
  };

  const handleClose = () => {
    setSelectedComponents([]);
    setSelectedComponentId("");
    onClose();
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h6" sx={{ flexShrink: 0, whiteSpace: "nowrap" }}>
            Reemplazar
          </Typography>

          <Box
            display="flex"
            gap={2}
            alignItems="center"
            marginBottom={2}
            marginTop={2}
          >
            <TextField
              select
              label="Seleccione un componente"
              value={selectedComponentId}
              onChange={(e) => setSelectedComponentId(e.target.value)}
              fullWidth
            >
              {catalog.length > 0 ? (
                catalog.map((component) => (
                  <MenuItem key={component.id} value={component.id}>
                    {component.nam_com}
                  </MenuItem>
                ))
              ) : (
                <MenuItem>No se han encontrado componentes...</MenuItem>
              )}
            </TextField>
            <Button variant="contained" onClick={handleAddComponent}>
              Añadir
            </Button>
          </Box>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {selectedComponents.length > 0 ? (
            <>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead sx={tableStyles.tableHead}>
                    <TableRow>
                      <TableCell>Nombre</TableCell>
                      <TableCell>Descripción</TableCell>
                      <TableCell>Acción</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedComponents.map((component) => (
                      <TableRow key={component.id}>
                        <TableCell>{component.nam_com}</TableCell>
                        <TableCell>
                          <TextField
                            value={component.description}
                            onChange={(e) =>
                              handleDescriptionChange(
                                component.id,
                                e.target.value
                              )
                            }
                            placeholder="Ingrese descripción"
                            fullWidth
                          />
                        </TableCell>
                        <TableCell>
                          <Button
                            color="error"
                            onClick={() => handleRemoveComponent(component.id)}
                            size="small"
                          >
                            Quitar
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={catalog.length}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[3, 5]}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={
                  <span style={tableStyles.labelRowsPerPage}>
                    Filas por página
                  </span>
                }
                labelDisplayedRows={() => ""}
                ActionsComponent={(props) => (
                  <CustomTablePaginationActions {...props} />
                )}
                sx={tableStyles.pagination}
              />
            </>
          ) : (
            <Typography>
              No se han encontrado componentes a reemplazar
            </Typography>
          )}
          {/* End table */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} sx={categoryCreateStyles.buttonStyle1}>
            Cancelar
          </Button>
          <Button onClick={handleSave} sx={categoryCreateStyles.buttonStyle2}>
            Guardar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ComponentsModal;
