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

  useEffect(() => {
    fetchCategories();
  }, []);

  // Me permite obtener las categorias.
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:8000/api/category");
      setCategories(response.data.results);
    } catch (error) {
      console.error("Somenthing went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Me permite añadir una categoria.
  const addCategory = async ({ code, type, name }) => {
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
      fetchCategories();
    } catch (error) {
      // Aqui: errores, codigo ya existente.
      console.error("Somenthing went wrong: ", error);
    }
  };

  const onDelete = async (id) => {
    try {
      await axios.delete(BASE_URL + "category/destroy/" + id);
      fetchCategories();
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
    setModalViewOpen(true);
  };

  const handleCloseViewModel = () => {
    setModalViewOpen(false);
  };

  const handleOpenCreateModal = () => {
    setModalCreateOpen(true);
  };

  const handleCloseCreateModal = () => {
    setModalCreateOpen(false);
  };

  return (
    <div className="category">
      {/* Cajara para el contenido del header */}
      <Box display="flex" justifyContent="flex-end">
        <CategoryHeader />
      </Box>

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
        />
      </Box>

      {/* Modal para agregar categoria */}
      <CreateCategoryModal
        open={modalCreateOpen}
        onClose={handleCloseCreateModal}
        onCreate={addCategory}
      ></CreateCategoryModal>

      {/* Modal para ver las categorias */}
      <CategoryViewModal
        open={modalViewOpen}
        onClose={handleCloseViewModel}
        item={category}
      ></CategoryViewModal>
    </div>
  );
};

export default Category;
