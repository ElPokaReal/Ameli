import React from 'react';
import FormularioRegistro from '../components/FormularioRegistro';
import { Paper, Container } from '@mui/material';

const RegistroBeneficiario = () => {
  const handleRegister = async (tipoRegistro, data) => {
    try {
      if (!tipoRegistro) {
        throw new Error('Tipo de registro no definido');
      }
      
      console.log("Tipo de registro:", tipoRegistro);
      console.log("Datos del formulario:", data);
      
      const response = await fetch(`http://localhost:3000/beneficiarios`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        throw new Error('Error al registrar el beneficiario');
      }
      
      console.log("Respuesta del servidor:", response.status);
      alert('Beneficiario registrado exitosamente');
      window.location.href = '/ListadoProveedores';
    } catch (error) {
      console.error("Error durante el registro:", error);
      alert('Error al registrar el beneficiario');
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <FormularioRegistro tipoRegistro="beneficiarios" onRegister={handleRegister} modo="registrar" />
      </Paper>
    </Container>
  );
};

export default RegistroBeneficiario;