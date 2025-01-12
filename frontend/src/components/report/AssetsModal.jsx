import { TextField, Typography, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { generateErrorMessage } from "../../utils/validations";
import axiosInstance from "../../utils/api";
import { toast } from "react-toastify";
import BaseModal from "./BaseModal";
import GeneralWrapper from "./GeneralWrapper";
import ModalWrapper from "./ModalWrapper";
import generateAssetsPDF from "./generateAssetsPDF";

const AssetsModal = (props) => {
  const [assets, setAssets] = useState([]);
  const [error, setError] = useState("");
  const [assetSelected, setAssetSelected] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/assets/all");
        setAssets(response.data);
      } catch (error) {
        if (error.response.data.errors) {
          const message = generateErrorMessage(error.response.data.errors);
          toast.error(message);
        } else {
          toast.error("Error inesperado al obtener activos");
        }
      }
    };

    fetchData();
  }, []);

  if (!assets) {
    return null;
  }

  const renderAssets = () =>
    assets.length > 0 ? (
      assets.map((asset) => (
        <MenuItem key={asset.id} value={asset.id}>
          {`${asset.cod_ass} - ${asset.ser_num_ass}`}
        </MenuItem>
      ))
    ) : (
      <MenuItem>No se han encontrado activos</MenuItem>
    );

  const handleAsset = (assetId) => {
    setAssetSelected(assetId);
    setError("");
  };

  const handleReport = async () => {
    if (!assetSelected) {
      setError("Debe seleccionar un activo.");
      return;
    }

    try {
      const response = await axiosInstance.post(
        `/report/maintenances-by-asset`,
        {
          asset: assetSelected,
        }
      );
      generateAssetsPDF(response.data.results);
    } catch (error) {
      toast.error("No se ha podido obtener el activo");
    }
  };

  return (
    <BaseModal
      open={props.open}
      handleClose={props.handleClose}
      label={"Histórico de activos"}
    >
      <GeneralWrapper>
        <ModalWrapper>
          <Typography>Activo</Typography>
          <TextField
            select
            label="Seleccione algún activo"
            value={assetSelected || ""}
            onChange={(e) => handleAsset(e.target.value)}
            sx={{ width: "50%" }}
            error={!!error}
            helperText={error}
          >
            {renderAssets()}
          </TextField>
        </ModalWrapper>
        <ModalWrapper>
          <Button variant="contained" onClick={handleReport}>
            Generar reporte
          </Button>
        </ModalWrapper>
      </GeneralWrapper>
    </BaseModal>
  );
};

export default AssetsModal;
