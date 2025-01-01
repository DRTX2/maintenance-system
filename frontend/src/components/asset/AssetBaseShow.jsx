import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GenericStyles from "../../generic/styles/GenericStyles";
import SearchBar from "../../generic/SearchBar";
import AssetTableShow from "./AssetTableShow";
import AssetFilters from "../../generic/filters/AssetFilters";
import axiosInstance from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AssetShow = ({ columns, role }) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchAssets = async () => {
    try {
      const response = await axiosInstance.get(`/assets/${role}`);
      setAssets(response.data);
    } catch (error) {
      toast.error("No se ha podido obtener los activos.");
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAssetsFilter = async (filters = {}) => {
    setIsLoading(true);
    try {
      const response = await axiosInstance.post("/assets/filters", filters);
      setAssets(response.data);
    } catch (error) {
      toast.error("No se ha podido filtrar.");
    } finally {
      setIsLoading(false);
    }
  };

  const onFetch = async (param) => {
    if (param === "") {
      await fetchAssets();
      return;
    }

    try {
      const response = await axiosInstance.post(`/assets/search/${role}`, {
        term: param,
      });
      setAssets(response.data);
    } catch (error) {
      toast.error("Ha ocurrido un error con la busqueda");
    }
  };

  const toggleVisibility = async (id, currentState) => {
    try {
      const route =
        currentState === "V" ? `/assets/hide/${id}` : `/assets/visible/${id}`;

      await axiosInstance.put(route);

      setAssets((prevAssets) =>
        prevAssets.map((asset) =>
          asset.id === id
            ? { ...asset, est_ass: currentState === "V" ? "H" : "V" }
            : asset
        )
      );

      toast.success(
        currentState === "V"
          ? "Activo ocultado con éxito."
          : "Activo mostrado con éxito."
      );
    } catch (error) {
      toast.error("Ha ocurrido un error al cambiar la visibilidad");
    }
  };

  // 2. El padre es notifiacdo.
  const handleFilterChange = async (updatedFilters) => {
    console.log("Updated", updatedFilters);
    if (!updatedFilters) {
      toast.error("Filtros no definidos");
      return;
    }

    const isFilterEmpty = Object.values(updatedFilters).every(
      (filter) => !filter || Object.values(filter).every((value) => !value)
    );

    if (isFilterEmpty) {
      toast.info(
        "No se han encontrado filtros aplicados, recargando activos..."
      );
      await fetchAssets();
      return;
    }

    const cleanedData = buildFilterPayload(updatedFilters);
    await fetchAssetsFilter(cleanedData);
  };

  const processFilter = (filter) => {
    if (!filter) return [];

    return Object.keys(filter)
      .filter((key) => filter[key])
      .map((key) => (isNaN(key) ? key : parseInt(key, 10)));
  };

  const buildFilterPayload = (selectedValues) => {
    const payload = {
      location: processFilter(selectedValues.locations),
      income: processFilter(selectedValues.incomes),
      type: processFilter(selectedValues.categories),
      device: processFilter(selectedValues.devices),
      status: processFilter(selectedValues.status),
      rol: role,
    };
    return payload;
  };

  const onCreate = () => {
    navigate("/dashboard/assets/create");
  };

  const onView = async (id) => {
    navigate(`/dashboard/assets/view/${id}`);
  };

  return (
    <div
      className="flexColumnCenter"
      style={{ width: "90%", marginTop: "40px" }}
    >
      <Box className="flewColumnCenter">
        <Box
          className="flexRowCenterEnd"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {/* Fila 1 */}
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h2 style={{ marginRight: "20px" }}>Activos</h2>

            <Button
              onClick={onCreate}
              variant="contained"
              sx={GenericStyles.buttonStyle}
              startIcon={<AddIcon />}
            >
              Agregar activo
            </Button>
          </Box>

          {/* Fila 2 */}
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: "16px",
            }}
          >
            <SearchBar
              placeholder={`Buscar por número de serie`}
              onSearch={onFetch}
            />

            {/* Filtros */}
            <AssetFilters
              onFilterChange={handleFilterChange}
              onClear={fetchAssets}
            />
          </Box>
        </Box>
      </Box>

      <Box className="flexColumnCenter" paddingTop="20px">
        <AssetTableShow
          isLoading={isLoading}
          data={assets}
          columns={columns}
          onView={onView}
          onDelete={toggleVisibility}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Box>
    </div>
  );
};

export default AssetShow;
