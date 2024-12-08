import React from "react";
import { Box, Button } from "@mui/material";

const CustomPaginationActions = ({
  count,
  page,
  rowsPerPage,
  onPageChange,
}) => {
  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  const totalPages = Math.ceil(count / rowsPerPage);

  return (
    <Box display="flex" alignItems="center">
      <Button
        size="small"
        onClick={handleBackButtonClick}
        disabled={page === 0}
        style={{
          textTransform: "none",
          color: page === 0 ? "#ccc" : "#1976d2",
          marginRight: "8px",
        }}
      >
        Anterior
      </Button>
      <Button
        size="small"
        onClick={handleNextButtonClick}
        disabled={page >= totalPages - 1}
        style={{
          textTransform: "none",
          color: page >= totalPages - 1 ? "#ccc" : "#1976d2",
        }}
      >
        Siguiente
      </Button>
    </Box>
  );
};

export default CustomPaginationActions;
