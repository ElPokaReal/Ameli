import React from 'react';
import FormularioRegistro from '../components/FormularioRegistro';
import { Paper, Container } from '@mui/material';

const RegistroProveedor = () => {
  const handleRegister = async (tipoRegistro, data) => {
    console.log("Datos enviados al servidor:", JSON.stringify(data)); // Verifica cómo se ve el JSON
    try {
      if (!tipoRegistro) {
        throw new Error('Tipo de registro no definido');
      }

      const response = await fetch(`http://localhost:3000/proveedores`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Error al registrar el proveedor');
      }
      alert('Proveedor registrado exitosamente');
      window.location.href = '/ListadoProveedores';
    } catch (error) {
      console.error(error);
      alert('Error al registrar el proveedor');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <FormularioRegistro tipoRegistro="proveedores" onRegister={handleRegister} modo="registrar" />
      </Paper>
    </Container>
  );
};
export default RegistroProveedor;