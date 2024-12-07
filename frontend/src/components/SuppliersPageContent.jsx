import React,{ useState, useEffect } from "react";
import PropTypes from "prop-types";
import {
  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, IconButton, Modal, Typography, Box
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';
import axios from "axios";


const axiosInstance = axios.create({
  baseURL: 'http://localhost:8000/api/suppliers/',  
  headers: {
    'Content-Type': 'application/json',  
    // 'Authorization': `Bearer ${YOUR_TOKEN}`,
  }
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

function SuppliersPageContent({ pathname }) {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false); 
  const [selectedSupplier, setSelectedSupplier] = useState(null);

  useEffect(() => {

    const getSuppliers=async ()=> {
      try{
        const responseData= await fetch('http://localhost:8000/api/suppliers/');
        const response = await responseData.json();
        // console.log(response);
        if(!responseData.ok)
          throw new Error("Error en la peticion");
        setSuppliers(response.results);
      }catch(err){
        console.log(err);
      }
    }
    getSuppliers();
  }, []);

   const handleDelete = (id) => {
    axiosInstance.delete(`/${id}`);
  };

  const handleOpen = (supplier) => {
    setSelectedSupplier(supplier);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedSupplier(null);
  };


  return (
    <>
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
          {suppliers.map((supplier) => (
            <TableRow key={supplier.id}>
              <TableCell>{supplier.nam_sup}</TableCell>
              <TableCell>{supplier.ema_sup}</TableCell>
              <TableCell>{supplier.pho_sup}</TableCell>
              <TableCell>
                <Box>
                  <IconButton onClick={() => handleDelete(supplier.id)} color="error" aria-label="delete">
                    <DeleteIcon />
                  </IconButton>
                  <IconButton onClick={() => handleOpen(supplier)} color="primary" aria-label="view">
                    <InfoIcon />
                  </IconButton>
                </Box>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={{ ...style, width: 400 }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Detalles del Proveedor
      </Typography>
      {selectedSupplier && (
        <>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <strong>Nombre:</strong> {selectedSupplier.nam_sup}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Email:</strong> {selectedSupplier.ema_sup}
          </Typography>
          <Typography sx={{ mt: 1 }}>
            <strong>Teléfono:</strong> {selectedSupplier.pho_sup}
          </Typography>
        </>
      )}
    </Box>
  </Modal>
  </>
  );
}

SuppliersPageContent.propTypes = {
  pathname: PropTypes.string.isRequired,
};

export default SuppliersPageContent;
