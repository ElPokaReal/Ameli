import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    // Obtener el token del almacenamiento local
    const token = localStorage.getItem('token');

    // Si no hay token, redirigir al usuario a la página de inicio de sesión
    if (!token) {
      navigate('/Login'); // Asegúrate de redirigir a la página de inicio de sesión correcta
    }
  }, [navigate]);

  // Si hay un token, renderizar los children (contenido protegido)
  return localStorage.getItem('token') ? children : null;
}

export default ProtectedRoute;