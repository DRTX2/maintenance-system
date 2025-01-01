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
  TablePagination,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";

import { validateField } from "../../utils/validations";
import { toast } from "react-toastify";

import axiosInstance from "../../utils/api";

import tableStyles from "../../generic/styles/TableStyles";
import DynamicField from "../../generic/DynamicField";
import AssetSelector from "./AssetSelector";
import ActivitiesModal from "./ActivitiesModal";
import ObservationsModal from "./ObservationsModal";
import ComponentsModal from "./ComponentsModal";
import CreateStyles from "../../generic/styles/CreateStyles";
import CustomTablePaginationActions from "../../generic/CustomTablePaginationActions";
import { useNavigate } from "react-router-dom";

const MaintanceBaseCreate = ({ fields, columns, defaultState, assets }) => {
  const [entity, setEntity] = useState(defaultState);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [assetsTable, setAssetsTable] = useState([]);
  const [errors, setErrors] = useState({});
  const [activitiesCatalog, setActivitiesCatalog] = useState([]);
  const [componentsCatalog, setComponentsCatalog] = useState([]);
  const [openActivities, setOpenActivities] = useState(false);
  const [openObservations, setOpenObservations] = useState(false);
  const [openComponents, setOpenComponents] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFieldChange = (key, value) => {
    setEntity((prev) => ({ ...prev, [key]: value }));
    console.log(key, value);
    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMessage }));
  };

  const handleAddAsset = (asset) => {
    // Tiene que haber seleccionado un tipo de mantenimiento antes de añadir algun activo.
    if (!entity.id_typ_main) {
      toast.info(
        "Debe seleccionar un tipo de mantenimiento antes de añadir un activo."
      );
      return;
    }

    if (assetsTable.some((row) => row.id === asset.id)) {
      toast.info("El activo ya ha sido agregado a la tabla.");
      return;
    }

    setAssetsTable((prev) => [
      ...prev,
      { ...asset, activities: [], observations: [], components: [] },
    ]);
  };

  // Actividades
  const onOpenActivities = async (assetId) => {
    // Si ya añadio un tipo de mantenimiento, cargar las actividades de ese mantenimiento.
    try {
      const id = entity.id_typ_main;
      const response = await axiosInstance.get(`/type-maintenance/${id}`);
      setActivitiesCatalog(response.data.results.activities);
      const asset = assetsTable.find((item) => item.id === assetId);
      setCurrentAsset(asset);
      setOpenActivities(true);
    } catch (error) {
      toast.error("No se ha podido obtener las actividades.");
    }
  };

  const onSaveActivities = (activityList) => {
    setAssetsTable((prev) =>
      prev.map((asset) =>
        asset.id === currentAsset.id
          ? { ...asset, activities: activityList }
          : asset
      )
    );
    setOpenActivities(false);
  };

  // Observaciones
  const onOpenObservations = (assetId) => {
    const asset = assetsTable.find((item) => item.id === assetId);
    setCurrentAsset(asset);
    setOpenObservations(true);
  };

  const onSaveObservations = (observationsList) => {
    setAssetsTable((prev) =>
      prev.map((asset) =>
        asset.id === currentAsset.id
          ? { ...asset, observations: observationsList }
          : asset
      )
    );
    setOpenObservations(false);
  };

  // Componentes
  const onOpenComponents = async (id) => {
    // Cargar los datos del catalogo de activo seleccionado.
    try {
      const response = await axiosInstance.get(`/assets/show/${id}`);
      setComponentsCatalog(response.data.components);
      console.log("Compnnes", response.data.components);
      const asset = assetsTable.find((item) => item.id === id);
      setCurrentAsset(asset);
      setOpenComponents(true);
    } catch (error) {
      toast.error("No se ha podido obtener los componentes.");
    }
  };

  const onSaveComponents = (componentsList) => {
    setAssetsTable((prev) =>
      prev.map((asset) =>
        asset.id === currentAsset.id
          ? { ...asset, components: componentsList }
          : asset
      )
    );

    setOpenComponents(false);
  };

  // Botones de cerrar
  const onCloseActivities = () => setOpenActivities(false);
  const onCloseObservations = () => setOpenObservations(false);
  const onCloseComponents = () => setOpenComponents(false);

  // Acciones para la api
  const handleFetch = (key, value) => {
    console.log("Testing...");
  };

  const handleReturn = () => {
    navigate("/dashboard/maintance");
  };

  const handleCreate = async () => {
    console.log("El objeto a enviarse es:", entity);
    console.log("Lo que hay en la tabla es:", assetsTable);
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
            <>
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
                          {row.activities.length} {" Actividades"}
                          <IconButton
                            onClick={() => onOpenActivities(row.id)}
                            arial-label="abrir"
                          >
                            <PlaylistAddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {row.observations.length} {" Observaciones"}
                          <IconButton
                            onClick={() => onOpenObservations(row.id)}
                            arial-label="abrir"
                          >
                            <PlaylistAddIcon />
                          </IconButton>
                        </TableCell>
                        <TableCell>
                          {row.components.length} {" Componentes"}
                          <IconButton
                            onClick={() => onOpenComponents(row.id)}
                            arial-label="abrir"
                          >
                            <PlaylistAddIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
              <TablePagination
                component="div"
                count={assetsTable.length}
                page={currentPage}
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={[3, 5]}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                labelRowsPerPage={
                  <span style={tableStyles.labelRowsPerPage}>
                    Filas por página
                  </span>
                }
                labelDisplayedRows={() => ""}
                ActionsComponent={(props) => (
                  <CustomTablePaginationActions {...props} />
                )}
                sx={tableStyles.pagination}
              />
            </>
          ) : null}
        </Box>

        <Box
          width="90%"
          marginTop="20px"
          display="flex"
          justifyContent="flex-end"
        >
          <Button
            color="primary"
            sx={CreateStyles.buttonStyle2}
            onClick={handleReturn}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            sx={CreateStyles.buttonStyle2}
            onClick={handleCreate}
          >
            Guardar
          </Button>
        </Box>
      </Box>

      <ActivitiesModal
        open={openActivities}
        onSave={onSaveActivities}
        onClose={onCloseActivities}
        catalog={activitiesCatalog}
        currentActivities={currentAsset?.activities || []}
      />

      <ObservationsModal
        open={openObservations}
        onSave={onSaveObservations}
        onClose={onCloseObservations}
        currentObservations={currentAsset?.observations || []}
      />

      <ComponentsModal
        open={openComponents}
        columns={columns}
        onSave={onSaveComponents}
        onClose={onCloseComponents}
        catalog={componentsCatalog}
        currentComponents={currentAsset?.components || []}
      />
    </>
  );
};

export default MaintanceBaseCreate;
