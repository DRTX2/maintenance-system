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
import CustomTablePaginationActions from "./CustomTablePaginationActions";

const CategoryTable = ({
  array,
  onSee,
  onDelete,
  currentPage,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
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
          <TableHead
            sx={{
              backgroundColor: "#6a71a5", // Cambia el color de fondo
              "& .MuiTableCell-root": {
                color: "#ffffff", // Cambia el color del texto
                fontWeight: "bold", // Aplica negrita
              },
            }}
          >
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {array
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.cod_dis}</TableCell>
                  <TableCell>{item.nom_dis}</TableCell>
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
        count={array.length}
        // Pagina actual
        page={currentPage}
        // Filas en cada pagina
        rowsPerPage={rowsPerPage}
        // Mostrar más filas en las paginas
        rowsPerPageOptions={[3, 5]}
        sx={{
          "& .MuiTablePagination-select": {
            color: "#8d91af", // Cambia el color del número
            fontWeight: "bold", // Negrita
            fontSize: "14px", // Tamaño de fuente
          },
          "& .MuiTablePagination-selectIcon": {
            color: "#8d91af", // Cambia el color del icono del desplegable
          },
        }}
        // Cambiar a la siguiente pagina
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // Mensaje de las filas por pagina
        labelRowsPerPage={
          <span style={{ color: "#6a71a5", fontWeight: "bold" }}>
            Filas por página
          </span>
        }
        // Quitar ese mensjae de 1-3 of 3
        labelDisplayedRows={() => ""}
        ActionsComponent={(props) => (
          <CustomTablePaginationActions {...props} />
        )}
      ></TablePagination>
    </>
  );
};

export default CategoryTable;
