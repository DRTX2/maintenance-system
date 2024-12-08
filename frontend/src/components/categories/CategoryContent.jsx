import React from "react";
import { CircularProgress } from "@mui/material";
import CategoryTable from "./CategoryTable";

const CategoryContent = ({
  isLoading,
  categories,
  onSee,
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

  if (categories.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        No hay datos disponibles.
      </div>
    );
  }

  if (!Array.isArray(categories)) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        Error: los datos no son validos.
      </div>
    );
  }

  return (
    <CategoryTable
      array={categories}
      onSee={onSee}
      onDelete={onDelete}
      currentPage={currentPage}
      rowsPerPage={rowsPerPage}
      handleChangePage={handleChangePage}
      handleChangeRowsPerPage={handleChangeRowsPerPage}
    />
  );
};

export default CategoryContent;
