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
    dates: { startDate: null, endDate: null },
  });

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

    // filtrar por fecha
    if (filters.dates.startDate && filters.dates.endDate) {
      const startDate = new Date(filters.dates.startDate);
      const endDate = new Date(filters.dates.endDate);

      console.log("Fecha de inicio", startDate);
      console.log("Fecha fin", endDate);

      filtered = filtered.filter((maintenance) => {
        const createdAt = new Date(maintenance.created_at);
        const endedAt = new Date(maintenance.ended_at);

        console.log("Creado", createdAt);
        console.log("Terminado", endedAt);

        // Compara si las fechas de creación o fin están dentro del rango
        return (
          (createdAt >= startDate && createdAt <= endDate) ||
          (endedAt >= startDate && endedAt <= endDate)
        );
      });
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
      toast.error("Ocurrio un error al crear el mantenimiento.");
    }
  };

  const updateMaintenance = async (updateMaintenance) => {
    console.log("Enviando", updateMaintenance);

    try {
      const response = await axiosInstance.put(
        `/maintenance-detail/${updateMaintenance.id_main}`,
        updateMaintenance
      );
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
        filters,
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
