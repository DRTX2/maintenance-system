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
import tableStyles from "./CategoryTableStyles";

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
        className="table-container"
        component={Paper}
        sx={tableStyles.tableContainer}
      >
        <Table>
          <TableHead sx={tableStyles.tableHead}>
            <TableRow>
              <TableCell>Código</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell align="center">Acciones</TableCell>
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
                  <TableCell align="center">
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
        // Cambiar a la siguiente pagina
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        // Mensaje de las filas por pagina
        labelRowsPerPage={
          <span style={tableStyles.labelRowsPerPage}>Filas por página</span>
        }
        // Quitar ese mensjae de 1-3 of 3
        labelDisplayedRows={() => ""}
        // Poner los botones de siguiente y anterior
        ActionsComponent={(props) => (
          <CustomTablePaginationActions {...props} />
        )}
        // Cambiar estilos
        sx={tableStyles.pagination}
      ></TablePagination>
    </>
  );
};

export default CategoryTable;
