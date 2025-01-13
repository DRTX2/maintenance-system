import React, { useState } from "react";
import {
  Typography,
  Box,
  Grid,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import BatchModal from "./BatchModal";

const AssetsByBatch = () => {
  const [openBatchModal, setOpenBatchModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  console.log(location.state);

  const { assets } = location.state || { assets: [] };

  if (!assets) {
    navigate("/dashboard/assets");
    return null;
  }

  const handleBack = () => {
    setOpenBatchModal(true);
  };

  const handleCancel = () => {
    navigate("/dashboard/assets");
  };

  const handleSave = () => {
    // Enviar para guardar ya
  };

  return (
    <>
      <Typography
        variant="h6"
        color="#6068A5"
        marginBottom="20px"
        marginTop="20px"
        fontWeight="bold"
      >
        Activos por lote
      </Typography>

      {assets.map((asset, index) => (
        <Box
          key={index}
          p={3}
          border="1px solid #ddd"
          borderRadius={4}
          margin="2rem 2rem"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="#6068A5" fontWeight="bold">
                Código
              </Typography>
              <TextField
                fullWidth
                value={asset.cod_ass}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="#6068A5" fontWeight="bold">
                Número de serie
              </Typography>
              <TextField
                fullWidth
                value={asset.ser_num_ass}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6} color="#6068A5">
              <Typography variant="subtitle2" fontWeight="bold">
                Ubicación
              </Typography>
              <TextField
                fullWidth
                value={asset.id_loc_ass}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="#6068A5" fontWeight="bold">
                Ingreso
              </Typography>
              <TextField
                fullWidth
                value={asset.id_inc_ass}
                InputProps={{ readOnly: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle2" color="#6068A5" fontWeight="bold">
                Dispositivo
              </Typography>
              <TextField
                fullWidth
                value={asset.id_cat_ass}
                InputProps={{ readOnly: true }}
              />
            </Grid>
          </Grid>

          {asset.components.length > 0 && (
            <>
              <Typography variant="subtitle2" marginTop={4}>
                Componentes del activo
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Nombre</TableCell>
                    <TableCell>Descripción</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {asset.components.map((component, i) => (
                    <TableRow key={i}>
                      <TableCell>{component.id}</TableCell>
                      <TableCell>{component.name || "N/A"}</TableCell>
                      <TableCell>
                        {component.pivot?.description || "N/A"}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </>
          )}
        </Box>
      ))}

      <Box display="flex" justifyContent="space-between" width="90%">
        <Button variant="outlined" onClick={handleBack}>
          Volver a subir
        </Button>
        <Box display="flex" justifyContent="space-between" gap="1rem">
          <Button variant="outlined" color="error" onClick={handleCancel}>
            Cancelar
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Guardar
          </Button>
        </Box>
      </Box>

      <BatchModal
        open={openBatchModal}
        onClose={() => setOpenBatchModal(false)}
      />
    </>
  );
};

export default AssetsByBatch;
