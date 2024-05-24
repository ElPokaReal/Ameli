import React, { useEffect, useState } from 'react';
import FormularioRegistro from '../components/FormularioRegistro';
import { Paper, Container } from '@mui/material';
import { useParams } from 'react-router-dom';

const EdicionBeneficiario = () => {
  const { idbene } = useParams();
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    const fetchBeneficiario = async () => {
      const response = await fetch(`http://localhost:3000/beneficiarios/${idbene}`);
      const data = await response.json();
      setInitialData(data);
    };

    fetchBeneficiario();
  }, [idbene]);

  const handleEdit = async (event, tipoRegistro, data) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const dataToSend = {
      nombre: formData.get('nombre'),
      apellido: formData.get('apellido'),
      cedula: formData.get('cedula'), // Asumiendo que el campo se llama 'cedula'
      email: formData.get('email'),
    };
  
    try {
      const response = await fetch(`http://localhost:3000/beneficiarios/${idbene}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
  
      if (!response.ok) {
        let errorMessage = await response.text(); // Obtiene el mensaje de error del servidor
        if (errorMessage.includes("Ya existe un beneficiario")) {
          alert('Ya existe un beneficiario con el mismo nombre, apellido y cédula.');
          window.location.reload();
        } else {
          throw new Error(errorMessage); // Propaga el error si no es el esperado
        }
      } else {
        alert('Beneficiario actualizado exitosamente');
        window.location.href = '/ListadoBeneficiarios';
    }
    } catch (error) {
      console.error(error);
      alert('Error al actualizar el beneficiario: ' + error.message);
    }
  };

  return (
    <Container component="main" maxWidth="sm" sx={{ mb: 4 }}>
      <Paper elevation={6} sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        {initialData ? (
            <FormularioRegistro tipoRegistro="beneficiarios" onEdit={handleEdit} initialData={initialData} modo="editar"/>
        ) : (
          <div>Cargando datos del beneficiario...</div>
        )}
      </Paper>
    </Container>
  );
};

export default EdicionBeneficiario;