// src/provider/MaintenancesContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/validations";
import axiosInstance from "../utils/api";

const MaintenancesContext = createContext();

export const MaintenancesProvider = ({ children }) => {
  const [isReady, setIsReady] = useState(false);
  const [maintenances, setMaintenances] = useState([]);
  const [term, setTerm] = useState("");
  const [filters, setFilters] = useState({
    types: [],
    responsibles: [],
    assets: [],
  });

  console.log("mantenimientos", maintenances);

  useEffect(() => {
    fetchMaintenances();
    setIsReady(true);
  }, []);

  // Filtro para el search
  const filterMaintenancesByTerm = (searchTerm) => {
    setTerm(searchTerm);
  };

  // Establecer los filtros
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredMaintenances = useMemo(() => {
    let filtered = [...maintenances];

    // Si no hay filtros mantenimientos y no hay termino de busqueda, devolver todos los mantenimientos originales
    if (
      Object.keys(filters).every((key) => filters[key].length === 0) &&
      !term
    ) {
      return maintenances;
    }

    // Filtrar por busqueda
    if (term) {
      const lowercasedTerm = term.toLocaleLowerCase();
      filtered = filtered.filter((maintenance) =>
        maintenance.cod_main.toLocaleLowerCase().includes(lowercasedTerm)
      );
    }

    // Filtrar por tipos
    if (filters.types.length > 0) {
      filtered = filtered.filter((maintenance) =>
        filters.types.includes(maintenance.type_data.id)
      );
    }

    // Filtrar por responsables
    if (filters.responsibles.length > 0) {
      filtered = filtered.filter((maintenance) =>
        filters.responsibles.includes(maintenance.responsable_data.dni_res)
      );
    }

    // Filtrar por activos
    if (filters.assets.length > 0) {
      filtered = filtered.filter((maintenance) =>
        maintenance.assets.some((id) => filters.assets.includes(id))
      );
    }

    return filtered;
  }, [maintenances, term, filters]);

  const fetchMaintenances = async () => {
    try {
      const response = await axiosInstance.get("/maintenances");
      setMaintenances(response.data.results);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Métodos CRUD para maintenances
  const addMaintenance = async (newMaintenance) => {
    console.log("Creandi", newMaintenance);
    try {
      const response = await axiosInstance.post(
        `/maintenance-detail`,
        newMaintenance
      );

      setMaintenances((prev) => [...prev, response.data.results]);
    } catch (error) {
      console.log("error");
      console.log(error.response);
    }
  };

  const updateMaintenance = async (updateMaintenance) => {
    console.log("Enviando", updateMaintenance);

    try {
      const response = await axiosInstance.put(
        `/maintenance-detail/${updateMaintenance.id_main}`,
        updateMaintenance
      );

      console.log(response.data.results);

      setMaintenances((prev) =>
        prev.map((maintenance) =>
          maintenance.id === updateMaintenance.id_main
            ? response.data.results
            : maintenance
        )
      );
    } catch (error) {}
  };

  const deleteMaintenance = async (maintenanceId) => {
    try {
      await axiosInstance.delete(``);
      setMaintenances((prev) =>
        prev.filter((maintenance) => maintenance.id !== maintenanceId)
      );
    } catch (error) {}
  };

  return (
    <MaintenancesContext.Provider
      value={{
        maintenances,
        filterMaintenancesByTerm,
        updateFilters,
        filteredMaintenances,
        isReady,
        addMaintenance,
        updateMaintenance,
        deleteMaintenance,
      }}
    >
      {children}
    </MaintenancesContext.Provider>
  );
};

// Hook para acceder al contexto de assets
export const useMaintenancesContext = () => useContext(MaintenancesContext);
