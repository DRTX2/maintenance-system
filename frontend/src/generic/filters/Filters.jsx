import React, { useState } from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import FilterListIcon from "@mui/icons-material/FilterList";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";

const Filters = ({ data, onFilterChange, onClear }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedValues, setSelectedValues] = useState({});

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCheckboxChange = (key, optionKey) => {
    setSelectedValues((prev) => {
      const updated = {
        ...prev,
        [key]: {
          ...prev[key],
          [optionKey]: !prev[key]?.[optionKey],
        },
      };
      // 1. Notificar al padre sobre los cambios realizados
      onFilterChange(updated);

      return updated;
    });
  };

  const handleClearFilters = () => {
    const clearedValues = {};
    setSelectedValues(clearedValues);
    onFilterChange(clearedValues);
    onClear();
  };

  return (
    <Box>
      {/* Botón de Filtros */}
      <IconButton
        onClick={handleClick}
        sx={{ color: "primary.main" }}
        aria-label="Filtros"
      >
        <FilterListIcon />
        <Typography variant="body2" sx={{ ml: 1 }}>
          Filtros
        </Typography>
      </IconButton>

      {/* Menú Desplegable */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{ style: { padding: 10 } }}
      >
        {data.map((item) => (
          <Box key={item.key}>
            <Typography variant="subtitle2" sx={{ px: 2, py: 1 }}>
              {item.label}
            </Typography>
            {item.options.map((option) => (
              <MenuItem key={option.key} disableRipple>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={selectedValues[item.key]?.[option.key] || false}
                      onChange={() =>
                        handleCheckboxChange(item.key, option.key)
                      }
                    />
                  }
                  label={option.label}
                />
              </MenuItem>
            ))}
          </Box>
        ))}
        {/* Botón para limpiar */}
        <MenuItem onClick={handleClearFilters} sx={{ color: "secondary.main" }}>
          Limpiar filtros
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Filters;
