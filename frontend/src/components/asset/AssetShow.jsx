import React from "react";
import AssetBaseShow from "./AssetBaseShow";

const AssetShow = () => {
  const columns = [
    { key: "cod_ass", label: "Codigo", showInTable: true },
    { key: "ser_num_ass", label: "Número de serie", showInTable: true },
    { key: "location_code", label: "Ubicación", showInTable: true },
    { key: "income_code", label: "Ingreso", showInTable: true },
  ];

  return <AssetBaseShow columns={columns} />;
};

export default AssetShow;
