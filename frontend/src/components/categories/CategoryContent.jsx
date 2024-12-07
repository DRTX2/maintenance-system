import React from "react";
import { CircularProgress } from "@mui/material";
import CategoryTable from "./CategoryTable";

const CategoryContent = ({ isLoading, categories, onSee, onDelete }) => {
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

  return <CategoryTable array={categories} onSee={onSee} onDelete={onDelete} />;
};

export default CategoryContent;
