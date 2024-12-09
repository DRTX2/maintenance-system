import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";

import { BASE_URL } from "../../utils/configs";
import axios from "axios";
import "../Form.css";

import GeneralizedModal from "../createModal/Modal";
import GeneralizedViewModal from "../createModal/ViewModal";
import FormModal from "../Form/Form";
import PageContent from "../PageContent/PageContent";

axios.defaults.withCredentials = true;

const InformationPage = ({ columns, section }) => {
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

  // Obtener registros de la bd
  const getInformation = async (page = 1, rows = 3) => {
    try {
      const response = await axios.get(
        `http://127.0.0.1:8000/api/${section}?page=${page}&rows=${rows}`
      );
      const { data } = response.data.data;

      setInfo(data);
      console.log(data);
      setCurrentPage(1);
      setTotalItems(3);
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
      await axios.post(`${BASE_URL}${section}`, data);
      getInformation();
    } catch (error) {
      console.error("Something went wrong: ", error);
    }
  };

  // Actualizar categoría
  const onUpdate = async (data) => {
    console.log(data);
    try {
      await axios.put(`${BASE_URL}${section}/${data.id}`, data);
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
      await axios.delete(`${BASE_URL}${section}/${id}`);
      getInformation();
    } catch (error) {
      console.log("Something went wrong: ", error);
    }
  };

  // Ver detalles de categoría
  const onSee = async (id) => {
    try {
      const response = await axios.get(`${BASE_URL}${section}/${id}`);
      setInformation(response.data.data);
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
  // Solo generar los campos de creación si hay información
  const createFields = info.length > 0 ? generateViewFields(info[0], true) : [];

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
