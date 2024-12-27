import AssetBaseCreate from "./AssetBaseCreate";
import axiosInstance from "../../utils/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { CircularProgress, Typography } from "@mui/material";

const AssetCreate = () => {
  const [locations, setLocations] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        const [locationsData, incomesData, categoriesData] = await Promise.all([
          axiosInstance.get("/locations"),
          axiosInstance.get("/assets/incomes/create"),
          axiosInstance.get("/categories"),
        ]);

        setLocations(locationsData.data.results);
        setIncomes(incomesData.data);
        setCategories(categoriesData.data.results);

        setIsReady(true);
      } catch (error) {
        toast.error("No se han podido obtener los datos.");
      }
    };
    fetchAllData();
  }, []);

  const resultsLocations =
    locations.length > 0
      ? locations.map((location) => ({
          value: location.id,
          label: location.nam_loc,
        }))
      : [{ value: "", label: "No se han encontrado ubicaciones..." }];

  const resultsIncomes =
    incomes.length > 0
      ? incomes.map((income) => ({
          value: income.id,
          label: income.cod_inc,
        }))
      : [{ value: "", label: "No se han encontrado ingresos..." }];

  const resultsCategories =
    categories.length > 0
      ? categories.map((category) => ({
          value: category.id,
          label: category.nom_dis,
        }))
      : [{ value: "", label: "No se han encontrado categorias..." }];

  const defaultState = {
    cod_ass: "",
    ser_num_ass: "",
    id_loc_ass: "",
    id_inc_ass: "",
    id_cat_ass: "",
    components: [],
  };

  const fields = [
    { key: "cod_ass", label: "Código", type: "text" },
    { key: "ser_num_ass", label: "Número de serie", type: "text" },
    {
      key: "id_loc_ass",
      label: "Ubicación",
      type: "select",
      options: resultsLocations,
    },
    {
      key: "id_inc_ass",
      label: "Ingreso",
      type: "select",
      options: resultsIncomes,
    },
    {
      key: "id_cat_ass",
      label: "Dispositivo",
      type: "select",
      options: resultsCategories,
    },
  ];

  const columns = [
    { key: "id", label: "Codigo", showInTable: false },
    { key: "nam_com", label: "Nombre", showInTable: true },
    { key: "des_com", label: "Descripción", showInTable: true },
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

  return (
    <AssetBaseCreate
      fields={fields}
      columns={columns}
      defaultState={defaultState}
    />
  );
};

export default AssetCreate;
