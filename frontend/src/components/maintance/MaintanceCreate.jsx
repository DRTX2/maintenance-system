import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/api";
import MaintanceBaseCreate from "./MaintanceBaseCreate";
import { getDecodedToken } from "../../utils/authService";
import { toast } from "react-toastify";

const MaintanceCreate = () => {
  const [types, setTypes] = useState([]);
  const [responsibles, setResponsibles] = useState([]);
  const [assets, setAssets] = useState([]);
  const rol = getDecodedToken()?.role;

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [types, responsibles, assets] = await Promise.all([
          axiosInstance.get("/type-maintenance"),
          axiosInstance.get("/responsibles"),
          axiosInstance.get(`/assets/${rol}`),
        ]);

        setTypes(types.data.results);
        setResponsibles(responsibles.data.results);
        setAssets(assets.data);
      } catch (error) {
        toast.error("No se ha podido obtener los datos.");
      }
    };

    fetchAllData();
  }, [rol]);

  const resultsTypes =
    types.length > 0
      ? types.map((type) => ({
          value: type.id,
          label: type.typ_main,
        }))
      : [{ key: "", label: "No se han encontrado tipos de mantenimiento..." }];

  const resultsResponsibles =
    responsibles.length > 0
      ? responsibles.map((responsible) => ({
          value: responsible.dni_res,
          label: `${responsible.dni_res} - ${responsible.nam_res} (${responsible.is_ext === "Y" ? "Interno" : "Externo"})`,
        }))
      : [{ key: "", label: "No se han encontrado responsables..." }];

  const fields = [
    { key: "cod_main", label: "Código", type: "text" },
    {
      key: "typ_main",
      label: "Tipo de mantenimiento",
      type: "select",
      options: resultsTypes,
    },
    {
      key: "fec_ini_main",
      label: "Fecha de inicio",
      type: "date",
    },
    {
      key: "fec_fin_main",
      label: "Fecha fin",
      type: "date",
    },
    {
      key: "dni_res_main",
      label: "Responsable",
      type: "select",
      options: resultsResponsibles,
    },
  ];

  const columns = [
    { key: "id", label: "Codigo", showInTable: false },
    { key: "nam_com", label: "Nombre", showInTable: true },
    { key: "des_com", label: "Descripción", showInTable: true },
  ];

  const defaultState = {
    cod_main: "",
    typ_main: "",
    created_at: "",
    ended_at: "",
    dni_res_main: "",
  };

  return (
    <MaintanceBaseCreate
      fields={fields}
      columns={columns}
      defaultState={defaultState}
      assets={assets}
    />
  );
};

export default MaintanceCreate;
