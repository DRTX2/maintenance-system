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
  console.log(array);

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
/*

import React from "react";
import GeneralTable from "./Table";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

const Example = () => {
  const data = [
    { id: 1, cod_dis: "A123", nom_dis: "Dispositivo 1", tip_dis: "Tipo A" },
    { id: 2, cod_dis: "B456", nom_dis: "Dispositivo 2", tip_dis: "Tipo B" },
    { id: 3, cod_dis: "C789", nom_dis: "Dispositivo 3", tip_dis: "Tipo C" },
  ];

  const columns = [
    { field: "cod_dis", label: "Código" },
    { field: "nom_dis", label: "Nombre" },
    { field: "tip_dis", label: "Tipo" },
  ];

  const actions = [
    {
      icon: <VisibilityIcon />,
      color: "primary",
      onClick: (id) => console.log("Ver", id),
    },
    {
      icon: <DeleteForeverIcon />,
      color: "secondary",
      onClick: (id) => console.log("Eliminar", id),
    },
  ];

  return (
    <GeneralTable
      data={data}
      columns={columns}
      actions={actions}
      currentPage={1}
      totalItems={data.length}
      setCurrentPage={(page) => console.log("Página actual:", page)}
      setRowsPerPage={(rows) => console.log("Filas por página:", rows)}
    />
  );
};

export default Example;


*/
