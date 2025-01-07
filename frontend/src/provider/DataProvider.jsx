import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../../utils/api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    locations: [],
    incomes: [],
    categories: [],
    devices: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      const [locations, incomes, categories, devices] = await Promise.all([
        axiosInstance.get("/locations"),
        axiosInstance.get("/incomes"),
        axiosInstance.get("/categories/types"),
        axiosInstance.get("/categories/names"),
      ]);

      setData({
        locations: locations.data.results,
        incomes: incomes.data.results,
        categories: categories.data,
        devices: devices.data,
      });
    };

    fetchAll();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
