import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import GenericTable from "../../GenericTable";
import SearchBar from "../../../generic/SearchBar";
import { useAssetsContext } from "../../../provider/AssetsContext";
import AssetFilters from "../../../generic/filters/AssetFilters";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import categoryViewStyles from "../../../generic/styles/ViewStyles";

const AssetModalTable = ({ open, onClose, assets, onAdd }) => {
  const { filteredAssets, updateFilters, filterAssetsByTerm } =
    useAssetsContext();

  const handleFilterChange = async (updatedFilters) => {
    if (!updatedFilters || Object.keys(updatedFilters).length === 0) {
      updateFilters({
        locations: [],
        incomes: [],
        categories: [],
        devices: [],
        status: [],
      });
      return;
    }

    const formatted = buildFilterPayload(updatedFilters);
    updateFilters(formatted);
  };

  const buildFilterPayload = (updatedFilters) => {
    // Procesar los filtros y extraer solo los keys de cada array
    const processFilter = (filterArray) => {
      if (!filterArray || filterArray.length === 0) return [];
      return filterArray.map((item) => item.key); // Extraer los valores "key"
    };

    // Retornar un objeto con los filtros procesados
    return {
      incomes: processFilter(updatedFilters.incomes),
      locations: processFilter(updatedFilters.locations),
      categories: processFilter(updatedFilters.categories),
      devices: processFilter(updatedFilters.devices),
      status: processFilter(updatedFilters.status),
    };
  };

  if (!filteredAssets.length > 0) {
    return null;
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: "800px", maxWidth: "1500px" },
      }}
    >
      <DialogTitle>Añadir activos</DialogTitle>
      <DialogContent>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/* Filtros */}
          <SearchBar
            placeholder={`Buscar por número de serie`}
            onSearch={filterAssetsByTerm}
          />

          <AssetFilters onFilterChange={handleFilterChange} />
          {/* --------- */}
        </Box>
        {filteredAssets?.length > 0 ? (
          <GenericTable
            data={filteredAssets}
            dataCount={filteredAssets.length}
            isDelete={false}
            setIsDelete={() => {}}
          >
            {(currentPageData) => (
              <>
                <TableHead>
                  <TableRow>
                    <TableCell>Código</TableCell>
                    <TableCell>Número de serie</TableCell>
                    <TableCell>Ubicación</TableCell>
                    <TableCell>Ingreso</TableCell>
                    <TableCell>Categoria</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentPageData.map((row) => (
                    <TableRow
                      key={row.id}
                      sx={{
                        backgroundColor: row?.isAdded
                          ? "#e0f7fa"
                          : "transparent",
                      }}
                    >
                      <TableCell>{row.cod_ass}</TableCell>
                      <TableCell>{row.ser_num_ass}</TableCell>
                      <TableCell>{row.location_name}</TableCell>
                      <TableCell>{row.income_code}</TableCell>
                      <TableCell>{row.category_name}</TableCell>
                      <TableCell>
                        {row?.isAdded ? (
                          <Typography variant="caption" color="success.main">
                            Agregado
                          </Typography>
                        ) : (
                          <IconButton onClick={() => onAdd(row)}>
                            <AddIcon />
                          </IconButton>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </>
            )}
          </GenericTable>
        ) : (
          <Typography variant="subtitle1" marginTop="1.5rem">
            No se han encontrado datos.
          </Typography>
        )}
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onClose}
          variant="contained"
          sx={categoryViewStyles.buttonStyle2}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AssetModalTable;
