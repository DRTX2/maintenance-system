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
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const CustomTablePaginationActions = ({
    count,
    page,
    rowsPerPage,
    onPageChange,
  }) => {
    const handleBackButtonClick = (event) => {
      onPageChange(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
      onPageChange(event, page + 1);
    };

    return (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <button
          onClick={handleBackButtonClick}
          disabled={page === 0}
          style={{ margin: "0 8px", padding: "6px 12px", cursor: "pointer" }}
        >
          Anterior
        </button>
        <span>{`${page + 1} de ${Math.ceil(count / rowsPerPage)}`}</span>
        <button
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          style={{ margin: "0 8px", padding: "6px 12px", cursor: "pointer" }}
        >
          Siguiente
        </button>
      </div>
    );
  };

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
            {array
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((item) => (
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
      ></TablePagination>
    </>
  );
};

export default CategoryTable;
