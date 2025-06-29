import { useState, useEffect } from 'react';
import axios from 'axios';

function PaginaHistorial() {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('fecha');
  const [sortAsc, setSortAsc] = useState(false); // false para descendente inicialmente

  useEffect(() => {
    async function fetchData() {
      try {
        const resHistorial = await axios.get('http://localhost:3000/api/historiales');

        if (resHistorial.data.ok) {
          setHistorialMovimientos(resHistorial.data.body);
        } else {
          setError('Error en la respuesta del servidor');
        }
      } catch (err) {
        setError('Error al cargar datos.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Función para cambiar el orden al hacer click en "Fecha"
  const handleSort = () => {
    if (sortBy === 'fecha') {
      setSortAsc(!sortAsc);
    } else {
      setSortBy('fecha');
      setSortAsc(false); // Siempre descendente al seleccionar
    }
  };

  // Ordenar la lista según sortBy y sortAsc
  const sortedHistorial = [...historialMovimientos].sort((a, b) => {
    if (sortBy === 'fecha') {
      return sortAsc
        ? new Date(a.fecha) - new Date(b.fecha)
        : new Date(b.fecha) - new Date(a.fecha);
    }
    return 0;
  });

  if (loading)
    return <div className="text-white text-center p-6">Cargando historial...</div>;

  if (error)
    return <div className="text-red-500 text-center p-6">{error}</div>;

  return (
    <div className="bg-zinc-900 min-h-screen p-4 sm:p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-6 w-full max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6 pt-2">
          Historial de Movimientos de Stock
        </h2>

        {historialMovimientos.length === 0 ? (
          <p className="text-white text-center">No hay movimientos en el historial.</p>
        ) : (
          <div className="overflow-x-auto">
            {/* <table className="min-w-full bg-zinc-700 rounded-md text-white border-separate border-spacing-0"> */}
            <table className="min-w-full bg-zinc-700 rounded-md text-white border-separate border-spacing-0 text-xs sm:text-sm">

              <thead>
                <tr>
                  <th
                    onClick={handleSort}
                    className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap cursor-pointer select-none"
                    title="Ordenar por fecha"
                  >
                    Fecha {sortBy === 'fecha' ? (sortAsc ? '▲' : '▼') : ''}
                  </th>
                  <th className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap">
                    Plano
                  </th>
                  <th className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap">
                    Denominación
                  </th>
                  <th className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap">
                    Ubicación
                  </th>
                  <th className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap">
                    Cantidad
                  </th>
                  <th className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap">
                    Tipo
                  </th>
                  <th className="py-2 px-3 border-b border-zinc-600 text-left whitespace-nowrap">
                    Usuario
                  </th>
                </tr>
              </thead>
              <tbody>
                {sortedHistorial.map((mov) => {
                  const cantidad = mov.ingreso?.cantidad || mov.egreso?.cantidad || '-';
                  const tipoMovimiento = mov.ingreso
                    ? mov.ingreso.tipoMovimiento
                    : mov.egreso?.tipoMovimiento || 'Desconocido';

                  const usuario = mov.usuario
                    ? `${mov.usuario.nombre} ${mov.usuario.apellido}`
                    : '-';

                  return (
                    <tr key={mov.historial_id} className="hover:bg-zinc-600">
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {new Date(mov.fecha).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {mov.plano?.plano || '-'}
                      </td>
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {mov.plano?.denominacion || '-'}
                      </td>
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {mov.ubicacion?.codigo || '-'}
                      </td>
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {cantidad}
                      </td>
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {tipoMovimiento}
                      </td>
                      <td className="py-2 px-3 border-b border-zinc-600 whitespace-nowrap">
                        {usuario}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginaHistorial;
