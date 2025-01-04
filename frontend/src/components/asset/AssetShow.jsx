import React from "react";
import AssetBaseShow from "./AssetBaseShow";
import { getDecodedToken } from "../../utils/authService";
import { useNavigate } from "react-router-dom";

const AssetShow = () => {
  const navigate = useNavigate();

  const decodedToken = getDecodedToken();
  if (!decodedToken) {
    return navigate("/");
  }

  const role = decodedToken.role;
  const columns = [
    { key: "cod_ass", label: "Codigo", showInTable: true },
    { key: "ser_num_ass", label: "Número de serie", showInTable: true },
    { key: "location_name", label: "Ubicación", showInTable: true },
    { key: "income_code", label: "Ingreso", showInTable: true },
    { key: "category_name", label: "Categoría", showInTable: true },
  ];

  return <AssetBaseShow columns={columns} role={role} />;
};

export default AssetShow;
