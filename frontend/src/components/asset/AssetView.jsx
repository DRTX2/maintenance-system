import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Typography } from "@mui/material";
import CreateStyles from "../../generic/styles/CreateStyles";
import axiosInstance from "../../utils/api";
import { toast } from "react-toastify";
import { FormControlLabel, Switch, CircularProgress } from "@mui/material";
import DynamicField from "../../generic/DynamicField";

const AssetView = (fields) => {
  const { id } = useParams();
  const [asset, setAsset] = useState({});
  const [field, setField] = useState({});
  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchAsset();
  }, []);

  const fetchAsset = async () => {
    try {
      const response = await axiosInstance.get(`/assets/${id}`);
      setAsset(response.data);
    } catch (error) {
      toast.error("No se ha podido obtener el activo.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFieldChange = (key, value) => {};

  const handleFetch = async (param) => {};

  const handleReturn = () => {
    navigate("/dashboard/assets");
  };

  if (!asset) {
    return <Typography variant="h5">Cargando...</Typography>;
  }

  if (isLoading) {
    return (
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <>
      {/* Titulo */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h5" sx={{ color: "#6068A5", fontWeight: "bold" }}>
          Ver activo - {asset.cod_ass}
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
      <DynamicField
        key={field.key}
        field={field}
        value={asset[field.key]}
        onChange={handleFieldChange}
        onFetch={handleFetch}
        error={errors[field.key]}
        helperText={errors[field.key]}
        readOnly={false}
      />

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

        <Button color="primary" sx={CreateStyles.buttonStyle2}>
          Guardar
        </Button>
      </Box>
    </>
  );
};

export default AssetView;
