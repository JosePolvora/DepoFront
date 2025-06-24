import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  MapPin,
  LogIn,
  Package,
  History,
  Bot,
  Database,
  ArrowDownCircle,
  User,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

function ImportDatabaseIcon() {
  return (
    <div className="relative w-6 h-6">
      <Database size={20} className="text-white" />
      <ArrowDownCircle size={12} className="absolute bottom-0 right-0 text-green-400" />
    </div>
  );
}

export default function Sidebar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    { to: '/consultapieza', label: 'Consultar Diseño', icon: <Search size={20} /> },
    { to: '/consultaubicacion', label: 'Consultar Ubicación', icon: <MapPin size={20} /> },
    { to: '/ingreso', label: 'Ingreso', icon: <LogIn size={20} /> },
    { to: '/stock', label: 'Stock', icon: <Package size={20} /> },
    { to: '/historial', label: 'Historial', icon: <History size={20} /> },
    { to: '/geminiask', label: 'Preguntas AI', icon: <Bot size={20} /> },
    { to: '/excelupload', label: 'Importar Planos', icon: <ImportDatabaseIcon /> },
    { to: '/exceluploadubi', label: 'Importar Ubicaciones', icon: <ImportDatabaseIcon /> },
    { to: '/formusuario', label: 'Editor de Usuarios', icon: <User size={20} /> },
    { to: '/adminusuario', label: 'Gestor de Usuarios', icon: <User size={20} /> },
  ];

  return (
    <>
      {/* Botón hamburguesa móvil */}
      <button
        onClick={() => setOpen(true)}
        className="fixed top-4 left-4 z-50 p-2 rounded-md bg-orange-500 text-white md:hidden"
        aria-label="Abrir menú"
      >
        <Menu size={24} />
      </button>

      {/* Overlay móvil */}
      {open && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 bg-zinc-900 text-white border-r-2 border-orange-500 shadow-lg p-4
          w-64 min-h-screen

          transform transition-transform duration-300 ease-in-out
          ${open ? 'translate-x-0' : '-translate-x-full'}

          md:translate-x-0 md:static md:flex md:flex-col md:min-h-screen
        `}
      >
        {/* Header con botón cerrar solo en móvil */}
        <div className="flex items-center justify-between mb-6 md:hidden">
          <h2 className="text-2xl font-bold text-orange-500">Menú</h2>
          <button
            onClick={() => setOpen(false)}
            className="text-orange-500 hover:text-orange-400"
            aria-label="Cerrar menú"
          >
            <X size={24} />
          </button>
        </div>

        {/* Título solo escritorio */}
        <h2 className="hidden md:block text-2xl font-bold mb-6 text-orange-500">Menú</h2>

        <nav className="flex flex-col gap-2">
          {links.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)} // cierra sidebar en móvil al click
                className={`flex items-center gap-3 py-2 px-3 rounded transition duration-200 ease-in-out
                  ${isActive
                    ? 'bg-orange-600 text-black font-semibold shadow-md'
                    : 'text-zinc-300 hover:bg-zinc-700 hover:text-white'
                  }`}
              >
                {icon}
                <span>{label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
}

