import React,{ useState } from "react";
import PropTypes from "prop-types";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';

const data = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', phone: '123-456-7890' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', phone: '987-654-3210' },
  { id: 3, name: 'Sara Johnson', email: 'sarajohnson@example.com', phone: '555-123-4567' },
];

function SuppliersPageContent({ pathname }) {
   const handleDelete = (id) => {
    console.log(`Deleting user with ID: ${id}`);
    // Lógica de eliminación
  };

  const handleView = (id) => {
    console.log(`Viewing details of user with ID: ${id}`);
    // Lógica para ver detalles
  };

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><Typography variant="h6">Nombre</Typography></TableCell>
            <TableCell><Typography variant="h6">Email</Typography></TableCell>
            <TableCell><Typography variant="h6">Teléfono</Typography></TableCell>
            <TableCell><Typography variant="h6">Acciones</Typography></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.phone}</TableCell>
              <TableCell>
                <Box>
                  <IconButton onClick={() => handleDelete(row.id)} color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleView(row.id)} color="primary" aria-label="view">
                    <InfoIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

SuppliersPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default SuppliersPageContent;
