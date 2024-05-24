import React from 'react';
import Navbar from '../components/Navbar';

import '../administracion.css'; // Asegúrate de importar el archivo CSS

function Administracion() {
 return (
    <>
      <div className="navbar">
        <Navbar />
      </div>
      
      <div className="main-content">
        Menu de Administración
      </div>
    </>
 );
}

export default Administracion;