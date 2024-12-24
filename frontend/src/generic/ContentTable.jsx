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
import tableStyles from "./styles/TableStyles";
import dayjs from "dayjs";
import { getDecodedToken } from "../utils/authService";

const ContentTable = ({
  data,
  columns,
  onView,
  onDelete,
  currentPage,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
}) => {
  const decodedToken = getDecodedToken();
  const currentUserEmail = decodedToken.email;

  const transformedValue = (key, value) => {
    if (key === "est_inc") {
      return value === "O" ? "Abierto" : "Cerrado";
    }

    if (key === "date_inc") {
      return dayjs(value).utc().format("MM-DD-YYYY");
    }

    if (key === "is_ext") {
      return value === "Y" ? "Interno" : "Externo";
    }

    return value || "-";
  };

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
                    <TableCell key={column.key}>
                      {transformedValue(column.key, item[column.key])}
                    </TableCell>
                  ))}
                  <TableCell align="center">
                    <IconButton onClick={() => onView(item.id)} color="primary">
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => onDelete(item.id)}
                      color="secondary"
                      disabled={currentUserEmail === item.email}
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

export default ContentTable;
