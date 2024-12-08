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

const GeneralTable = ({
  array,
  columns,
  actions,
  currentPage,
  totalItems,
  setCurrentPage,
  setRowsPerPage,
}) => {

  return (
    <>
      <TableContainer component={Paper} className="TabContainer">
        <Table>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field}>{col.label}</TableCell>
              ))}
              {actions && <TableCell>Acciones</TableCell>}
            </TableRow>
          </TableHead>
          <TableBody>
            {array.map((row) => (
              <TableRow key={row.id}>
                {columns.map((col) => (
                  <TableCell key={col.field}>{row[col.field]}</TableCell>
                ))}
                {actions && (
                  
                  <TableCell>
                    {actions.map((action, index) => (
                      <IconButton
                        key={index}
                        onClick={() => action.onClick(row.id)}
                        color={action.color || "primary"}
                      >
                        {action.icon}
                      </IconButton>
                    ))}
                  </TableCell>
                )}
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

export default GeneralTable;
