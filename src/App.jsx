import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Registro from './pages/Registro';
import Inicio from './pages/Inicio';
import Stock from './pages/Stock';
import Historial from './pages/Historial';
import Ingreso from './pages/Ingreso';
import Consultapieza from './pages/ConsultaPieza';
import Consultaubicacion from './pages/ConsultaUbicacion';
import GeminiAsk from './components/GeminiAsk';
import ExcelUploadPage from './components/ExcelUploadPage';
import ExcelUploadUbi from './components/ExcelUploadUbi';
import RutasProtegidas from './components/RutasProtegidas';
import FormUsuarios from './components/FormUsuarios';
import AdminUsuarios from "./components/AdminUsuarios";
import EditarPlano from './pages/EditarPlano';
import GenerarQR from './pages/GenerarQR';


function App() {
  return (
    <Routes>
      {/* Rutas públicas */}
      <Route path="/" element={<Inicio />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />

      {/* Rutas protegidas, layout se decide dentro de RutasProtegidas */}
      <Route element={<RutasProtegidas />}>
        <Route path="/stock" element={<Stock />} />
        <Route path="/historial" element={<Historial />} />
        <Route path="/ingreso" element={<Ingreso />} />
        
        <Route path="/consultapieza" element={<Consultapieza />} />
        <Route path="/consultapieza/:id?" element={<Consultapieza />} />
        
        <Route path="/consultaubicacion" element={<Consultaubicacion />} />
        <Route path="/geminiask" element={<GeminiAsk />} />
        <Route path="/excelupload" element={<ExcelUploadPage />} />
        <Route path="/exceluploadubi" element={<ExcelUploadUbi />} />
        <Route path="/formusuario" element={<FormUsuarios />} />
        <Route path="/formusuario/:usuario_id" element={<FormUsuarios />} />
        <Route path="/adminusuario" element={<AdminUsuarios />} />

        <Route path="/editarplano" element={<EditarPlano />} />
        <Route path="/editarplano/:id" element={<EditarPlano />} />
        
        <Route path="/generarqr" element={<GenerarQR />} />
        <Route path="/generarqr/:plano" element={<GenerarQR />} />

      </Route>

      {/* Ruta por defecto si no se encuentra ninguna otra */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;