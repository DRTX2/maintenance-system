import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
} from "@mui/material";
import CustomTablePaginationActions from "../../generic/CustomTablePaginationActions";
import tableStyles from "../../generic/styles/TableStyles";
import { CircularProgress } from "@mui/material";

const ContentTable = ({
  data,
  isLoading,
  columns,
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
        No se han encontrado componentes.
      </div>
    );
  }

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
                      {(column.key, item[column.key])}
                    </TableCell>
                  ))}
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
