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
import { CircularProgress } from "@mui/material";
import tableStyles from "../../generic/styles/TableStyles";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CustomTablePaginationActions from "../../generic/CustomTablePaginationActions";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getDecodedToken } from "../../utils/authService";
import Tooltip from "@mui/material/Tooltip";

const AssetTableShow = ({
  isLoading,
  data,
  columns,
  onView,
  onDelete,
  currentPage,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  console.log("The data is", data);
  if (!Array.isArray(data)) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        Error: los datos no son validos.
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No hay activos registrados.
      </div>
    );
  }

  // Verificando el rol del usuario.
  const decodedToken = getDecodedToken();
  const role = decodedToken?.role;

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
              {columns.map((column) => (
                <TableCell key={column.key}>{column.label}</TableCell>
              ))}
              <TableCell align="center">Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(
                currentPage * rowsPerPage,
                currentPage * rowsPerPage + rowsPerPage
              )
              .map((item) => (
                <TableRow key={item.id}>
                  {columns.map((column) => (
                    <TableCell key={column.key}>{item[column.key]}</TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton onClick={() => onView(item.id)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    {role === "admin" ? (
                      <IconButton
                        onClick={() => onDelete(item.id, item.est_ass)}
                        color={item.est_ass === "V" ? "secondary" : "sucess"}
                      >
                        {item.est_ass === "V" ? (
                          <Tooltip title="Ocultar">
                            <VisibilityOffIcon />
                          </Tooltip>
                        ) : (
                          <Tooltip title="Mostrar">
                            <VisibilityIcon />
                          </Tooltip>
                        )}
                      </IconButton>
                    ) : null}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={data.length}
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
    </>
  );
};

export default AssetTableShow;
