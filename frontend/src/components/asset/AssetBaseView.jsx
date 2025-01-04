import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import CreateStyles from "../../generic/styles/CreateStyles";
import axiosInstance from "../../utils/api";
import { toast } from "react-toastify";
import { FormControlLabel, Switch } from "@mui/material";
import DynamicField from "../../generic/DynamicField";
import AssetTableCreate from "./AssetTableCreate";
import { Grid2 } from "@mui/material";

const AssetBaseView = ({
  asset,
  fields,
  columns,
  errors,
  validateAll,
  validateTableFields,
  handleDescription,
  handleFieldChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);
  const navigate = useNavigate();

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const handleFetch = async (param) => {};

  const handleReturn = () => {
    navigate("/dashboard/assets");
  };

  const handleUpdate = async () => {
    const isEntityValid = validateAll();
    const isTableValid = validateTableFields();
    if (isEntityValid && isTableValid) {
      try {
        await axiosInstance.put(`/assets/${asset.id}`, {
          asset: asset,
        });
        toast.success("Activo actualizado con éxito.");
        setIsEditing(false);
        navigate("/dashboard/assets");
      } catch (error) {
        toast.error("No se ha podido crear el activo.");
      }
    }
  };

  return (
    <>
      {/* Titulo */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography
          variant="h5"
          sx={{
            color: "#6068A5",
            fontWeight: "bold",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          Ver activo
        </Typography>
        <Box marginLeft="50px">
          <FormControlLabel
            control={
              <Switch
                checked={isEditing}
                onChange={() => setIsEditing(!isEditing)}
                color="primary"
              />
            }
          />
        </Box>
      </Box>
      {/* Cuerpo */}
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
                  value={asset[field.key]}
                  onChange={handleFieldChange}
                  onFetch={handleFetch}
                  error={errors[field.key]}
                  helperText={errors[field.key]}
                  readOnly={!isEditing || !field.editable}
                />
              </Box>
            </Grid2>
          ))}
        </Grid2>
      </Box>

      {/* Poner la tabla */}
      <Box marginTop="30px" width="90%">
        <AssetTableCreate
          data={asset.components || []}
          columns={columns}
          currentPage={currentPage}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleDescription={handleDescription}
          readOnly={!isEditing}
        />
      </Box>

      {/* Footer */}
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
          onClick={handleUpdate}
        >
          Guardar
        </Button>
      </Box>
    </>
  );
};

export default AssetBaseView;
