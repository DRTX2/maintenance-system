const tableStyles = {
  tableContainer: {
    overFlowX: "hidden",
    margin: "0 auto",
    maxWidth: "100%",
  },
  tableHead: {
    backgroundColor: "#424874", // Fondo del encabezado
    "& .MuiTableCell-root": {
      color: "#ffffff",
      fontWeight: "bold",
    },
  },
  pagination: {
    "& .MuiTablePagination-select": {
      color: "#424874", // Color del número
      fontWeight: "bold",
      fontSize: "14px",
    },
    "& .MuiTablePagination-selectIcon": {
      color: "#424874", // Color del icono desplegable
    },
  },
  labelRowsPerPage: {
    color: "#424874",
    fontWeight: "bold",
  },
};

export default tableStyles;
