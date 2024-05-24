import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button, IconButton  } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import EditIcon from '@mui/icons-material/Edit';
import NoteAltIcon from '@mui/icons-material/NoteAlt';
import DeleteIcon from '@mui/icons-material/Delete';
import Tooltip from '@mui/material/Tooltip';

// Estilos personalizados para la tabla
const StyledTableContainer = styled(TableContainer)(({ theme }) => ({
  marginTop: theme.spacing(3),
  marginBottom: theme.spacing(3),
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
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

const TitleAndButtonContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between', // Distribuye los elementos entre sí
  alignItems: 'center', // Centra verticalmente los elementos
  backgroundColor: theme.palette.background.paper, // Fondo blanco
  padding: theme.spacing(2), // Padding alrededor del contenido
  borderRadius: theme.shape.borderRadius, // Esquinas redondeadas
  width: '100%', // Asegura que el contenedor ocupe todo el ancho disponible
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

const ListadoBeneficiarios = () => {
 const [beneficiarios, setBeneficiarios] = useState([]);
 const [loading, setLoading] = useState(true);
 const [error, setError] = useState(null);
 const navigate = useNavigate();

 useEffect(() => {
    fetch('http://localhost:3000/beneficiarios')
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al cargar los beneficiarios');
        }
        return response.json();
      })
      .then(data => {
        setBeneficiarios(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error:', error);
        setError(error.message);
        setLoading(false);
      });
 }, []);

 const handleEdit = (idbene) => {
  navigate(`/editarbeneficiario/${idbene}`);
};

const handleDelete = (idbene) => {
  try {
    const response = fetch(`http://localhost:3000/beneficiarios/${idbene}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Error al borrar al beneficiario ${response.statusText}`);
    }
    window.location.reload();


  } catch (error) {
    console.error("Error al eliminar la orden:", error);
  }
};

const handleCreateOrder = (cedula) => {
  navigate(`/Orden/${cedula}`);
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
          <h2 className="text-2xl font-semibold">Listado de Beneficiarios</h2>
          <Link to="/beneficiario">
            <StyledButton variant="contained" color="primary">
              Registrar beneficiario 
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
          {beneficiarios.length === 0? (
            <TableBody>
              <TableRow>
                <TableCell colSpan={6}>No hay beneficiarios registrados.</TableCell>
              </TableRow>
            </TableBody>
          ) : (
            <TableBody>
            {beneficiarios.map(beneficiarios => (
              <StyledTableRow key={beneficiarios.idbene}>
                <TableCell>{beneficiarios.nombre}</TableCell>
                <TableCell>{beneficiarios.apellido}</TableCell>
                <TableCell>{beneficiarios.cedula}</TableCell>
                <TableCell>{beneficiarios.email}</TableCell>
                <TableCell>
                <Tooltip title="Editar">
  <ActionIconButton color="primary" onClick={() => handleEdit(beneficiarios.idbene)}>
    <EditIcon />
  </ActionIconButton>
</Tooltip>
<Tooltip title="Crear Orden de Pago">
<ActionIconButton onClick={() => handleCreateOrder(beneficiarios.cedula)}>
  <NoteAltIcon />
</ActionIconButton>
</Tooltip>
<Tooltip title="Eliminar">
  <ActionIconButton color="secondary" onClick={() => handleDelete(beneficiarios.idbene)}>
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

export default ListadoBeneficiarios;