import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { BASE_URL } from "../../configs";
import axios from "axios";
import "../Form.css";

import GeneralizedModal from "../createModal/Modal";
import GeneralizedViewModal from "../createModal/ViewModal";
import FormModal from "../Form/Form";
import PageContent from "../PageContent/PageContent";

axios.defaults.withCredentials = true;

const InformationPage = ({ columns }) => {
  const [info, setInfo] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Modales
  const [modalCreateOpen, setModalCreateOpen] = useState(false);
  const [modalViewOpen, setModalViewOpen] = useState(false);

  const [information, setInformation] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Paginación
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const [totalItems, setTotalItems] = useState(1);

  useEffect(() => {
    getInformation(currentPage, rowsPerPage);
  }, [currentPage, rowsPerPage]);

  // Obtener categorías
  const getInformation = async (page = 1, rows = 3) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/category?page=${page}&rows=${rows}`
      );
      const { data, current_page, total } = response.data;
      
      setInfo(data);
      setCurrentPage(current_page);
      setTotalItems(total);
    } catch (error) {
      console.error("Something went wrong:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Crear categoría
  const onSave = async (data) => {
    try {
      await axios.get("http://localhost:8000/sanctum/csrf-cookie");
      await axios.post(`${BASE_URL}category/store`, {
        cod_dis: data.code,
        tip_dis: data.type,
        nom_dis: data.name,
      });
      getInformation();
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  };

  // Actualizar categoría
  const onUpdate = async (data) => {
    try {
      await axios.put(`${BASE_URL}category/update/${data.id}`, {
        cod_dis: data.cod_dis,
        nom_dis: data.nom_dis,
        tip_dis: data.tip_dis,
      });
      await getInformation();
      setIsEditing(false);
      setModalViewOpen(false);
    } catch (error) {
      console.log("Something went wrong:", error);
    }
  };

  // Eliminar categoría
  const onDelete = async (id) => {
    try {
      await axios.delete(`${BASE_URL}category/destroy/${id}`);
      getInformation();
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  // Ver detalles de categoría
  const onSee = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}category/show/${id}`);
      console.log(response.data.result);
      setInformation(response.data.result);
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  const handleOpenViewModel = async (id) => {
    await onSee(id);
    setIsEditing(false);
    setModalViewOpen(true);
  };

  const handleCloseViewModel = () => {
    console.log("Cerrando el modal...");
    setModalViewOpen(false);
    setIsEditing(false);
  };

  const generateViewFields = (myData, resetValues = false) => {
    if (!myData || Object.keys(myData).length === 0) {
      return [];
    }
  
    // Excluir campos no deseados
    const filteredData = Object.keys(myData).filter(
      (key) => !["id", "created_at", "updated_at"].includes(key)
    );
  
    return filteredData.map((key, index) => {
      const fieldValue = resetValues ? "" : myData[key] || "";
  
      return {
        name: key,
        label: key.toUpperCase(),
        value: fieldValue,
        onChange: (value) => setInformation({ ...myData, [key]: value }),
      };
    });
  };
  

  const viewFields = generateViewFields(information);
  const createFields = generateViewFields(info[0],true);

  console.log(viewFields);

  return (
    <div className="information-page">
      <Box className="page-container-box">
        <Box>
          <Button
            onClick={() => setModalCreateOpen(true)}
            color="primary"
            variant="contained"
            startIcon={<AddIcon />}
          >
            Agregar
          </Button>
        </Box>

        <Box className="table-container">
          <PageContent
            isLoading={isLoading}
            data={info}
            onSee={handleOpenViewModel}
            onDelete={onDelete}
            currentPage={currentPage}
            totalItems={totalItems}
            setCurrentPage={(page) => setCurrentPage(page)}
            setRowsPerPage={(rows) => setRowsPerPage(rows)}
            columns={columns}
          />
        </Box>
      </Box>

      <GeneralizedModal
        open={modalCreateOpen}
        onClose={() => setModalCreateOpen(false)}
        onSubmit={onSave}
        fields={createFields}
      />

      <GeneralizedViewModal
        open={modalViewOpen}
        onClose={handleCloseViewModel}
        item={information}
        onUpdate={onUpdate}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        fields={viewFields}
      />
    </div>
  );
};

export default InformationPage;
