import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import '../administracion.css'; // Asegúrate de importar el archivo CSS

// Estilos personalizados para la tabla
const StyledTableContainer = styled(TableContainer)({
 marginTop: '20px',
 marginBottom: '20px',
});

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

 if (loading) {
    return <div>Cargando...</div>;
 }

 if (error) {
    return <div>Error: {error}</div>;
 }

 return (
    <div>
    <div className="navbar">
        <Navbar />
      </div>
      <div className="main-content">
      <h2>Listado de Órdenes de Pago</h2>
      <StyledTableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell>Financiamiento</TableCell>
              <TableCell>Rif o Cédula</TableCell>
              <TableCell>Concepto</TableCell>
              <TableCell>Total</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ordenes.map(orden => (
                <TableRow key={orden.id}>
                <TableCell>{orden.id}</TableCell>
                <TableCell>{orden.financiamiento}</TableCell>
                <TableCell>{orden.rif_ci}</TableCell>
                <TableCell>{orden.concepto}</TableCell>
                <TableCell>{orden.total}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </StyledTableContainer>
      <Link to="/orden">
        <Button variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Crear nueva orden de pago
        </Button>
      </Link>
            </div>
      <div className="footer">
        <Footer />
      </div>
    </div>
 );
};

export default ListadoOrdenes;