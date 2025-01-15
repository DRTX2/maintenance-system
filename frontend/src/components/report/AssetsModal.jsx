import {
  TextField,
  Typography,
  MenuItem,
  Button,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
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
import tableStyles from "../../generic/styles/TableStyles";
import GenericTable from "../GenericTable";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import RadioButtonCheckedIcon from "@mui/icons-material/RadioButtonChecked";

const AssetsModal = (props) => {
  const [assetSelected, setAssetSelected] = useState("");
  const { data } = useDataContext();
  const { assets } = useAssetsContext();

  const handleAsset = (assetId) => {
    setAssetSelected(assetId);
  };

  const handleReport = async () => {
    if (!assetSelected) {
      toast.error("Debe seleccionar un activo.");
      return;
    }
    console.log(assetSelected);
    try {
      const response = await axiosInstance.post(
        "/report/maintenances-by-asset",
        { asset: assetSelected }
      );
      const results = response.data.results;
      console.log("restes", results);

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

      console.log("sdfds", updatedResults);
      generateAssetsPDF(updatedResults);
      // limpiar inputs
      setAssetSelected("");
    } catch (error) {
      console.log("probando", error.response);
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
          <Box sx={{ width: "100%" }}>
            {assets?.length > 0 ? (
              <>
                <GenericTable
                  data={assets}
                  dataCount={assets.length}
                  isDelete={false}
                  setIsDelete={() => {}}
                >
                  {(currentPageData) => (
                    <>
                      <TableHead sx={tableStyles.tableHead}>
                        <TableRow>
                          <TableCell>Código</TableCell>
                          <TableCell>Número de serie</TableCell>
                          <TableCell>{""}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {currentPageData.map((row) => (
                          <TableRow key={row.id}>
                            <TableCell>{row.cod_ass}</TableCell>
                            <TableCell>{row.ser_num_ass}</TableCell>
                            <TableCell>
                              <IconButton
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleAsset(row.id);
                                }}
                                color={
                                  row.id === assetSelected
                                    ? "primary"
                                    : "default"
                                }
                              >
                                {row.id === assetSelected ? (
                                  <RadioButtonCheckedIcon />
                                ) : (
                                  <RadioButtonUncheckedIcon />
                                )}
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </>
                  )}
                </GenericTable>
              </>
            ) : (
              <Typography>No se han encontrado datos.</Typography>
            )}
          </Box>
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
