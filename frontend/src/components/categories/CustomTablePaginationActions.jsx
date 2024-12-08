import { Button } from "@mui/material";
import categoryStyles from "./CategoryStyles";

const CustomTablePaginationActions = (props) => {
  const { count, page, rowsPerPage, onPageChange } = props;

  const handleBackButtonClick = (event) => {
    onPageChange(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onPageChange(event, page + 1);
  };

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <button
        onClick={handleBackButtonClick}
        disabled={page === 0}
        style={{
          backgroundColor: page === 0 ? "#8d91af" : "#6a71a5",
          color: "#fff",
        }}
      >
        Anterior
      </button>

      <button
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        style={{
          backgroundColor:
            page >= Math.ceil(count / rowsPerPage) - 1 ? "#8d91af" : "#6a71a5",
          color: "#fff",
        }}
      >
        Siguiente
      </button>
    </div>
  );
};

export default CustomTablePaginationActions;
