import { useState, useEffect } from 'react';
import axios from 'axios';

function PaginaHistorial() {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [ingresos, setIngresos] = useState([]);
  const [planoUbicaciones, setPlanoUbicaciones] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [sortBy, setSortBy] = useState('fecha');
  const [sortAsc, setSortAsc] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const [resHistorial, resIngresos, resPlanoUbicaciones] = await Promise.all([
          axios.get('http://localhost:3000/api/historiales'),
          axios.get('http://localhost:3000/api/ingresos'),
          axios.get('http://localhost:3000/api/planosxubicaciones')
        ]);

        if (
          resHistorial.data.ok &&
          resIngresos.data.ok &&
          resPlanoUbicaciones.data.ok
        ) {
          setHistorialMovimientos(resHistorial.data.body);
          setIngresos(resIngresos.data.body);
          setPlanoUbicaciones(resPlanoUbicaciones.data.body);
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

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortAsc(!sortAsc);
    } else {
      setSortBy(column);
      setSortAsc(true);
    }
  };

  const sortedHistorial = [...historialMovimientos].sort((a, b) => {
    const valA = a[sortBy];
    const valB = b[sortBy];

    if (sortBy === 'fecha') {
      return sortAsc
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }

    if (typeof valA === 'string' && typeof valB === 'string') {
      return sortAsc
        ? valA.localeCompare(valB)
        : valB.localeCompare(valA);
    }

    return 0;
  });

  if (loading)
    return <div className="text-white text-center p-6">Cargando historial...</div>;

  if (error)
    return <div className="text-red-500 text-center p-6">{error}</div>;

  return (
    <div className="bg-zinc-900 min-h-screen p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 w-full max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-8 pt-2">
          Historial de Movimientos de Stock
        </h2>

        {historialMovimientos.length === 0 ? (
          <p className="text-white text-center">No hay movimientos en el historial.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-zinc-700 rounded-md text-white">
              <thead>
                <tr>
                  <th
                    onClick={() => handleSort('fecha')}
                    className="py-2 px-4 border-b border-zinc-600 text-left cursor-pointer"
                  >
                    Fecha {sortBy === 'fecha' ? (sortAsc ? '▲' : '▼') : ''}
                  </th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Plano</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Denominación</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Ubicación</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Cantidad</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Tipo</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Usuario</th>
                </tr>
              </thead>
              <tbody>
                {sortedHistorial.map((mov) => {
                  const planoId = mov.plano_id;
                  const ubicacionId = mov.ubicacion_id;

                  const stockActual = planoUbicaciones.find(
                    (pu) => pu.plano_id === planoId && pu.ubicacion_id === ubicacionId
                  )?.stock;

                  const ingresoRelacionado = ingresos.find(
                    (ing) => ing.plano_id === planoId && ing.ubicacion_id === ubicacionId
                  );

                  const cantidad = ingresoRelacionado ? ingresoRelacionado.cantidad : '-';
                  const tipoMovimiento = ingresoRelacionado ? ingresoRelacionado.tipoMovimiento : 'Desconocido';

                  const usuario = mov.usuario
                    ? `${mov.usuario.nombre} ${mov.usuario.apellido}`
                    : '-';

                  return (
                    <tr key={mov.historial_id} className="hover:bg-zinc-600">
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {new Date(mov.fecha).toLocaleDateString()}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {mov.plano?.plano || '-'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {mov.plano?.denominacion || '-'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {mov.ubicacion?.codigo || '-'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {cantidad}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {tipoMovimiento}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
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
