import React from 'react';
import { Button } from '@mui/material';

function CustomButton({ label, onClick }) {
  return (
    <Button
      type="submit"  // Este tipo sigue funcionando si lo usas dentro de un formulario
      variant="outlined"
      color="info"
      size="small"
      disableElevation
      fullWidth
      sx={{ my: 2 }}
      onClick={onClick}  // Asegúrate de pasar el evento onClick al componente Button
    >
      {label}
    </Button>
  );
}

export default CustomButton;
