import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/api";
import { getDecodedToken } from "../utils/authService";

const role = getDecodedToken?.role;

// Crea el contexto
const DataContext = createContext();

// Proveedor de datos (DataProvider)
export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    assets: [],
    locations: [],
    incomes: [],
    categories: [],
  });
  const [isReady, setIsReady] = useState(false);

  const fetchAssets = async () => {
    const response = await axiosInstance.get(`/assets/${role}`);
    setData((prev) => ({ ...prev, assets: response.data }));
  };

  const fetchLocations = async () => {
    const response = await axiosInstance.get("/locations");
    setData((prev) => ({ ...prev, locations: response.data.results }));
  };

  const fetchIncomes = async () => {
    const response = await axiosInstance.get("/assets/incomes/create");
    setData((prev) => ({ ...prev, incomes: response.data }));
  };

  const fetchDevices = async () => {
    const response = await axiosInstance.get("/categories");
    setData((prev) => ({ ...prev, categories: response.data.results }));
  };

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        await Promise.all([
          fetchAssets(),
          fetchLocations(),
          fetchIncomes(),
          fetchDevices(),
        ]);
        setIsReady(true);
      } catch (error) {
        console.error("Error fetching initial data:", error);
      }
    };

    fetchInitialData();
  }, []);

  return (
    <DataContext.Provider value={{ data, isReady }}>
      {children}
    </DataContext.Provider>
  );
};

// Hook para acceder al contexto
export const useDataContext = () => useContext(DataContext);
