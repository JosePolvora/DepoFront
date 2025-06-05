import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

export default function ConsultaStock() {
  const [busqueda, setBusqueda] = useState('');
  const [planos, setPlanos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);

  const navigate = useNavigate();



  useEffect(() => {
    const obtenerPlanos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/planoStock');

        if (response.data.ok && Array.isArray(response.data.body)) {
          console.log('Datos planos:', response.data.body); // ✅ Log seguro
          setPlanos(response.data.body || []);

        } else {
          console.warn('Respuesta inesperada de la API:', response.data); // ⚠️ En caso de error lógico
        }

      } catch (error) {
        console.error('Error al obtener planos:', error); // ❌ En caso de error de red
      }
    };

    obtenerPlanos();
  }, []);





  const planosFiltrados = planos.filter((plano) =>
    plano.plano.toLowerCase().includes(busqueda.toLowerCase()) ||
    plano.denominacion?.toLowerCase().includes(busqueda.toLowerCase())
  );

  const totalPaginas = Math.ceil(planosFiltrados.length / ITEMS_PER_PAGE);
  const planosPaginados = planosFiltrados.slice(
    (paginaActual - 1) * ITEMS_PER_PAGE,
    paginaActual * ITEMS_PER_PAGE
  );

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Stock</h2>
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Buscar por número o denominación..."
            className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1); // Reiniciar página al buscar
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-4xl mx-auto">
        {planosFiltrados.length === 0 ? (
          <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
            <thead className="bg-zinc-700 text-yellow-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plano</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Denominación</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Origen</th>
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock Total</th>

              </tr>
            </thead>
            <tbody className="bg-zinc-900 divide-y divide-zinc-700">
              {planosPaginados.map((plano) => {

                return (
                  <tr className="hover:bg-zinc-700" key={plano.plano_id}>

                    <td
                      className="px-6 py-4 text-sm text-orange-400 underline cursor-pointer hover:text-orange-300"
                      onClick={() => navigate('/consultapieza')}
                    >
                      {plano.plano}
                    </td>

                    <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
                    <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
                    <td className="px-6 py-4 text-sm text-yellow-200">{plano.stock_total}</td>


                  </tr>
                );
              })}
            </tbody>
          </table>
        )}

        {/* Paginación */}
        {totalPaginas > 1 && (
          <div className="flex justify-center mt-6 gap-2">
            <button
              className="px-4 py-2 bg-orange-500 text-black rounded disabled:opacity-50"
              onClick={() => cambiarPagina(paginaActual - 1)}
              disabled={paginaActual === 1}
            >
              Anterior
            </button>
            <span className="text-yellow-200 px-4 py-2">
              Página {paginaActual} de {totalPaginas}
            </span>
            <button
              className="px-4 py-2 bg-orange-500 text-black rounded disabled:opacity-50"
              onClick={() => cambiarPagina(paginaActual + 1)}
              disabled={paginaActual === totalPaginas}
            >
              Siguiente
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
