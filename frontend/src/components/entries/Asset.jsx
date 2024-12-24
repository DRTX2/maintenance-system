import React, { useState } from "react";
import {
  Box,
  Grid2,
  TextField,
  Typography,
  Select,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";

import CreateStyles from "../../generic/styles/CreateStyles";
import DynamicField from "../../generic/DynamicField";
import AssetTable from "./AssetTable";
import axiosInstance from "../../utils/api";
import { toast } from "react-toastify";
import { validateField, validateFields } from "../../utils/validations";

const Entry = ({ fields, columns, defaultState }) => {
  const [entity, setEntity] = useState(defaultState);
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [relatedData, setRelatedData] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const resetFields = () => {
    setEntity(defaultState);
    setErrors({});
  };

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  // Basicamente valida un solo campo
  const handleFieldChange = (key, value) => {
    setEntity((prev) => ({ ...prev, [key]: value }));

    const errorMessage = validateField(key, value);
    setErrors((prevErrors) => ({ ...prevErrors, [key]: errorMessage }));
  };

  // En este caso el key seria id_cat_ass y el value correspondería al id.
  const handleFetch = async (key, value) => {
    if (key === "id_cat_ass") {
      setIsCategorySelected(true);
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(`/categories/show/${value}`);
        setRelatedData(response.data.device.components);
      } catch (error) {
        toast.error("No se ha podido obtener los componentes.");
        setRelatedData([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Cuando intente crear todos los campos
  const validateAll = () => {
    const validationErrors = validateFields(entity, fields);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleCreate = () => {
    if (validateAll()) {
      //  Manejar el crear en este componente.
    }
  };

  return (
    <>
      <Typography variant="h6" marginBottom="10px">
        Crear activo
      </Typography>
      <Box p={3} border="1px solid #ddd" width="90%" borderRadius={2}>
        {/* Contenedor de la cuadrícula */}
        <Grid2 container spacing={3}>
          {fields.map((field) => (
            <Grid2 item xs={12} sm={6} key={field.key} width="48%">
              <Box width="100%">
                {/* Título del campo */}
                <Typography variant="subtitle1" width="100%">
                  {field.label}
                </Typography>
                {/* Campo dinámico */}
                <DynamicField
                  key={field.key}
                  field={field}
                  value={entity[field.key]}
                  onChange={handleFieldChange}
                  onFetch={handleFetch}
                  error={errors[field.key]}
                  helperText={errors[field.key]}
                  readOnly={false}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>

        {/* Generar tabla */}
        {isCategorySelected && relatedData.length > 0 ? (
          <Box marginTop="30px">
            <AssetTable
              data={relatedData}
              isLoading={isLoading}
              columns={columns}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
            ></AssetTable>{" "}
          </Box>
        ) : null}
      </Box>

      {/* Botones */}
      <Box marginTop="20px">
        <Button color="secondary" sx={CreateStyles.buttonStyle1}>
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
    </>
  );
};

export default Entry;
