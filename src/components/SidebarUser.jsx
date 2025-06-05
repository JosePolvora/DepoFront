import { Link, useLocation } from 'react-router-dom';
import {
    Search,
    MapPin,
    LogIn,
    Package,
    History,
    Bot,
} from 'lucide-react';


export default function SidebarUser() {
    const location = useLocation();

    const links = [
        //{ to: '/', label: 'Inicio', icon: <Home size={20} /> }, // Puedes descomentar si necesitas un enlace de inicio
        { to: '/consultapieza', label: 'Consultar Diseño', icon: <Search size={20} /> },
        { to: '/consultaubicacion', label: 'Consultar Ubicación', icon: <MapPin size={20} /> },
        { to: '/ingreso', label: 'Ingreso', icon: <LogIn size={20} /> },
        { to: '/stock', label: 'Stock', icon: <Package size={20} /> },
        { to: '/historial', label: 'Historial', icon: <History size={20} /> },
        { to: '/geminiask', label: 'Preguntas AI', icon: <Bot size={20} /> },
        //{ to: '/editarplano', label: 'Mover Plano', icon: <Package size={20} /> },
    ];

    return (
        <aside className="w-64 bg-zinc-900 text-white min-h-screen p-4 border-r-2 border-orange-500 shadow-lg"> {/* Fondo oscuro y borde naranja */}
            <h2 className="text-2xl font-bold mb-6 text-orange-500">Menú</h2> {/* Título naranja, más grande */}
            <nav className="flex flex-col gap-2">
                {links.map((link) => {
                    const isActive = location.pathname === link.to;
                    return (
                        <Link
                            key={link.to}
                            to={link.to}
                            className={`flex items-center gap-3 py-2 px-3 rounded transition duration-200 ease-in-out
                                ${isActive
                                    ? 'bg-orange-600 text-black font-semibold shadow-md' // Estilo para el enlace activo: fondo naranja, texto negro, con sombra
                                    : 'text-zinc-300 hover:bg-zinc-700 hover:text-white' // Estilo para enlaces inactivos: texto gris claro, hover a gris oscuro
                                }`}
                        >
                            {link.icon}
                            <span>{link.label}</span>
                        </Link>
                    );
                })}
            </nav>
        </aside>
    );
}