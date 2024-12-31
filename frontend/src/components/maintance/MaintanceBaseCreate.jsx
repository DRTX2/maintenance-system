import React, { useState } from "react";
import {
  Box,
  Grid2,
  Typography,
  Button,
  Paper,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TextField,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

import { validateField } from "../../utils/validations";
import { toast } from "react-toastify";
import tableStyles from "../../generic/styles/TableStyles";
import DynamicField from "../../generic/DynamicField";
import AssetSelector from "./AssetSelector";
import ActivitiesModal from "./ActivitiesModal";

const MaintanceBaseCreate = ({ fields, columns, defaultState, assets }) => {
  const [entity, setEntity] = useState(defaultState);
  const [assetsTable, setAssetsTable] = useState([]);
  const [errors, setErrors] = useState({});
  const [openActivities, setOpenActivities] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFieldChange = (key, value) => {
    setEntity((prev) => ({ ...prev, [key]: value }));

    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMessage }));
  };

  // Tiene que haber seleccionado un tipo de mantenimiento antes de añadir algun activo.
  const handleAddAsset = (asset) => {
    if (assetsTable.some((row) => row.id === asset.id)) {
      toast.info("El activo ya ha sido agregado a la tabla.");
      return;
    }

    setAssetsTable((prev) => [
      ...prev,
      { ...asset, activities: "", observations: "", components: "" },
    ]);
  };
  const onOpenActivities = () => {
    setOpenActivities(true);
  };
  const onCloseActivities = () => setOpenActivities(false);

  const handleFetch = (key, value) => {
    console.log("Testing...");
  };

  return (
    <>
      <Typography
        variant="h6"
        color="#6068A5"
        marginBottom="20px"
        marginTop="20px"
        fontWeight="bold"
      >
        Crear mantenimiento
      </Typography>
      <Box p={3} border="1px solid #ddd" width="90%" borderRadius={2}>
        <Grid2 container spacing={3}>
          {fields.map((field) => (
            <Grid2 item size={{ xs: 12, md: 6 }} key={field.key}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {/* Título del campo */}
                <Typography
                  variant="subtitle1"
                  width="100%"
                  color="#6068A5"
                  fontWeight="bold"
                >
                  {field.label}
                </Typography>
                {/* Campo dinámico */}
                <DynamicField
                  key={field.key}
                  field={field}
                  value={entity[field.key]}
                  onChange={handleFieldChange}
                  onFetch={handleFetch}
                  onAdd={handleAddAsset}
                  error={errors[field.key]}
                  helperText={errors[field.key]}
                  readOnly={false}
                />
              </Box>
            </Grid2>
          ))}
          <AssetSelector options={assets} onAdd={handleAddAsset} />
        </Grid2>

        <Box marginTop="30px">
          {assetsTable.length > 0 ? (
            <TableContainer component={Paper} sx={tableStyles.tableContainer}>
              <Table>
                <TableHead sx={tableStyles.tableHead}>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Número de serie</TableCell>
                    <TableCell>Actividades</TableCell>
                    <TableCell>Observaciones</TableCell>
                    <TableCell>Componenes a reemplazar</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {assetsTable.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>{row.cod_ass}</TableCell>
                      <TableCell>{row.ser_num_ass}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={onOpenActivities}
                          arial-label="abrir"
                        >
                          <OpenInNewIcon />
                        </IconButton>
                      </TableCell>
                      <TableCell>Modal observaciones</TableCell>
                      <TableCell>Modal componentes</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          ) : null}
        </Box>
      </Box>

      <ActivitiesModal
        open={openActivities}
        onClose={onCloseActivities}
        catalog={[]}
      />
    </>
  );
};

export default MaintanceBaseCreate;
