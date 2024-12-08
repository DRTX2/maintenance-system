import React from "react";
import { CircularProgress } from "@mui/material";
import GeneralTable from '../Table/Table.jsx';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";

import '../Table/Table.css';
import "../Form.css";


const PageContent = ({
  isLoading,
  data,
  onSee,
  onDelete,
  currentPage,
  totalItems,
  setCurrentPage,
  setRowsPerPage,
  columns
}) => {
  if (isLoading) {
    return (
      <div className="data-state">
        <CircularProgress />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="data-state">
        No hay datos disponibles.
      </div>
    );
  }

  if (!Array.isArray(data)) {
    return (
      <div className="data-state">
        Error: los datos no son validos.
      </div>
    );
  }

  const actions = [
    {
      icon: <VisibilityIcon />,
      color: "primary",
      onClick: onSee,
    },
    {
      icon: <DeleteForeverIcon />,
      color: "secondary",
      onClick: onDelete,
    },
  ];
  console.log(actions);

  return (
    <GeneralTable
      array={data}
      columns={columns}
      actions={actions}
      currentPage={currentPage}
      totalItems={totalItems}
      setCurrentPage={setCurrentPage}
      setRowsPerPage={setRowsPerPage}
    />
  );
};

export default PageContent;
