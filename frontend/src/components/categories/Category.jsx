import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import CategoryHeader from "./CategoryHeader";
import CreateCategoryModal from "./CategoryCreateModal"; // Importamos el modal
import CategoryContent from "./CategoryContent";
import CategoryViewModal from "./CategoryViewModal";
import { BASE_URL } from "../../configs";
import axios from "axios";

axios.defaults.withCredentials = true;

const Category = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);
  const [category, setCategory] = useState({
    cod_dis: "",
    tip_dis: "",
    nom_dis: "",
  });
  const [isEditing, setIsEditing] = useState(false);

  // Para la paginación
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    getCategories(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  // Me permite obtener las categorias.
  const getCategories = async (page = 1, rows = 3) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/category?page=${page}&rows=${rows}`
      );
      const { data, current_page, total } = response.data;

      setCategories(data);
      setCurrentPage(current_page);
      setTotalItems(total);
    } catch (error) {
      console.error("Somenthing went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Me permite añadir una categoria.
  const onSave = async ({ code, type, name }) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");

      // Recuerda: los campos que se envian a la base de datos deben coincidir con lo que
      // espera el servidor.
      await axios.post(BASE_URL + "category/store", {
        cod_dis: code,
        tip_dis: type,
        nom_dis: name,
      });

      // Aqui: categoria añadida exitosamente.
      getCategories();
    } catch (error) {
      // Aqui: errores, codigo ya existente.
      console.error("Somenthing went wrong: ", error);
    }
  };

  const onUpdate = async (item) => {
    try {
      await axios.put(BASE_URL + "category/update/" + item.id, {
        cod_dis: item.cod_dis,
        nom_dis: item.nom_dis,
        tip_dis: item.tip_dis,
      });

      await getCategories();
      setIsEditing(false);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + "category/destroy/" + id);
      getCategories();
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  const onSee = async (id) => {
    try {
      const response = await axios.get(BASE_URL + "category/show/" + id);
      setCategory(response.data.result);
    } catch (error) {
      console.log("Something went wrong: ", error);
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
            onDelete={onDelete}
            currentPage={currentPage}
            totalItems={totalItems}
            setCurrentPage={(page) => setCurrentPage(page)}
            setRowsPerPage={(rows) => setRowsPerPage(rows)}
          />
        </Box>
      </Box>

      {/* Modal para agregar categoria */}
      <CreateCategoryModal
        open={modalCreateOpen}
        onClose={handleCloseCreateModal}
        onCreate={onSave}
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
    </div>
  );
};

export default Category;
