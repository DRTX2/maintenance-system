import Asset from "./Asset";
import axiosInstance from "../../utils/api";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

const AssetManager = () => {
  const [locations, setLocations] = useState([]);
  const [incomes, setIncomes] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchLocation = async () => {
    try {
      const response = await axiosInstance.get("/locations");
      setLocations(response.data.results);
    } catch (error) {
      toast.error("No se ha podido obtener las ubicaciones.");
    }
  };
  const fetchIncomes = async () => {
    try {
      const response = await axiosInstance.get("/incomes");
      setIncomes(response.data.results);
    } catch (error) {
      toast.error("No se ha podido obtener los ingresos.");
    }
  };
  const fecthCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");
      setCategories(response.data.results);
    } catch (error) {
      toast.error("No se ha podido obtener las categorias.");
    }
  };

  useEffect(() => {
    fetchLocation();
    fetchIncomes();
    fecthCategories();
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
      label: "Tipo",
      type: "select",
      options: resultsCategories,
    },
  ];

  const columns = [
    { key: "id", label: "Codigo", showInTable: false },
    { key: "nam_com", label: "Nombre", showInTable: true },
    { key: "des_com", label: "Descripción", showInTable: true },
  ];

  return (
    <Asset fields={fields} columns={columns} defaultState={defaultState} />
  );
};

export default AssetManager;
