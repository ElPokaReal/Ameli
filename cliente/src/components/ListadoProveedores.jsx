import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import Tooltip from '@mui/material/Tooltip';

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
  textTransform: 'none', 
}));

const ActionIconButton = styled(IconButton)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const ListadoProveedores = () => {
 const [proveedores, setProveedores] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
    fetch('http://localhost:3000/proveedores')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los proveedores');
        }
        return response.json();
      })
      .then(data => {
        setProveedores(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
 }, []);

 const handleCreateOrder = (cedula) => {
  navigate(`/Orden/${cedula}`);
};

 const handleEdit = (idpro) => {
  navigate(`/editarproveedor/${idpro}`);
};

const handleDelete = (idpro) => {
  try {
    const response = fetch(`http://localhost:3000/proveedores/${idpro}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al borrar al proveedor ${response.statusText}`);
    }
    window.location.reload();

  } catch (error) {
    console.error("Error al eliminar la orden:", error);
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
          <h2 className="text-2xl font-semibold">Listado de Proveedores</h2>
          <Link to="/proveedor">
            <StyledButton variant="contained" color="primary">
              Registrar proveedor 
            </StyledButton>
          </Link>
        </TitleAndButtonContainer>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650, width: '100%' }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Cédula</TableCell>
              <TableCell>Correo</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
            </TableHead>
          {proveedores.length === 0? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>No hay proveedores registrados.</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
            {proveedores.map(proveedores => (
              <StyledTableRow key={proveedores.idpro}>
                <TableCell>{proveedores.nombre}</TableCell>
                <TableCell>{proveedores.apellido}</TableCell>
                <TableCell>{proveedores.cedula}</TableCell>
                <TableCell>{proveedores.email}</TableCell>
                <TableCell>
                <Tooltip title="Editar">
  <ActionIconButton color="primary" onClick={() => handleEdit(proveedores.idpro)}>
    <EditIcon />
  </ActionIconButton>
</Tooltip>
<Tooltip title="Crear Orden de Pago">
<ActionIconButton onClick={() => handleCreateOrder(proveedores.cedula)}>
  <NoteAltIcon />
</ActionIconButton>
</Tooltip>
<Tooltip title="Eliminar">
  <ActionIconButton color="secondary" onClick={() => handleDelete(proveedores.idpro)}>
    <DeleteIcon />
  </ActionIconButton>
</Tooltip>
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

export default ListadoProveedores;