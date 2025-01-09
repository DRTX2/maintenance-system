// src/provider/MaintenancesContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/validations";
import axiosInstance from "../utils/api";

const MaintenancesContext = createContext();

export const MaintenancesProvider = ({ children }) => {
  const [maintenances, setMaintenances] = useState([]);
  const [isReady, setIsReady] = useState(false);

  const fetchMaintenances = async () => {
    try {
      const response = await axiosInstance.get("/maintenances");
      setMaintenances(response.data.results);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  useEffect(() => {
    fetchMaintenances();
    setIsReady(true);
  }, []);

  // Métodos CRUD para maintenances
  const addMaintenance = async (newMaintenance) => {
    console.log("Recibo esto", newMaintenance);
    try {
      const response = await axiosInstance.post(
        `/maintenance-detail`,
        newMaintenance
      );
      console.log("resultado nuevo", response.data);
      setMaintenances((prev) => [...prev, response.data.results]);
    } catch (error) {}
  };

  const updateMaintenance = async (updateMaintenance) => {
    console.log("que recibo edit", updateMaintenance);
    try {
      const response = await axiosInstance.put(
        `/maintenance-detail/${updateMaintenance.id_main}`,
        updateMaintenance
      );

      console.log("updating", response.data.results);
      console.log(maintenances);

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
