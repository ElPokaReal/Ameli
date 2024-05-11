import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "../src/utils/AuthContext";
import ProtectedRoute from "../src/utils/ProtectedRoute";

// Páginas
import Principal from "./pages/Principal";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Administracion from "./pages/Administracion";
import Orden from "./pages/Orden";
import ListadoOrdenes from "./components/ListadoOrdenes";
import ListadoBeneficiarios from "./components/ListadoBeneficiarios";
import ListadoProveedores from "./components/ListadoProveedores";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<Navigate replace to="/" />} />
          <Route index element={<Principal />} />
          <Route path="Login" element={<Login />} />
          <Route path="Register" element={<Register />} />
          <Route
            path="Administracion"
            element={
              <ProtectedRoute>
                <Administracion />
              </ProtectedRoute>
            }
          />
          <Route
            path="Orden"
            element={
              <ProtectedRoute>
                <Orden />
              </ProtectedRoute>
            }
          />
                    <Route
            path="ListadoOrdenes"
            element={
              <ProtectedRoute>
                <ListadoOrdenes />
              </ProtectedRoute>
            }
          />
                              <Route
            path="ListadoProveedores"
            element={
              <ProtectedRoute>
                <ListadoProveedores />
              </ProtectedRoute>
            }
          />
                              <Route
            path="ListadoBeneficiarios"
            element={
              <ProtectedRoute>
                <ListadoBeneficiarios />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
