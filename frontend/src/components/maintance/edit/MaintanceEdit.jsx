import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { getDecodedToken } from "../../../utils/authService";
import MaintanceBaseEdit from "./MaintanceBaseEdit";
import axiosInstance from "../../../utils/api";
import dayjs from "dayjs";

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
          axiosInstance.get(`/assets/${rol}`),
          axiosInstance.get(`/maintenances/${id}`),
        ]);

        console.log("mantenimiento", maintance.data.results);
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

  console.log("main", maintance);

  const formattedData = {
    id_main: maintance.id_main,
    cod_main: maintance.cod_main || "N/A",
    typ_main: maintance?.typ_main_name || "Tipo no definido",
    created_at:
      dayjs(maintance.created_at).utc().format("MM-DD-YYYY") || "Sin fecha",
    ended_at:
      dayjs(maintance.ended_at).utc().format("MM-DD-YYYY") || "Sin fecha",
    dni_res_main: maintance.dni_res_main,
    id_typ_main: maintance.id_typ_main,
    assets:
      maintance?.details.map((detail) => ({
        ...detail.asset,
        id_det_main: detail.id_det_main,
        activities: detail.asset.activities || [],
        observations: detail.asset.observations || [],
        replaced_components: detail.asset.replaced_components || [],
      })) || [],
  };

  console.log("formated", formattedData);

  return (
    <MaintanceBaseEdit
      maintance={formattedData}
      fields={fields}
      assets={assets}
    />
  );
};

export default MaintanceEdit;
