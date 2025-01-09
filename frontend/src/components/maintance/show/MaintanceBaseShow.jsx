import {
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Button,
} from "@mui/material";
import { useState, useEffect } from "react";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { getDecodedToken } from "../../../utils/authService";
import { toast } from "react-toastify";
import Box from "@mui/material/Box";
import SearchBar from "../../../generic/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import GenericStyles from "../../../generic/styles/GenericStyles";
import dayjs from "dayjs";
import ReusableDatePicker from "../../report/ReusableDatePicker";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import tableStyles from "../../../generic/styles/TableStyles";
import axiosInstance from "../../../utils/api";
import MaintanceFilters from "../../../generic/filters/MaintanceFilters";
import GenericTable from "../../GenericTable";
import { useMaintenancesContext } from "../../../provider/MaintenancesContext";
import Loader from "../../Loader";

const MaintanceBaseShow = ({ columns }) => {
  const navigate = useNavigate();
  const { maintenances, isReady } = useMaintenancesContext();
  const [isDelete, setIsDelete] = useState(false);

  const [formData, setFormData] = useState({
    startDate: null,
    endDate: null,
  });
  const [errors, setErrors] = useState({
    startDate: false,
    endDate: false,
  });

  const onCreate = () => {
    navigate("/dashboard/maintance/create");
  };

  // const onFetch = async (param) => {
  //   if (param === "") {
  //     await fetchData();
  //     return;
  //   }

  //   try {
  //     const response = await axiosInstance.post(
  //       "maintenances/search?term=" + param
  //     );
  //     setMaintances(response.data.results);
  //     console.log("Filtro", response.data.results);
  //   } catch (error) {
  //     toast.error("No se ha podido filtrar por busqueda.");
  //   }
  // };

  const onView = (id) => {
    navigate(`/dashboard/maintance/view/${id}`);
  };

  const onEdit = (id) => {
    navigate(`/dashboard/maintance/edit/${id}`);
  };

  const onDelete = async (id, status) => {
    const action = `/maintenances/${id}`;
    const newStatus = status === "V" ? "H" : "V";

    const message =
      status === "V"
        ? "Mantenimiento ocultado correctamente"
        : "Mantenimiento mostrado correctamente";

    try {
      await axiosInstance.post(action);

      const updatedMaintance = maintenances.map((maintance) =>
        maintance.id === id ? { ...maintance, vis_main: newStatus } : maintance
      );

      // setMaintances(updatedMaintance);
      toast.success(message);
    } catch (error) {
      toast.error("No se ha podido ocultar el mantenimiento");
    }
  };

  // const fetchMaintenancesFilters = async (filters = {}) => {
  //   setIsReady(false);
  //   try {
  //     const response = await axiosInstance.post(
  //       "/maintenances/filters",
  //       filters
  //     );
  //     setMaintances(response.data.results);
  //     setIsReady(true);
  //   } catch (error) {
  //     toast.error("No se ha podido filtrar.");
  //   }
  // };

  const handleFilterChange = async (updatedFilters) => {
    if (!updatedFilters) {
      toast.error("Filtros no definidos");
      return;
    }

    const isFilterEmpty = Object.values(updatedFilters).every(
      (filter) => !filter || Object.values(filter).every((value) => !value)
    );

    if (isFilterEmpty) {
      // await fetchData();
      return;
    }

    const cleanedData = buildFilterPayload(updatedFilters);
    // await fetchMaintenancesFilters(cleanedData);
  };

  const processFilter = (filter) => {
    if (!filter) return [];

    return Object.keys(filter)
      .filter((key) => filter[key])
      .map((key) => (isNaN(key) ? key : parseInt(key, 10)));
  };

  const buildFilterPayload = (selectedValues) => {
    const payload = {
      types: processFilter(selectedValues.types),
      responsibles: processFilter(selectedValues.responsibles).map((value) => {
        return typeof value === "number" ? String(value) : value;
      }),
      assets: processFilter(selectedValues.assets),
    };
    return payload;
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.startDate || formData.startDate.trim() === "") {
      newErrors.startDate = "Ingrese una fecha de inicio válida";
    }

    if (!formData.endDate || formData.endDate.trim() === "") {
      newErrors.endDate = "Ingrese una fecha de fin válida";
    }

    if (formData.startDate && formData.endDate) {
      const start = dayjs(formData.startDate);
      const end = dayjs(formData.endDate);

      if (start.isAfter(end)) {
        newErrors.startDate =
          "La fecha de inicio no puede ser mayor que la fecha de fin";
        newErrors.endDate =
          "La fecha de fin no puede ser menor que la fecha de inicio";
      }
    }

    return newErrors;
  };

  const handleFilterDate = async () => {
    const newErrors = validateForm();
    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    const transformedObject = {
      created_at: [
        formData.startDate
          ? dayjs(formData.startDate).format("YYYY-MM-DD")
          : null,
      ],
      ended_at: [
        formData.endDate ? dayjs(formData.endDate).format("YYYY-MM-DD") : null,
      ],
    };

    try {
      const response = await axiosInstance.post(
        "/maintenances/filters-by-date",
        transformedObject
      );

      // setMaintances(response.data.results);
    } catch (error) {
      toast.error("No se ha podido filtrar por fecha.");
    }
  };

  const handleReset = () => {
    setErrors("");
    setFormData({
      startDate: null,
      endDate: null,
    });
    // fetchData();
  };

  const handleStartDate = (date) => {
    const transformedDate = transformDate(date);
    setFormData((prev) => ({ ...prev, startDate: transformedDate }));
    setErrors((prev) => ({ ...prev, startDate: "" }));
  };
  const handleEndDate = (date) => {
    const transformedDate = transformDate(date);
    setFormData((prev) => ({ ...prev, endDate: transformedDate }));
    setErrors((prev) => ({ ...prev, endDate: "" }));
  };

  const transformDate = (date) => {
    try {
      return date ? dayjs(date).utc().format("YYYY-MM-DDTHH:mm:ss[Z]") : null;
    } catch (error) {
      return null;
    }
  };

  if (!isReady) {
    return <Loader />;
  }

  const formattedData = maintenances.map((maintance) => {
    return {
      id: maintance.id,
      cod_main: maintance.cod_main,
      created_at: dayjs(maintance.created_at).utc().format("MM-DD-YYYY"),
      ended_at: dayjs(maintance.ended_at).utc().format("MM-DD-YYYY"),
      responsable: maintance.responsable,
      type: maintance.type,
      vis_main: maintance.vis_main,
    };
  });

  return (
    <div
      className="flexColumnCenter"
      style={{ width: "90%", marginTop: "40px" }}
    >
      <Box className="flewColumnCenter">
        <Box
          className="flexRowCenterEnd"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          {/* Fila 1 */}
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <h2 style={{ marginRight: "20px" }}>Mantenimientos</h2>

            <Button
              onClick={onCreate}
              variant="contained"
              sx={GenericStyles.buttonStyle}
              startIcon={<AddIcon />}
            >
              Agregar mantenimiento
            </Button>
          </Box>

          {/* Fila 2 */}
          <Box
            style={{
              display: "flex",
              flexWrap: "wrap",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
              gap: "16px",
            }}
          >
            {/* <SearchBar placeholder={`Buscar por código`} onSearch={onFetch} /> */}
            {/* <MaintanceFilters
              onFilterChange={handleFilterChange}
              onClear={fetchData}
            /> */}
          </Box>

          <Box
            style={{
              display: "flex",
              alignItems: "center",
              width: "100%",
              gap: "16px",
              marginTop: "1rem",
            }}
          >
            <ReusableDatePicker
              label="Fecha de inicio"
              value={formData["startDate"]}
              onChange={(date) => handleStartDate(date)}
              error={!!errors.startDate}
              helperText={errors.startDate}
            />
            <ReusableDatePicker
              label="Fecha fin"
              value={formData["endDate"]}
              onChange={(date) => handleEndDate(date)}
              error={!!errors.endDate}
              helperText={errors.endDate}
            />
            <Button variant="contained" onClick={handleFilterDate}>
              Aplicar filtro
            </Button>{" "}
            <Button variant="contained" onClick={handleReset}>
              Resetear filtros
            </Button>
          </Box>
        </Box>
      </Box>
      {/* Fin del box */}

      {isReady ? (
        <Box className="flexColumnCenter" paddingTop="20px">
          {formattedData?.length > 0 ? (
            <>
              <GenericTable
                data={formattedData}
                dataCount={formattedData.length}
                isDelete={isDelete}
                setIsDelete={setIsDelete}
              >
                {(currentPageData) => (
                  <>
                    <TableHead sx={tableStyles.tableHead}>
                      <TableRow>
                        {columns.map((column) => (
                          <TableCell key={column.key}>{column.label}</TableCell>
                        ))}
                        <TableCell align="center">Acciones</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {currentPageData.map((item) => (
                        <TableRow key={item.id}>
                          {columns.map((column) => (
                            <TableCell key={column.key}>
                              {item[column.key]}
                            </TableCell>
                          ))}
                          <TableCell align="center">
                            <IconButton
                              onClick={() => onView(item.id)}
                              color="primary"
                            >
                              <Tooltip title="Ver">
                                <VisibilityIcon />
                              </Tooltip>
                            </IconButton>

                            <IconButton
                              onClick={() => onEdit(item.id)}
                              color="primary"
                            >
                              <Tooltip title="Editar">
                                <EditIcon />
                              </Tooltip>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </>
                )}
              </GenericTable>
            </>
          ) : (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
              No hay mantenimientos registrados.
            </div>
          )}
        </Box>
      ) : (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}

      {/* Fin table */}
    </div>
  );
};

export default MaintanceBaseShow;
