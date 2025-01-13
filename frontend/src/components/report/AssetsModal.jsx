import { TextField, Typography, MenuItem, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { generateErrorMessage } from "../../utils/validations";
import axiosInstance from "../../utils/api";
import { toast } from "react-toastify";
import BaseModal from "./BaseModal";
import GeneralWrapper from "./GeneralWrapper";
import ModalWrapper from "./ModalWrapper";
import generateAssetsPDF from "./generateAssetsPDF";
import { useDataContext } from "./../../provider/DataContext";
import { useAssetsContext } from "../../provider/AssetsContext";

const AssetsModal = (props) => {
  const [error, setError] = useState("");
  const [assetSelected, setAssetSelected] = useState("");
  const { data } = useDataContext();
  const { assets } = useAssetsContext();

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
    console.log(assetSelected);
    try {
      const response = await axiosInstance.post(
        "/report/maintenances-by-asset",
        { asset: assetSelected }
      );
      const results = response.data.results;
      console.log(results);

      const updatedResults = results.map((result) => {
        // Buscamos el responsable correspondiente en 'data.responsibles' usando el nombre completo
        const responsible = data?.responsibles.find(
          (responsible) =>
            responsible.nam_res + " " + responsible.las_res ===
            result.responsable
        );

        // Si encontramos al responsable, añadimos la cédula
        if (responsible) {
          result.dni_res = responsible.dni_res;
        }

        return result;
      });

      generateAssetsPDF(updatedResults);
    } catch (error) {
      console.log(error);
      if (error.response?.data?.errors) {
        toast.error("No se pudo obtener el reporte");
      } else {
        toast.error("Error inesperado al obtener activos.");
      }
    }

    console.log("Sending", assetSelected);
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
