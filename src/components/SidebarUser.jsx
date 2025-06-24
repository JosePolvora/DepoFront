import { Link, useLocation } from 'react-router-dom';
import {
  Search,
  MapPin,
  LogIn,
  Package,
  History,
  Bot,
  Menu,
  X,
} from 'lucide-react';
import { useState } from 'react';

export default function SidebarUser() {
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const links = [
    //{ to: '/', label: 'Inicio', icon: <Home size={20} /> },
    { to: '/consultapieza', label: 'Consultar Diseño', icon: <Search size={20} /> },
    { to: '/consultaubicacion', label: 'Consultar Ubicación', icon: <MapPin size={20} /> },
    { to: '/ingreso', label: 'Ingreso', icon: <LogIn size={20} /> },
    { to: '/stock', label: 'Stock', icon: <Package size={20} /> },
    { to: '/historial', label: 'Historial', icon: <History size={20} /> },
    { to: '/geminiask', label: 'Preguntas AI', icon: <Bot size={20} /> },
  ];

  return (
    <>
      {/* Botón hamburguesa para móvil */}
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
        {/* Header móvil con botón cerrar */}
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

        {/* Título escritorio */}
        <h2 className="hidden md:block text-2xl font-bold mb-6 text-orange-500">Menú</h2>

        <nav className="flex flex-col gap-2">
          {links.map(({ to, label, icon }) => {
            const isActive = location.pathname === to;
            return (
              <Link
                key={to}
                to={to}
                onClick={() => setOpen(false)} // cierra menú en móvil al click
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
