import {
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import GenericTable from "../../GenericTable";

const AssetModalTable = ({ open, onClose, assets, onAdd }) => {
  console.log(assets);

  if (!assets.length > 0) {
    return <h1>No hay datos.</h1>;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Añadir activos</DialogTitle>
      <DialogContent>
        <GenericTable
          data={assets}
          dataCount={assets.length}
          isDelete={false}
          setIsDelete={() => {}}
        >
          {(currentPageData) => (
            <>
              <TableHead>
                <TableRow>
                  <TableCell>Código</TableCell>
                  <TableCell>Secuencia</TableCell>
                  <TableCell>Acción</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentPageData.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.cod_ass}</TableCell>
                    <TableCell>{row.ser_num_ass}</TableCell>
                    <IconButton onClick={() => onAdd(row)}>
                      <AddIcon />
                    </IconButton>
                  </TableRow>
                ))}
              </TableBody>
            </>
          )}
        </GenericTable>
      </DialogContent>
    </Dialog>
  );
};

export default AssetModalTable;
