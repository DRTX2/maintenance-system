import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import VisibilityIcon from "@mui/icons-material/Visibility";

const CategoryTable = ({ array, onSee, onDelete }) => {
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Código</TableCell>
            <TableCell>Nombre</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {array.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.cod_dis}</TableCell>
              <TableCell>{item.nom_dis}</TableCell>
              <TableCell>
                <IconButton onClick={() => onSee(item.id)} color="primary">
                  <VisibilityIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(item.id)} color="secondary">
                  <DeleteForeverIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default CategoryTable;
