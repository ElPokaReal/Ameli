import React, { useState } from "react";
import { Box, Button, Container, TextField, Typography, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from '../utils/AuthContext';

function Register() {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [cedula, setCedula] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { login } = useAuth(); // Utiliza el hook useAuth para acceder a la función login

  const handleSubmit = async (e) => {
     e.preventDefault();
     try {
       const response = await fetch('http://localhost:3000/registrar', {
         method: 'POST',
         headers: {
           'Content-Type': 'application/json',
         },
         body: JSON.stringify({ nombre, apellido, cedula, email, password }),
       });
       const data = await response.json();
       if (data.token) {
         login(data.token); // Utiliza la función login para actualizar el estado de autenticación
         navigate("/administracion");
       } else {
         alert("Error en el registro");
       }
     } catch (error) {
       console.error("Error en el registro:", error);
     }
  };

 const handleLogin = () =>{
  navigate('/Login');
 }

  return (
    <Container maxWidth="sm">
    <Box sx={{ mt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Registrarse
        </Typography>
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            label="Nombre"
            variant="outlined"
            fullWidth
            margin="normal"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <TextField
            label="Apellido"
            variant="outlined"
            fullWidth
            margin="normal"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
            required
          />
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
            label="Email"
            variant="outlined"
            fullWidth
            margin="normal"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
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
            
            Registrarse
          </Button>
        </Box>
        <Typography variant="body2" align="center" sx={{ mt: 2 }}>
          ¿Posees una cuenta? <Button variant="text" onClick={handleLogin}>Inicia Sesión</Button>
        </Typography>
      </Paper>
      </Box>
    </Container>
  );
}

export default Register;
