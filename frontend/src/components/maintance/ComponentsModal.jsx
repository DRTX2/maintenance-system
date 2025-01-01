import React, { act, useState } from "react";
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
  MenuItem,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
} from "@mui/material";
import categoryCreateStyles from "../../generic/styles/CreateStyles";
import tableStyles from "../../generic/styles/TableStyles";
import CustomTablePaginationActions from "../../generic/CustomTablePaginationActions";

const ActivitiesModal = ({ open, columns, onClose, onSave, catalog }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [componentsList, setComponentsList] = useState(
    catalog.map((item) => ({
      ...item,
      pivot: {
        ...item.pivot,
        description: item.pivot?.description || "",
      },
      error: false,
    }))
  );

  const handleSave = () => {
    onSave(componentsList);
    onClose();
  };

  // Tabla
  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Cambio basado en la fila y su valor.
  const handleDescription = (id, description) => {
    setComponentsList((prevData) =>
      prevData.map((component) =>
        component.id === id
          ? {
              ...component,
              pivot: { ...component.pivot, description }, // Actualiza la descripción
              error: !description.trim(), // Maneja el error si está vacío
            }
          : component
      )
    );
  };

  const filteredColumn = columns.filter((column) => column.showInTable);

  return (
    <>
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle>
          <Typography variant="h6" sx={{ flexShrink: 0, whiteSpace: "nowrap" }}>
            Reemplazar
          </Typography>
        </DialogTitle>
        <DialogContent
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          {/* Tabla */}
          <TableContainer
            className="table-container"
            component={Paper}
            sx={tableStyles.tableContainer}
          >
            <Table>
              <TableHead sx={tableStyles.tableHead}>
                <TableRow>
                  {filteredColumn.map((column) => (
                    <TableCell key={column.key}>{column.label}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {catalog
                  .slice(
                    currentPage * rowsPerPage,
                    currentPage * rowsPerPage + rowsPerPage
                  )
                  // item -> es un componente
                  .map((item) => (
                    <TableRow key={item.id}>
                      {filteredColumn.map((column) => (
                        <TableCell key={column.key}>
                          {/* Campo que se genera para la descripción */}
                          {column.key === "des_com" ? (
                            <TextField
                              value={
                                componentsList.find(
                                  (comp) => comp.id === item.id
                                )?.pivot?.description || ""
                              }
                              onChange={(e) =>
                                handleDescription(item.id, e.target.value)
                              }
                              error={
                                componentsList.find(
                                  (comp) => comp.id === item.id
                                )?.error || false
                              }
                              helperText={
                                componentsList.find(
                                  (comp) => comp.id === item.id
                                )?.error
                                  ? "Este campo es obligatorio"
                                  : ""
                              }
                              InputProps={{
                                readOnly: false,
                              }}
                            ></TextField>
                          ) : (
                            item[column.key]
                          )}
                        </TableCell>
                      ))}
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
              <span style={tableStyles.labelRowsPerPage}>Filas por página</span>
            }
            labelDisplayedRows={() => ""}
            ActionsComponent={(props) => (
              <CustomTablePaginationActions {...props} />
            )}
            sx={tableStyles.pagination}
          />
          {/* End table */}
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} sx={categoryCreateStyles.buttonStyle1}>
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

export default ActivitiesModal;
