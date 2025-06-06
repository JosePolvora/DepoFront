// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function PaginaHistorial() {
//   const [historialMovimientos, setHistorialMovimientos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function fetchHistorial() {
//       try {
//         const res = await axios.get('http://localhost:3000/api/historiales');
//         if (res.data.ok) {
//           setHistorialMovimientos(res.data.body);
//         } else {
//           setError(res.data.message || 'Error en la respuesta del servidor');
//         }
//       } catch (err) {
//         setError('Error al cargar el historial de movimientos.');
//         console.error('Error fetching historial:', err);
//       } finally {
//         setLoading(false);
//       }
//     }

//     fetchHistorial();
//   }, []);

//   if (loading)
//     return <div className="text-white text-center p-6">Cargando historial...</div>;

//   if (error)
//     return <div className="text-red-500 text-center p-6">{error}</div>;

//   return (
//     <div className="bg-zinc-900 min-h-screen p-6">
//       <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 w-full max-w-4xl mx-auto">
//         <h2 className="text-2xl font-bold text-center text-orange-500 mb-8 pt-2">
//           Historial de Movimientos de Stock
//         </h2>

//         {historialMovimientos.length === 0 ? (
//           <p className="text-white text-center">No hay movimientos en el historial.</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="min-w-full bg-zinc-700 rounded-md text-white">
//               <thead>
//                 <tr>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Fecha Movimiento</th>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Plano</th>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Denominación</th>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Ubicación</th>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Tipo</th>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Cantidad</th>
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Usuario</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {historialMovimientos.map((movimiento) => (
//                   <tr key={movimiento.id} className="hover:bg-zinc-600">
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {new Date(movimiento.fecha).toLocaleString()}
//                     </td>
//                     <td className="py-2 px-4 border-b border-zinc-600">{movimiento.plano || '-'}</td>
//                     <td className="py-2 px-4 border-b border-zinc-600">{movimiento.denominacion || '-'}</td>
//                     <td className="py-2 px-4 border-b border-zinc-600">{movimiento.ubicacion || '-'}</td>
//                     <td className="py-2 px-4 border-b border-zinc-600">{movimiento.tipoMovimiento}</td>
//                     <td className="py-2 px-4 border-b border-zinc-600">{movimiento.cantidad}</td>
//                     <td className="py-2 px-4 border-b border-zinc-600">{movimiento.usuario}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default PaginaHistorial;


import { useState, useEffect } from 'react';
import axios from 'axios';

function PaginaHistorial() {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistorial() {
      try {
        const res = await axios.get('http://localhost:3000/api/historiales');
        if (res.data.ok) {
          setHistorialMovimientos(res.data.body);
        } else {
          setError(res.data.message || 'Error en la respuesta del servidor');
        }
      } catch (err) {
        setError('Error al cargar el historial de movimientos.');
        console.error('Error fetching historial:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistorial();
  }, []);

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
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Fecha Movimiento</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Plano</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Denominación</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Ubicación</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Tipo</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Cantidad</th>
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Usuario</th>
                </tr>
              </thead>
              <tbody>
                {historialMovimientos.map((movimiento) => {
                  const tipoMovimiento = movimiento.ingreso ? 'Ingreso' : (movimiento.egreso ? 'Egreso' : '-');
                  const cantidad = movimiento.ingreso?.cantidad || movimiento.egreso?.cantidad || '-';
                  const usuario = movimiento.usuario
                    ? `${movimiento.usuario.nombre} ${movimiento.usuario.apellido}`
                    : '-';

                  return (
                    <tr key={movimiento.historial_id} className="hover:bg-zinc-600">
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {new Date(movimiento.fecha).toLocaleString()}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {movimiento.plano?.plano || '-'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {movimiento.plano?.denominacion || '-'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {movimiento.ubicacion?.codigo || '-'}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {tipoMovimiento}
                      </td>
                      <td className="py-2 px-4 border-b border-zinc-600">
                        {cantidad}
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
