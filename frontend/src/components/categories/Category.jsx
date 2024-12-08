import { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { toast } from "react-toastify";

import CategoryHeader from "./CategoryHeader";
import CreateCategoryModal from "./CategoryCreateModal"; // Importamos el modal
import CategoryContent from "./CategoryContent";
import CategoryViewModal from "./CategoryViewModal";
import CategoryDeleteModal from "./CategoryDeleteModal";
import { BASE_API, BASE_URL } from "../../utils/configs";
import MESSAGES from "../../utils/messages";

axios.defaults.withCredentials = true;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [modalDeleteOpen, setModalDeleteOpen] = useState(false);
  const [category, setCategory] = useState({
    cod_dis: "",
    tip_dis: "",
    nom_dis: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Para la paginación
  const [currentPage, setCurrentPage] = useState(0); // Partir de la primera pagina
  const [rowsPerPage, setRowsPerPage] = useState(3); // Numero de filas por página

  useEffect(() => {
    getCategories();
  }, []);

  // Handle page change
  const handleChangePage = (event, newPage) => {
    setCurrentPage(newPage);
  };

  // Handle change in rows per page
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0); // Reset the table to the first page whenever rows per page changes
  };

  const getCategories = async () => {
    try {
      const response = await axios.get(BASE_API + "category");
      setCategories(response.data.results);
    } catch (error) {
      toast.error(MESSAGES.ERROR.FETCH_CATEGORIES);
    } finally {
      setIsLoading(false);
    }
  };

  const onCreate = async (item) => {
    try {
      await axios.get(BASE_URL + "sanctum/csrf-cookie");

      // Recuerda: los campos que se envian a la base de datos deben coincidir con lo que
      // espera el servidor.
      await axios.post(BASE_API + "category/store", {
        cod_dis: item.cod_dis,
        tip_dis: item.tip_dis,
        nom_dis: item.nom_dis,
      });

      await getCategories();
      toast.success(MESSAGES.SUCCESS.CATEGORY_CREATED);
    } catch (error) {
      if (error.response) {
        const status = error.response.status;
        const message = MESSAGES.ERROR[status] || MESSAGES.DEFAULT;
        toast.error(message);
      } else {
        toast.error(MESSAGES.ERROR.CONNECTION);
      }
    }
  };

  const onUpdate = async (item) => {
    try {
      await axios.put(BASE_API + "category/update/" + item.id, {
        cod_dis: item.cod_dis,
        nom_dis: item.nom_dis,
        tip_dis: item.tip_dis,
      });

      await getCategories();
      toast.success(MESSAGES.SUCCESS.CATEGORY_UPDATED);
      setIsEditing(false);
      setModalViewOpen(false);
    } catch (error) {
      toast.error(MESSAGES.ERROR.UPDATE_CATEGORY);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(BASE_API + "category/destroy/" + id);
      await getCategories();

      // Validar la página actual
      setCategories((prevCategories) => {
        const totalItems = prevCategories.length;
        const totalPages = Math.ceil(totalItems / rowsPerPage);

        if (currentPage >= totalPages) {
          setCurrentPage((prevPage) => Math.max(prevPage - 1, 0));
        }

        return prevCategories;
      });

      toast.success(MESSAGES.SUCCESS.CATEGORY_DELETED);
      setModalDeleteOpen(false);
    } catch (error) {
      toast.success(MESSAGES.ERROR.DELETE_CATEGORY);
    }
  };

  const onSee = async (id) => {
    try {
      const response = await axios.get(BASE_API + "category/show/" + id);
      setCategory(response.data.result);
    } catch (error) {
      toast.error(MESSAGES.ERROR.FETCH_CATEGORY);
      return;
    }
  };

  const handleOpenViewModel = async (id) => {
    await onSee(id);
    setIsEditing(false);
    setModalViewOpen(true);
  };

  const handleCloseViewModel = () => {
    setModalViewOpen(false);
    setIsEditing(false);
  };

  const handleOpenCreateModal = () => {
    setModalCreateOpen(true);
  };

  const handleCloseCreateModal = () => {
    setModalCreateOpen(false);
  };

  const handleOpenDeleteModal = async (id) => {
    await onSee(id);
    setModalDeleteOpen(true);
  };

  const handleCloseDeleteModel = () => {
    setModalDeleteOpen(false);
  };

  return (
    <div className="category">
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Caja para el boton de agregar */}
        <Box>
          <Button
            onClick={handleOpenCreateModal}
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        </Box>

        {/* Caja para el contenido de la tabla*/}
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
          height="auto"
          style={{ paddingTop: "20px" }}
        >
          <CategoryContent
            isLoading={isLoading}
            categories={categories}
            onSee={handleOpenViewModel}
            onDelete={handleOpenDeleteModal}
            currentPage={currentPage}
            rowsPerPage={rowsPerPage}
            handleChangePage={handleChangePage}
            handleChangeRowsPerPage={handleChangeRowsPerPage}
          />
        </Box>
      </Box>

      {/* Modal para agregar categoria */}
      <CreateCategoryModal
        open={modalCreateOpen}
        onClose={handleCloseCreateModal}
        onCreate={onCreate}
      ></CreateCategoryModal>

      {/* Modal para ver las categorias */}
      <CategoryViewModal
        open={modalViewOpen}
        onClose={handleCloseViewModel}
        item={category}
        onUpdate={onUpdate}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
      ></CategoryViewModal>

      <CategoryDeleteModal
        open={modalDeleteOpen}
        onClose={handleCloseDeleteModel}
        onDelete={onDelete}
        item={category}
      ></CategoryDeleteModal>
    </div>
  );
};

export default Category;
