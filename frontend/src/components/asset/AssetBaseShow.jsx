import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import AddIcon from "@mui/icons-material/Add";
import GenericStyles from "../../generic/styles/GenericStyles";
import SearchBar from "../../generic/SearchBar";
import AssetTableShow from "./AssetTableShow";
import axiosInstance from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import AssetCreate from "./AssetCreate";
import CreateStyles from "../../generic/styles/CreateStyles";

const AssetShow = ({ columns }) => {
  const [assets, setAssets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
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
      const response = await axiosInstance.get("/assets");
      setAssets(response.data);
    } catch (error) {
      toast.error("No se ha podido obtener los activos.");
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
      const response = axiosInstance.get(`/assets?search=${param}`);
      console.log(response);
    } catch (error) {
      toast.error("Ha ocurrido un error con la busqueda");
    }
  };

  const toggleCreate = async () => {
    setIsCreating((prev) => !prev);
    await fetchAssets();
  };

  const onView = (id) => {
    console.log(id);
  };

  const onDelete = (id) => {
    console.log("Eliminando...");
  };

  if (isCreating) {
    return (
      <>
        <AssetCreate />
        <Box
          width="90%"
          marginTop="20px"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            color="secondary"
            sx={CreateStyles.buttonStyle1}
            onClick={toggleCreate}
          >
            Cancelar
          </Button>
        </Box>
      </>
    );
  }

  return (
    <div
      className="flexColumnCenter"
      style={{ width: "90%", marginTop: "40px" }}
    >
      <Box className="flewColumnCenter">
        <Box
          className="flexRowCenterEnd"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <h2>Activos</h2>

          {/* Busqueda por search */}
          <SearchBar placeholder={`Buscar por código`} onSearch={onFetch} />

          {/* Boton para añadir */}
          <Button
            onClick={toggleCreate}
            variant="contained"
            sx={GenericStyles.buttonStyle}
            startIcon={<AddIcon />}
          >
            Agregar activo
          </Button>
        </Box>
      </Box>

      <Box className="flexColumnCenter" paddingTop="20px">
        <AssetTableShow
          isLoading={isLoading}
          data={assets}
          columns={columns}
          onView={onView}
          onDelete={onDelete}
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
