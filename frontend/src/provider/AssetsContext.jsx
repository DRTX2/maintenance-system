// src/provider/AssetsContext.js
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import { getDecodedToken } from "../utils/authService";
import { handleErrors } from "../utils/validations";
import axiosInstance from "../utils/api";

const role = getDecodedToken?.role;

const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchAssets();
    setIsReady(true);
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axiosInstance.get(`/assets/${role}`);
      setAssets(response.data);
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  // Métodos CRUD para assets
  const addAsset = async (newAsset) => {
    try {
      const response = await axiosInstance.post("/assets", { asset: newAsset });
      setAssets((prev) => [...prev, response.data.asset]);
    } catch (error) {
      if (error.response.data.errors) {
        const message = handleErrors(error.response.data.errors).join("\n");
        toast.error(message);
      } else {
        toast.error("No se ha podido crear el activo.");
      }
    }
  };

  const updateAsset = async (updatedAsset) => {
    try {
      const response = await axiosInstance.put(`/assets/${updatedAsset.id}`, {
        asset: updatedAsset,
      });
      setAssets((prev) =>
        prev.map((asset) =>
          asset.id === updatedAsset.id ? response.data.asset : asset
        )
      );

      console.log(response.data);
    } catch (error) {
      if (error.response.data.errors) {
        const message = handleErrors(error.response.data.errors).join("\n");
        toast.error(message);
      } else {
        toast.error("No se ha podido crear el activo.");
      }
    }
  };

  const deleteAsset = async (assetId) => {
    try {
      await axiosInstance.delete(`/assets/${assetId}`);
      setAssets((prev) => prev.filter((asset) => asset.id !== assetId));
    } catch (error) {
      console.error("Error deleting asset:", error);
    }
  };

  return (
    <AssetsContext.Provider
      value={{ assets, isReady, addAsset, updateAsset, deleteAsset }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

// Hook para acceder al contexto de assets
export const useAssetsContext = () => useContext(AssetsContext);
