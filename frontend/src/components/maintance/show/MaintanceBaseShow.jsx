import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import SearchBar from "../../../generic/SearchBar";
import AddIcon from "@mui/icons-material/Add";
import GenericStyles from "../../../generic/styles/GenericStyles";
import dayjs from "dayjs";
import { CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
  Button,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import EditIcon from "@mui/icons-material/Edit";
import Tooltip from "@mui/material/Tooltip";
import CustomTablePaginationActions from "../../../generic/CustomTablePaginationActions";
import tableStyles from "../../../generic/styles/TableStyles";
import { getDecodedToken } from "../../../utils/authService";
import { toast } from "react-toastify";
import axiosInstance from "../../../utils/api";

const MaintanceBaseShow = ({ columns }) => {
  const navigate = useNavigate();
  const role = getDecodedToken()?.role;
  const [maintances, setMaintances] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axiosInstance.get("/maintenances");
      setMaintances(response.data.results);
    } catch (error) {
      toast.error("No se ha podido obtener los mantenimientos");
    }
  };

  const handleChangePage = (event, newPage) => setCurrentPage(newPage);
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(0);
  };

  const onCreate = () => {
    navigate("/dashboard/maintance/create");
  };

  const onFetch = (param) => {};

  const onView = (id) => {
    console.log("...");
  };

  const onEdit = (id) => {
    console.log("...");
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

      const updatedMaintance = maintances.map((maintance) =>
        maintance.id === id ? { ...maintance, vis_main: newStatus } : maintance
      );

      setMaintances(updatedMaintance);
      toast.success(message);
    } catch (error) {
      toast.error("No se ha podido ocultar el mantenimiento");
    }
  };

  const formattedData = maintances.map((maintance) => {
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
      {/* Este box debe ser mandado a un componente, como Head */}
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
            <SearchBar placeholder={`Buscar por código`} onSearch={onFetch} />
          </Box>
        </Box>
      </Box>
      {/* Fin del box */}

      {/* Tabla. Esta también debe ser mandado a otro componente mucho más general */}
      <Box className="flexColumnCenter" paddingTop="20px">
        {formattedData.length > 0 ? (
          <>
            <TableContainer
              className="table-container"
              component={Paper}
              sx={tableStyles.tableContainer}
            >
              <Table>
                <TableHead sx={tableStyles.tableHead}>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell key={column.key}>{column.label}</TableCell>
                    ))}
                    <TableCell align="center">Acciones</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {formattedData
                    .slice(
                      currentPage * rowsPerPage,
                      currentPage * rowsPerPage + rowsPerPage
                    )
                    // item --> un mantenimiento
                    .map((item) => (
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

                          {role === "admin" ? (
                            <IconButton
                              onClick={() => onDelete(item.id, item.vis_main)}
                              color={
                                item.vis_main === "V" ? "secondary" : "sucess"
                              }
                            >
                              {item.vis_main === "V" ? (
                                <Tooltip title="Ocultar">
                                  <VisibilityOffIcon />
                                </Tooltip>
                              ) : (
                                <Tooltip title="Mostrar">
                                  <VisibilityIcon />
                                </Tooltip>
                              )}
                            </IconButton>
                          ) : null}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={formattedData.length}
              page={currentPage}
              rowsPerPage={rowsPerPage}
              rowsPerPageOptions={[3, 5]}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage={
                <span style={tableStyles.labelRowsPerPage}>
                  Filas por página
                </span>
              }
              labelDisplayedRows={() => ""}
              ActionsComponent={(props) => (
                <CustomTablePaginationActions {...props} />
              )}
              sx={tableStyles.pagination}
            />
          </>
        ) : (
          <Typography>No hay mantenimientos registrados.</Typography>
        )}
      </Box>

      {/* Fin table */}
    </div>
  );
};

export default MaintanceBaseShow;
