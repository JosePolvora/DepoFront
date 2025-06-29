import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, Trash2, Plus } from 'lucide-react';
import axios from 'axios';
import Swal from 'sweetalert2';

function Usuario() {
  const [loading, setLoading] = useState(true);
  const [usuarios, setUsuarios] = useState([]);
  const [busqueda, setBusqueda] = useState('');
  const navigate = useNavigate();

  const cargarUsuarios = async () => {
    try {
      const respuesta = await axios.get('http://localhost:3000/api/usuarios');
      if (respuesta.status === 200 && respuesta.data?.body) {
        setUsuarios(respuesta.data.body);
      } else {
        console.error("Error en la estructura de la respuesta");
        setUsuarios([]);
      }
    } catch (error) {
      console.error("Error al cargar usuarios", error);
      setUsuarios([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const borrarUsuario = async (usuario_id) => {
    const { isConfirmed } = await Swal.fire({
      title: '¿Estás seguro?',
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, borrar',
      cancelButtonText: 'Cancelar'
    });

    if (isConfirmed) {
      try {
        await axios.delete(`http://localhost:3000/api/usuarios/${usuario_id}`);
        await cargarUsuarios();
        Swal.fire({
          icon: 'success',
          title: 'Eliminado',
          text: 'Usuario eliminado correctamente.',
          timer: 2000,
          showConfirmButton: false
        });
      } catch (error) {
        console.error("Error al borrar usuario", error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Ocurrió un error al intentar borrar el usuario.'
        });
      }
    }
  };

  const usuariosFiltrados = usuarios.filter(usuario =>
    usuario.legajo?.toString().includes(busqueda)
  );

  return (
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 sm:p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-4 sm:p-8 w-full max-w-6xl">
        <h2 className='text-center mb-6 sm:mb-8 text-xl sm:text-2xl font-bold text-orange-500'>
          Gestor de Usuarios
        </h2>

        <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4'>
          <input
            type="text"
            className="bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 w-full sm:max-w-sm focus:outline-none focus:border-orange-500"
            placeholder="Buscar por legajo..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
          <button
            className='text-yellow-200 p-2 border border-yellow-200 rounded-md hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75'
            onClick={() => navigate(`/formusuario/`)}
            title="Agregar nuevo usuario"
          >
            <Plus size={18} />
          </button>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
            <div className='p-4 mt-6 text-center text-white bg-orange-500 rounded-md'>
              Cargando usuarios...
            </div>
          ) : (
            <table className="min-w-full text-sm divide-y divide-zinc-700 text-white">
              <thead className="bg-zinc-800 text-yellow-200">
                <tr>
                  <th className="px-4 py-3 text-left uppercase tracking-wider">Nombre</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider">Apellido</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider">Sector</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider">Legajo</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider">Rol</th>
                  <th className="px-4 py-3 text-left uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-900 divide-y divide-zinc-700">
                {usuariosFiltrados.length > 0 ? usuariosFiltrados.map((usuario) => (
                  <tr className="hover:bg-zinc-700" key={usuario.usuario_id}>
                    <td className="px-4 py-4 whitespace-nowrap text-yellow-200">{usuario.nombre}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-yellow-200">{usuario.apellido}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-yellow-200">{usuario.sector}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-yellow-200">{usuario.legajo}</td>
                    <td className="px-4 py-4 whitespace-nowrap text-yellow-200">
                      {usuario.rol?.nombre || 'Sin rol'}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex gap-2">
                        <button
                          className='text-yellow-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-opacity-75'
                          onClick={() => navigate(`/formusuario/${usuario.usuario_id}`)}
                          title="Editar"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          className='text-yellow-200 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-75'
                          onClick={() => borrarUsuario(usuario.usuario_id)}
                          title="Borrar"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                )) : (
                  <tr>
                    <td colSpan="6" className="text-center py-4 text-gray-400">No hay usuarios activos</td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}

export default Usuario;
