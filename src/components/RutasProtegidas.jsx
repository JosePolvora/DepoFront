// src/components/RutasProtegidas.jsx
import { Navigate, Outlet } from 'react-router-dom';
import LayoutAdmin from '../layouts/LayoutAdmin';
import LayoutUser from '../layouts/LayoutUser';

export default function RutasProtegidas() {
  const usuario = JSON.parse(localStorage.getItem('usuario'));

  if (!usuario) return <Navigate to="/login" replace />;

  if (usuario.rol === 'Administrador') {
    return (
      <LayoutAdmin>
        <Outlet />
      </LayoutAdmin>
    );
  }

  if (usuario.rol === 'Usuario') {
    return (
      <LayoutUser>
        <Outlet />
      </LayoutUser>
    );
  }

  return <Navigate to="/" replace />;
}
