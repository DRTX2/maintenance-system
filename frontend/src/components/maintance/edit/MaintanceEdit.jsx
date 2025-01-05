import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { getDecodedToken } from "../../../utils/authService";
import MaintanceBaseEdit from "./MaintanceBaseEdit";
import axiosInstance from "../../../utils/api";

const MaintanceEdit = () => {
  const { id } = useParams();
  const rol = getDecodedToken()?.role;
  const [types, setTypes] = useState([]);
  const [responsibles, setResponsibles] = useState([]);
  const [assets, setAssets] = useState([]);
  const [maintance, setMaintance] = useState();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [types, responsibles, assets, maintance] = await Promise.all([
          axiosInstance.get("/type-maintenance"),
          axiosInstance.get("/responsibles"),
          // Simplemente todos los activos visibles
          axiosInstance.get(`/assetsForMaintances`),
          axiosInstance.get(`/maintenances/${id}`),
        ]);

        setTypes(types.data.results);
        setResponsibles(responsibles.data.results);
        setAssets(assets.data);
        setMaintance(maintance.data.results);
        setIsReady(true);
      } catch (error) {
        toast.error("No se ha podido obtener los datos.");
      }
    };
    fetchAllData();
  }, []);

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
      key: "id_typ_main",
      label: "Tipo de mantenimiento",
      type: "select",
      options: resultsTypes,
    },
    {
      key: "created_at",
      label: "Fecha de inicio",
      type: "date",
    },
    {
      key: "ended_at",
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

  if (!isReady) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
        <Typography variant="subtitle1" sx={{ marginTop: "10px" }}>
          Cargando datos, por favor espera...
        </Typography>
      </div>
    );
  }

  const formattedMaintance = {
    cod_main: maintance.cod_main,
    created_at: maintance.created_at,
    dni_res_main: maintance.dni_res_main,
    ended_at: maintance.ended_at,
    id_main: maintance.id_main,
    id_typ_main: maintance.id_typ_main,
    is_ext: maintance.is_ext,
    responsible_name: maintance.responsible_name,
    typ_main_name: maintance.typ_main_name,
    vis_main: maintance.vis_main,
    assets: maintance.details,
  };

  return (
    <MaintanceBaseEdit
      maintance={formattedMaintance}
      fields={fields}
      assets={assets}
    />
  );
};

export default MaintanceEdit;
