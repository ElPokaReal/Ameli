import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import DeleteIcon from '@mui/icons-material/Delete';
import PrintIcon from '@mui/icons-material/Print';

// Estilos personalizados para la tabla
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
}));

const TitleAndButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between', // Distribuye los elementos entre sí
  alignItems: 'center', // Centra verticalmente los elementos
  backgroundColor: theme.palette.background.paper, // Fondo blanco
  padding: theme.spacing(2), // Padding alrededor del contenido
  borderRadius: theme.shape.borderRadius, // Esquinas redondeadas
  width: '100%', // Asegura que el contenedor ocupe todo el ancho disponible
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // Hover styles
  '&:hover': {
    backgroundColor: theme.palette.action.selected,
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
  padding: theme.spacing(1),
  borderRadius: theme.shape.borderRadius,
  textTransform: 'none', // Prevents uppercase transformation
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ListadoOrdenes = () => {
 const [ordenes, setOrdenes] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);

 useEffect(() => {
    fetch('http://localhost:3000/ordenes_pago')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar las órdenes de pago');
        }
        return response.json();
      })
      .then(data => {
        setOrdenes(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
 }, []);

 const handleEdit = (id) => {
  // Implementa la lógica para editar la orden con el id dado
};

const handleDelete = (id) => {
  try {
    const response = fetch(`http://localhost:3000/ordenes_pago/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al borrar la orden de pago ${response.statusText}`);
    }
    window.location.reload();
  } catch (error) {
    console.error("Error al eliminar la orden:", error);
  }
};

const handlePrint = async (id) => {
  try {
    // Realiza una solicitud GET a la ruta '/generar_orden/:id'
    const response = await fetch(`http://localhost:3000/generar_orden/${id}`);
    
    if (!response.ok) {
      throw new Error(`Error al intentar obtener la orden: ${response.statusText}`);
    }
    
    // Asumiendo que la respuesta es un archivo PDF directamente
    const blob = await response.blob();
    
    // Crea un objeto URL para el blob
    const url = window.URL.createObjectURL(blob);
    
    // Abre el PDF en una nueva pestaña del navegador
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `orden_${id}.pdf`);
    document.body.appendChild(link);
    link.click();
    
    // Limpia el objeto URL creado
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error("Error al intentar imprimir la orden:", error);
  }
};

 if (loading) {
  return <div>Cargando...</div>;
}

if (error) {
  return <div>Error: {error}</div>;
}

return (
  <div>
    <Navbar />
    <div className="p-4 md:p-8">
    <TitleAndButtonContainer>
  <h2 className="text-2xl font-semibold">Listado de Órdenes de Pago</h2>
    <StyledButton variant="contained" color="primary">
      Generar Reporte
    </StyledButton>
</TitleAndButtonContainer>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Financiamiento</TableCell>
              <TableCell>Rif o Cédula</TableCell>
              <TableCell>Concepto</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          {ordenes.length === 0? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>No hay órdenes registradas.</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
              {ordenes.map(orden => (
                <StyledTableRow key={orden.id}>
                  <TableCell>{orden.financiamiento}</TableCell>
                  <TableCell>{orden.rif_ci}</TableCell>
                  <TableCell>{orden.concepto}</TableCell>
                  <TableCell>{orden.total}</TableCell>
                  <TableCell>
                    <ActionIconButton color="secondary" onClick={() => handleDelete(orden.id)}>
                      <DeleteIcon />
                    </ActionIconButton>
                    <ActionIconButton onClick={() => handlePrint(orden.id)}>
                      <PrintIcon />
                    </ActionIconButton>
                  </TableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </StyledTableContainer>
    </div>
  </div>
);
};

export default ListadoOrdenes;