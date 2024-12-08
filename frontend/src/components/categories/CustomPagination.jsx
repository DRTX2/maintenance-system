import React from "react";
import TablePagination from "@mui/material/TablePagination";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiTablePagination: {
      styleOverrides: {
        // Personaliza los textos y estilos aquí
        root: {
          backgroundColor: "#f5f5f5", // Cambia el color de fondo
          fontFamily: "Arial, sans-serif",
        },
        toolbar: {
          justifyContent: "center", // Centra la barra de paginación
        },
        actions: {
          // Estilo personalizado para las acciones
          "& button": {
            color: "blue",
          },
        },
      },
    },
  },
});

export default function CustomPagination() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(3);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <ThemeProvider theme={theme}>
      <TablePagination
        component="div"
        count={5}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        labelRowsPerPage="Filtrar por filas"
        nextIconButtonProps={{ "aria-label": "Siguiente" }}
        backIconButtonProps={{ "aria-label": "Anterior" }}
        labelDisplayedRows={({ from, to, count }) =>
          `${from}-${to} de ${count !== -1 ? count : `más de ${to}`}`
        }
        ActionsComponent={({ count, page, rowsPerPage, onPageChange }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <button
              onClick={(e) => onPageChange(e, page - 1)}
              disabled={page === 0}
            >
              Anterior
            </button>
            <span style={{ margin: "0 8px" }}>{`${page + 1} de ${Math.ceil(
              count / rowsPerPage
            )}`}</span>
            <button
              onClick={(e) => onPageChange(e, page + 1)}
              disabled={page >= Math.ceil(count / rowsPerPage) - 1}
            >
              Siguiente
            </button>
          </div>
        )}
      />
    </ThemeProvider>
  );
}
