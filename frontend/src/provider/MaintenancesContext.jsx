// src/provider/MaintenancesContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/validations";
import axiosInstance from "../utils/api";

const MaintenancesContext = createContext();

export const MaintenancesProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchMaintenances();
    setIsReady(true);
  }, []);

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
    try {
      const response = await axiosInstance.post(
        `/maintenance-detail`,
        newMaintenance
      );
      setMaintenances((prev) => [...prev, response.data.results]);
    } catch (error) {}
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
