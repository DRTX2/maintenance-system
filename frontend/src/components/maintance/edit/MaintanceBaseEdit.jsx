import {
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  TablePagination,
  Grid2,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import ClearIcon from "@mui/icons-material/Clear";
import tableStyles from "../../../generic/styles/TableStyles";
import CustomTablePaginationActions from "../../../generic/CustomTablePaginationActions";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateField, validateFields } from "../../../utils/validations";
import AssetSelector from "../create/AssetSelector";
import CreateStyles from "../../../generic/styles/CreateStyles";
import axiosInstance from "../../../utils/api";
import DynamicField from "../../../generic/DynamicField";
import ActivitiesModal from "../create/ActivitiesModal";
import ObservationsModal from "../create/ObservationsModal";
import ComponentsModal from "../create/ComponentsModal";

const MaintanceBaseEdit = ({ maintance, fields, assets }) => {
  const [maintanceEdited, setMaintanceEdited] = useState(maintance);
  const [currentAsset, setCurrentAsset] = useState(null);
  const [assetsTable, setAssetsTable] = useState(maintance?.assets || []);

  console.log(assetsTable);

  const [activitiesCatalog, setActivitiesCatalog] = useState([]);
  const [componentsCatalog, setComponentsCatalog] = useState([]);
  const [openActivities, setOpenActivities] = useState(false);
  const [openObservations, setOpenObservations] = useState(false);
  const [openComponents, setOpenComponents] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  // Mensajes para el select del asset ya que es un componente separado al dynamic.
  const [errorAsset, setErrorAsset] = useState(false);
  const [helperTextAsset, setHelperTextAsset] = useState("");

  useEffect(() => {
    setMaintanceEdited(maintance);
    setAssetsTable(maintance?.assets || []);
  }, [maintanceEdited]);

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFieldChange = (key, value) => {
    setMaintanceEdited((prev) => ({ ...prev, [key]: value }));

    if (
      key === "id_typ_main" &&
      value !== maintanceEdited.id_typ_main &&
      assetsTable.length > 0
    ) {
      setAssetsTable([]);
      setActivitiesCatalog([]);
      setComponentsCatalog([]);
      toast.info(
        "Lista de activos reiniciada debido al cambio de tipo de mantenimiento."
      );
    }

    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMessage }));
  };

  const handleAddAsset = (asset) => {
    // Tiene que haber seleccionado un tipo de mantenimiento antes de añadir algun activo.
    if (!maintanceEdited.id_typ_main) {
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
      { ...asset, activities: [], observations: [], replaced_components: [] },
    ]);

    setErrorAsset(false);
    setHelperTextAsset("");
  };

  // Actividades
  const onOpenActivities = async (assetId) => {
    // Si ya añadio un tipo de mantenimiento, cargar las actividades de ese mantenimiento.
    try {
      const id = maintanceEdited.id_typ_main;
      const response = await axiosInstance.get(`/type-maintenance/${id}`);
      setActivitiesCatalog(response.data.results.activities);
      const asset = assetsTable.find((item) => item.id === assetId);
      console.log("que tiene", asset);
      setCurrentAsset(asset);
      setOpenActivities(true);
    } catch (error) {
      toast.error("No se ha podido obtener las actividades.");
    }
  };

  const onSaveActivities = (activityList) => {
    console.log("sdfsd", activityList);

    // Actualizar las actividades de currentAsset
    setCurrentAsset((prev) => ({
      ...prev,
      activities: activityList,
    }));

    setAssetsTable((prev) =>
      prev.map((asset) =>
        asset.id === currentAsset.id
          ? { ...asset, activities: activityList }
          : asset
      )
    );
    // Aqui además modificar currentAsset.
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
          ? { ...asset, replaced_components: componentsList }
          : asset
      )
    );

    setOpenComponents(false);
  };

  // Eliminar el activo de la tabla.
  const deleteRow = (id) => {
    setAssetsTable((prev) => prev.filter((item) => item.id !== id));
  };

  // Botones de cerrar
  const onCloseActivities = () => setOpenActivities(false);
  const onCloseObservations = () => setOpenObservations(false);
  const onCloseComponents = () => setOpenComponents(false);

  // Acciones para la api
  const handleReturn = () => {
    navigate("/dashboard/maintance");
  };

  const validateAll = () => {
    const validationErrors = validateFields(maintanceEdited, fields);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleCreate = async () => {
    if (assetsTable.length === 0) {
      setErrorAsset(true);
      setHelperTextAsset("Debe agregar al menos un activo.");
    }

    console.log("aa", maintanceEdited);
    // if (validateAll()) {
    //   try {
    //     const idMaintenance = maintanceEdited.id_main;
    //     const response = await axiosInstance.post(
    //       `/maintenance-detail/${idMaintenance}`,
    //       {
    //         ...maintanceEdited,
    //         assets: assetsTable,
    //       }
    //     );

    //     console.log(response);
    //   } catch (error) {
    //     toast.error("Ha ocurrido un error.");
    //   }
    // }
  };

  const handleFetch = (key, value) => {};

  return (
    <>
      <Typography
        variant="h6"
        color="#6068A5"
        marginBottom="20px"
        marginTop="20px"
        fontWeight="bold"
      >
        Editar mantenimiento
      </Typography>
      <Box p={3} border="1px solid #ddd" width="90%" borderRadius={2}>
        <Grid2 container spacing={3}>
          {fields.map((field) => (
            <Grid2 item size={{ xs: 12, sm: 6, md: 6 }} key={field.key}>
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
                value={maintanceEdited[field.key]}
                onChange={handleFieldChange}
                onFetch={handleFetch}
                error={errors[field.key]}
                helperText={errors[field.key]}
                readOnly={false}
              />
            </Grid2>
          ))}
          <Grid2 item size={{ xs: 12, sm: 6, md: 6 }} key="assetsSelector">
            <AssetSelector
              options={assets}
              onAdd={handleAddAsset}
              error={errorAsset}
              helperText={helperTextAsset}
              setErrorAsset={setErrorAsset}
              setHelperTextAsset={setHelperTextAsset}
            />
          </Grid2>
        </Grid2>

        <Box marginTop="30px">
          {/* Aqui esto debe cambiar, en teoria debo mostrar los activos que ya existen */}
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
                      <TableCell>{""}</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {assetsTable
                      .slice(
                        currentPage * rowsPerPage,
                        currentPage * rowsPerPage + rowsPerPage
                      )
                      .map((row) => (
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
                            {row.replaced_components.length} {" Componentes"}
                            <IconButton
                              onClick={() => onOpenComponents(row.id)}
                              arial-label="abrir"
                            >
                              <PlaylistAddIcon />
                            </IconButton>
                          </TableCell>
                          <TableCell>
                            <IconButton onClick={() => deleteRow(row.id)}>
                              <ClearIcon />
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
        onSave={onSaveComponents}
        onClose={onCloseComponents}
        catalog={componentsCatalog}
        currentComponents={currentAsset?.replaced_components || []}
      />
    </>
  );
};
export default MaintanceBaseEdit;
