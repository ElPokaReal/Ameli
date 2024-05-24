import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Typography, CircularProgress } from '@mui/material';
import { useNavigate } from 'react-router-dom';


const FormularioRegistro = ({ tipoRegistro, onRegister, onEdit, initialData, modo }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellido: '',
    cedula: '',
    email: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        nombre: initialData.nombre || '',
        apellido: initialData.apellido || '',
        cedula: initialData.cedula || '',
        email: initialData.email || ''
      });
    }
  }, [initialData]);

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateFields = () => {
    const tempErrors = {};
    const { nombre, apellido, cedula, email } = formData;

    if (!/^[a-zA-Z\s]*$/.test(nombre)) {
      tempErrors.nombre = 'El nombre solo puede contener letras y espacios';
    }

    if (!/^[a-zA-Z\s]*$/.test(apellido)) {
      tempErrors.apellido = 'El apellido solo puede contener letras y espacios';
    }

    if (!/^\d+$/.test(cedula)) {
      tempErrors.cedula = 'La cédula debe ser un número sin espacios';
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      tempErrors.email = 'El correo electrónico no es válido';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validateFields()) return;
    setIsSubmitting(true);

    const dataToSend = {
      nombre: formData.nombre,
      apellido: formData.apellido,
      cedula: formData.cedula,
      email: formData.email
    };

    try {
      if (modo === 'registrar') {
        await onRegister(tipoRegistro, dataToSend);
      } else if (modo === 'editar') {
        await onEdit(event, tipoRegistro, dataToSend);
      }
      handleReset();
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const handleReset = () => {
    setFormData({
    });
    setErrors({});
  };

  return (
    <Box component="form" onSubmit={handleSubmit} onReset={handleReset} noValidate sx={{ mt: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', mx: 'auto' }}>
      <Typography variant="h6" gutterBottom>{modo === 'editar' ? 'Editar' : 'Registrar'} {tipoRegistro.charAt(0).toUpperCase() + tipoRegistro.slice(1)}</Typography>
      {Object.keys(formData).map((field) => (
        <TextField
          key={field}
          name={field}
          variant="outlined"
          margin="normal"
          fullWidth
          label={field.charAt(0).toUpperCase() + field.slice(1)}
          value={formData[field]}
          onChange={handleChange}
          error={!!errors[field]}
          helperText={errors[field]}
          required
        />
        ))}
        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <Button variant="outlined" color="secondary" onClick={() => navigate(-1)}>Cancelar</Button>
          <Button type="submit" variant="contained" color="primary" disabled={isSubmitting}>
            {isSubmitting ? <CircularProgress size={24} /> : (modo === 'editar' ? 'Actualizar' : 'Registrar')}
          </Button>
        </Box>
      </Box>
    );
  };
  
  export default FormularioRegistro;