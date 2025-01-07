import { useState, useEffect } from "react";
import Filters from "./Filters";
import axiosInstance from "../../utils/api";

const MaintanceFilters = ({ onFilterChange, onClear }) => {
  const [typeMaintance, setTypeMaintance] = useState([]);
  const [responsibles, setResponsible] = useState([]);
  const [assets, setAssets] = useState([]);

  useEffect(() => {
    const fetchAll = async () => {
      const [typeMaintances, responsibles, assets] = await Promise.all([
        axiosInstance.get("/type-maintenance"),
        axiosInstance.get("/responsibles"),
        axiosInstance.get("/maintenance-detail"),
      ]);
      setTypeMaintance(typeMaintances.data.results);
      setResponsible(responsibles.data.results);
      setAssets(assets.data.results);
      console.log(assets.data.results);
    };

    fetchAll();
  }, []);

  const resultsTypeMaintances =
    typeMaintance.length > 0
      ? typeMaintance.map((type) => ({
          key: type.id,
          label: type.typ_main,
        }))
      : [{ key: "", label: "No se han encontrado tipos de mantenimiento" }];

  const resultsResponsibles =
    responsibles.length > 0
      ? responsibles.map((responsible) => ({
          key: `${responsible.dni_res}`,
          label: `${responsible.dni_res} - ${responsible.nam_res}`,
        }))
      : [{ key: "", label: "No se han encontrado responsables" }];

  const resultsAssets =
    assets.length > 0
      ? assets.map((item) => ({
          key: item.asset.id,
          label: item.asset.cod_ass,
        }))
      : [{ key: "", label: "No se han encontrado activos en mantenimientos." }];

  const data = [
    {
      key: "types",
      label: "Tipos de mantenimiento",
      options: resultsTypeMaintances,
    },
    {
      key: "responsibles",
      label: "Responsables",
      options: resultsResponsibles,
    },
    {
      key: "assets",
      label: "Activos en mantenimientos",
      options: resultsAssets,
    },
  ];

  return (
    <Filters data={data} onFilterChange={onFilterChange} onClear={onClear} />
  );
};

export default MaintanceFilters;
