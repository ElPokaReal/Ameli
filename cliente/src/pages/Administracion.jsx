import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
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
      
      <div className="footer">
        <Footer />
      </div>
    </>
 );
}

export default Administracion;