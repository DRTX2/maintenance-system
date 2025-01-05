import React from "react";
import { CircularProgress } from "@mui/material";
import ContentTable from "./ContentTable";

const ContentGenericTable = ({
  isLoading,
  data,
  columns,
  onView,
  onDelete,
  currentPage,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  entityName,
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
        No hay {entityName} registrados.
      </div>
    );
  }

  return (
    <ContentTable
      data={data}
      columns={columns}
      onView={onView}
      onDelete={onDelete}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default ContentGenericTable;
