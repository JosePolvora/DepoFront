import { useNavigate } from "react-router-dom";
import { LogOut, LogIn } from 'lucide-react';

export default function Header() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem("usuario"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const handleLoginRedirect = () => {
    navigate("/login");
  };

  return (
    <header className="bg-zinc-800 border-b-2 border-orange-500 p-4 shadow-lg flex flex-col md:flex-row justify-between items-center gap-4 text-white">
      <h1 className="text-lg md:text-xl font-bold text-orange-500 text-center md:text-left">
        {usuario?.rol === 'Administrador' ? 'Panel de Administración' : 'Panel de Usuario'}
      </h1>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4">
        {usuario && (
          <span className="text-yellow-200 text-sm md:text-md text-center sm:text-left">
            Hola {usuario.nombre} {usuario.apellido}
          </span>
        )}

        {usuario ? (
          <button
            onClick={handleLogout}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-md 
                       bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 
                       text-black font-semibold shadow-md transition duration-200
                       focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 w-full sm:w-auto"
          >
            <LogOut size={18} />
            Cerrar sesión
          </button>
        ) : (
          <button
            onClick={handleLoginRedirect}
            className="flex items-center justify-center gap-2 py-2 px-4 rounded-md 
                       bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 
                       text-black font-semibold shadow-md transition duration-200
                       focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 w-full sm:w-auto"
          >
            <LogIn size={18} />
            Iniciar sesión
          </button>
        )}
      </div>
    </header>
  );
}
