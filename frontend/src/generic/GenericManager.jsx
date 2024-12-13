import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";

import GenericStyles from "./styles/GenericStyles";
import CreateModal from "./CreateModal";
import ViewModal from "./ViewModal";
import DeleteModal from "./DeleteModal";
import ContentGenericTable from "./ContentGenericTable";
import { generateErrorMessage } from "../utils/validations";

axios.defaults.withCredentials = true;

const GenericManager = ({
  apiConfig,
  entityNamePlural,
  entityNameSingular,
  defaultEntityState,
  fields,
  columns,
  message,
  searchBy,
}) => {
  const [entities, setEntities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [entity, setEntity] = useState(defaultEntityState);

  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    fetchEntities();
  }, []);

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const fetchSearch = async (param) => {
    if (param === "") {
      await fetchEntities();
      return;
    }

    try {
      const response = await axios.post(`${apiConfig.fetchSearch}${param}`);
      setEntities(response.data.results);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessage = generateErrorMessage(errors, fields);
        toast.error(`${errorMessage}`);
      } else {
        toast.error(`Error inesperado al obtener ${entityNamePlural}`);
      }
    }
  };

  const fetchEntities = async () => {
    try {
      const response = await axios.get(apiConfig.fetchAll);
      setEntities(response.data.results);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessage = generateErrorMessage(errors, fields);
        toast.error(`${errorMessage}`);
      } else {
        toast.error(`Error inesperado al obtener ${entityNamePlural}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreate = async (item) => {
    try {
      await axios.post(apiConfig.create, item);
      await fetchEntities();
      toast.success(`Registro creado correctamente.`);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessage = generateErrorMessage(errors, fields);
        toast.error(`${errorMessage}`);
      } else {
        toast.error(`Error inesperado al crear ${entityNamePlural}`);
      }
    }
  };

  const handleUpdate = async (item) => {
    try {
      await axios.put(`${apiConfig.update}/${item.id}`, item);
      await fetchEntities();
      toast.success(`Registro actualizado correctamente.`);
      setIsEditing(false);
      setModalViewOpen(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessage = generateErrorMessage(errors, fields);
        toast.error(`${errorMessage}`);
      } else {
        toast.error(`Error inesperado al actualizar ${entityNameSingular}`);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${apiConfig.delete}/${id}`);
      await fetchEntities();

      // Validar la página actual
      setEntities((prevEntities) => {
        const totalItems = prevEntities.length;
        const totalPages = Math.ceil(totalItems / rowsPerPage);

        if (currentPage >= totalPages) {
          setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
        }

        return prevEntities;
      });

      toast.success(`Registro eliminado con éxito.`);
      setModalDeleteOpen(false);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessage = generateErrorMessage(errors, fields);
        toast.error(`${errorMessage}`);
      } else {
        toast.error(`Error inesperado al eliminar ${entityNameSingular}`);
      }
    }
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`${apiConfig.fetchOne}/${id}`);
      setEntity(response.data.result);
    } catch (error) {
      if (error.response && error.response.data.errors) {
        const errors = error.response.data.errors;
        let errorMessage = generateErrorMessage(errors, fields);
        toast.error(`${errorMessage}`);
      } else {
        toast.error(`Error inesperado al ver ${entityNameSingular}`);
      }
    }
  };

  const openViewModal = async (id) => {
    await handleView(id);
    setIsEditing(false);
    setModalViewOpen(true);
  };

  const closeViewModal = () => {
    setModalViewOpen(false);
    setIsEditing(false);
  };

  const openCreateModal = () => setModalCreateOpen(true);
  const closeCreateModal = () => setModalCreateOpen(false);

  const openDeleteModal = async (id) => {
    await handleView(id);
    setModalDeleteOpen(true);
  };

  const closeDeleteModal = () => setModalDeleteOpen(false);

  return (
    <div
      className="flexColumnCenter"
      style={{ width: "80%", marginTop: "40px" }}
    >
      <Box className="flewColumnCenter">
        <Box
          className="flexRowCenterEnd"
          style={{ justifyContent: "space-between", width: "100%" }}
        >
          <h2>{entityNamePlural}</h2>

          {/* Busqueda por search */}
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              margin: "0 15px",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder={"Buscar por " + searchBy}
              inputProps={{ "aria-label": "Buscar ..." }}
              onChange={(e) => fetchSearch(e.target.value)}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>

          {/* Boton para añadir */}
          <Button
            onClick={openCreateModal}
            variant="contained"
            sx={GenericStyles.buttonStyle}
            startIcon={<AddIcon />}
          >
            Agregar {entityNameSingular}
          </Button>
        </Box>

        <Box className="flexColumnCenter" paddingTop="20px">
          <ContentGenericTable
            isLoading={isLoading}
            data={entities}
            columns={columns}
            onView={openViewModal}
            onDelete={openDeleteModal}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      <CreateModal
        open={modalCreateOpen}
        onClose={closeCreateModal}
        onCreate={handleCreate}
        fields={fields}
        defaultState={defaultEntityState}
      />

      <ViewModal
        open={modalViewOpen}
        onClose={closeViewModal}
        item={entity}
        onUpdate={handleUpdate}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        fields={fields}
      />

      <DeleteModal
        open={modalDeleteOpen}
        onClose={closeDeleteModal}
        onDelete={handleDelete}
        item={entity}
        message={message}
      />
    </div>
  );
};

export default GenericManager;
