import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CategoryTable = ({
  array,
  onSee,
  onDelete,
  currentPage,
  totalItems,
  setCurrentPage,
  setRowsPerPage,
}) => {
  return (
    <>
      <TableContainer
        component={Paper}
        style={{
          overFlowX: "hidde",
          margin: "0 auto",
          maxWidth: "100%",
        }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.cod_dis}</TableCell>
                <TableCell>{item.nom_dis}</TableCell>
                <TableCell>{item.tip_dis}</TableCell>
                <TableCell>
                  <IconButton onClick={() => onSee(item.id)} color="primary">
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => onDelete(item.id)}
                    color="secondary"
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        // Cantidad de items a mostrar
        count={totalItems}
        // Pagina actual
        page={currentPage - 1}
        // Filas en cada pagina
        rowsPerPage={3}
        // Mostrar más filas en las paginas
        rowsPerPageOptions={[3, 5]}
        // Cambiar a la siguiente pagina
        onPageChange={(event, newPage) => setCurrentPage(newPage + 1)}
        onRowsPerPageChange={(event, rows) => setRowsPerPage(rows)}
      ></TablePagination>
    </>
  );
};

export default CategoryTable;
