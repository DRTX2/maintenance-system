// src/provider/AssetsContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/validations";
import axiosInstance from "../utils/api";

const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    fetchAssets();
    setIsReady(true);
  }, []);

  // Activos visibles derivados de `assets`
  const visibleAssets = useMemo(() => {
    return assets.filter((asset) => asset.est_ass !== "H");
  }, [assets]);

  const fetchAssets = async () => {
    try {
      const response = await axiosInstance.get(`/assets`);
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

  const deleteAsset = async (assetId, currentState) => {
    const apiRoute =
      currentState === "H"
        ? `assets/visible/${assetId}`
        : `/assets/hide/${assetId}`;

    try {
      const response = await axiosInstance.put(apiRoute);
      console.log(response.data);
      setAssets((prev) =>
        prev.map((asset) => (asset.id === assetId ? response.data : asset))
      );
      toast.success("Visibilidad cambiada con éxito");
    } catch (error) {
      toast.error("Error deleting asset:", error.response);
    }
  };

  return (
    <AssetsContext.Provider
      value={{
        assets,
        isReady,
        visibleAssets,
        addAsset,
        updateAsset,
        deleteAsset,
      }}
    >
      {children}
    </AssetsContext.Provider>
  );
};

// Hook para acceder al contexto de assets
export const useAssetsContext = () => useContext(AssetsContext);
