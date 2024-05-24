import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext'; // Asegúrate de importar useAuth desde la ubicación correcta



function Login() {
  const [cedula, setCedula] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth(); // Utiliza el hook useAuth para acceder a la función login

  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await fetch('http://localhost:3000/login', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ cedula, password }),
       });
       const data = await response.json();
       if (data.token) {
         login(data.token); // Utiliza la función login para actualizar el estado de autenticación
         navigate('/');
       } else {
         alert("Error en el inicio de sesión");
       }
     } catch (error) {
       console.error("Error en el inicio de sesión:", error);
     }
  };

 const handleRegister = () =>{
  navigate('/Register');
 }

 return (
  <Container maxWidth="sm">
    <Box sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box component="form" onSubmit={handleSubmit}>
      <Typography variant="h4" align="center" gutterBottom>
        Iniciar Sesión
      </Typography>
          <TextField
            label="Cédula de Identidad"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cedula}
            onChange={(e) => setCedula(e.target.value)}
            required
          />
          <TextField
            label="Contraseña"
            variant="outlined"
            fullWidth
            margin="normal"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
            Iniciar Sesión
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿No tienes cuenta? <Button variant="text" onClick={handleRegister}>Regístrate</Button>
        </Typography>
      </Paper>
    </Box>
  </Container>
);
}

export default Login;