// src/provider/AssetsContext.js
import { createContext, useContext, useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { handleErrors } from "../utils/validations";
import axiosInstance from "../utils/api";

const AssetsContext = createContext();

export const AssetsProvider = ({ children }) => {
  const [assets, setAssets] = useState([]);
  const [isReady, setIsReady] = useState(false);
  const [term, setTerm] = useState(""); // Estado para el término de búsqueda
  const [filters, setFilters] = useState({
    locations: [],
    incomes: [],
    categories: [],
  });

  useEffect(() => {
    fetchAssets();
    setIsReady(true);
  }, []);

  console.log("nuevo", assets);

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

  // Filtrar activos por termino de busqueda
  const filterAssetsByTerm = (searchTerm) => {
    setTerm(searchTerm); // Actualizar el término de búsqueda
  };

  // Permite actualizar los filtros para buscar mas
  const updateFilters = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredAssets = useMemo(() => {
    let filtered = [...assets];

    // Si no hay filtros activos y no hay termino de busqueda, devolver todos los activos originales
    if (
      Object.keys(filters).every((key) => filters[key].length === 0) &&
      !term
    ) {
      return assets;
    }

    // Filtrar por termino de busqueda
    if (term) {
      const lowercasedTerm = term.toLowerCase();
      filtered = filtered.filter((asset) =>
        asset.ser_num_ass.toLowerCase().includes(lowercasedTerm)
      );
    }

    // Filtrar por ubicacion
    if (filters.locations.length > 0) {
      filtered = filtered.filter((asset) =>
        filters.locations.includes(asset.location_data.id)
      );
    }

    // Filtrar ingresos
    if (filters.incomes.length > 0) {
      filtered = filtered.filter((asset) =>
        filters.incomes.includes(asset.income_data.id)
      );
    }

    // Filtrar por categoria
    if (filters.categories.length > 0) {
      filtered = filtered.filter((asset) =>
        filters.categories.includes(asset.category_data.tip_dis)
      );
    }

    return filtered;
  }, [assets, term, filters]); // depende de: assets, term, filters

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
        filterAssetsByTerm,
        updateFilters,
        filteredAssets,
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
