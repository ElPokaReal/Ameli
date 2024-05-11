import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useAuth } from '../utils/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
 const { isAuthenticated, logout } = useAuth();
 const navigate = useNavigate();

 const handleLogout = () => {
    logout();
    navigate('/');
 };

 const handleLogin = () => {
    navigate('/Login');
 };

 return (
    <AppBar position="static" sx={{ bgcolor: "gray" }} enableColorOnDark={true}>
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Alcaldía Pampán
        </Typography>
        {!isAuthenticated && (
          <Button color="inherit" onClick={handleLogin}>Iniciar sesión</Button>
        )}
        {isAuthenticated && (
          <>
            <Button color="inherit" onClick={() => navigate('/Beneficiarios')}>Listado de Beneficiarios</Button>
            <Button color="inherit" onClick={() => navigate('/Proveedores')}>Proveedores</Button>
            <Button color="inherit" onClick={() => navigate('/ListadoOrdenes')}>Ordenes de Pago</Button>
            <Button color="inherit" onClick={handleLogout}>Cerrar Sesión</Button>
          </>
        )}
      </Toolbar>
    </AppBar>
 );
};

export default Navbar;