import React, { createContext, useContext, useState, useEffect } from "react";
import axiosInstance from "../utils/api";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [data, setData] = useState({
    locations: [],
    categories: [],
  });

  useEffect(() => {
    const fetchAll = async () => {
      const [locations, categories] = await Promise.all([
        axiosInstance.get("/locations"),
        axiosInstance.get("/categories"),
      ]);

      setData({
        locations: locations.data.results,
        categories: categories.data.results,
      });
    };

    fetchAll();
  }, []);

  return <DataContext.Provider value={data}>{children}</DataContext.Provider>;
};

export const useData = () => useContext(DataContext);
