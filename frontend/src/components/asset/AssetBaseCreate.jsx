import React, { useState } from "react";
import { Box, Grid2, Typography, Button } from "@mui/material";

import CreateStyles from "../../generic/styles/CreateStyles";
import DynamicField from "../../generic/DynamicField";
import AssetTableCreate from "./AssetTableCreate";
import axiosInstance from "../../utils/api";
import { toast } from "react-toastify";
import { validateField, validateFields } from "../../utils/validations";
import { useNavigate } from "react-router-dom";

const Entry = ({ fields, columns, defaultState }) => {
  const [entity, setEntity] = useState(defaultState);
  const [relatedData, setRelatedData] = useState({});
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isCategorySelected, setIsCategorySelected] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const navigate = useNavigate();

  const resetFields = () => {
    setEntity(defaultState);
    setRelatedData([]);
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

  // Cambio basado en la fila y su valor.
  const handleDescription = (id, description) => {
    setEntity((prevEntity) => {
      const componentExists = prevEntity.components.some(
        (component) => component.id === id
      );

      let updatedComponents;

      // Actualizar el compoentne si existe
      if (componentExists) {
        updatedComponents = prevEntity.components.map((component) =>
          component.id === id
            ? { ...component, pivot: { ...component.pivot, description } }
            : component
        );
        // Crear el componente si no existe
      } else {
        updatedComponents = [
          ...prevEntity.components,
          { id, pivot: { description } },
        ];
      }

      // Actualizar relatedData para mantener los datos que escribe el usuario en la tabla.
      setRelatedData((prevData) =>
        prevData.map((component) =>
          component.id === id
            ? { ...component, pivot: { ...component.pivot, description } }
            : component
        )
      );

      return { ...prevEntity, components: updatedComponents };
    });
  };

  // En este caso el key seria id_cat_ass y el value correspondería al id.
  const handleFetch = async (key, value) => {
    if (key === "id_cat_ass") {
      setIsCategorySelected(true);
      setIsLoading(true);

      try {
        const response = await axiosInstance.get(`/categories/show/${value}`);
        const componentsWithDescription = response.data.device.components.map(
          (component) => ({
            ...component,
            pivot: {
              ...component.pivot,
              description: component.pivot?.description || "",
            },
          })
        );
        setRelatedData(componentsWithDescription);
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

  const handleReturn = () => {
    navigate("/dashboard/assets");
  };

  const handleCreate = async () => {
    if (validateAll()) {
      try {
        await axiosInstance.post("/assets", { asset: entity });
        resetFields();
        toast.success("Activo creado con éxito.");
      } catch (error) {
        toast.error("No se ha podido crear el activo.");
      }
    }
  };

  return (
    <>
      <Typography
        variant="h6"
        color="#6068A5"
        marginBottom="10px"
        fontWeight="bold"
      >
        Crear activo
      </Typography>
      <Box p={3} border="1px solid #ddd" width="90%" borderRadius={2}>
        {/* Contenedor de la cuadrícula */}
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
            <AssetTableCreate
              data={relatedData}
              isLoading={isLoading}
              columns={columns}
              currentPage={currentPage}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleDescription={handleDescription}
            />
          </Box>
        ) : null}
      </Box>

      {/* Botones */}
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
    </>
  );
};

export default Entry;
