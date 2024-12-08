import React from "react";
import { Typography } from "@mui/material";

const CategoryHeader = () => {
  return (
    <>
      <Typography
        variant="h4"
        component="h1"
        align="center"
        color="primary"
        gutterBottom
      >
        Categorias disponibles
      </Typography>
    </>
  );
};

export default CategoryHeader;
