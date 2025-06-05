import { useState, useEffect } from 'react';
import axios from 'axios';

function PaginaHistorial() {
  const [historialMovimientos, setHistorialMovimientos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchHistorial() {
      try {
        const res = await axios.get('http://localhost:3000/api/planos');
        console.log('Respuesta completa:', res.data);

        const { ingresos, egresos } = res.data.body || {};
        console.log('Ingresos:', ingresos);
        console.log('Egresos:', egresos);

        if (!Array.isArray(ingresos) && !Array.isArray(egresos)) {
          setHistorialMovimientos([]);
          return;
        }

        const movimientos = [
          ...(Array.isArray(ingresos)
            ? ingresos.map(m => ({
                ...m,
                tipo_movimiento: 'ingreso',
                plano: m.planoxubicacion?.plano,
                ubicacion: m.planoxubicacion?.ubicacion,
                fecha: m.fecha,
                stock: m.stock,
              }))
            : []),
          ...(Array.isArray(egresos)
            ? egresos.map(m => ({
                ...m,
                tipo_movimiento: 'egreso',
                plano: m.planoxubicacion?.plano,
                ubicacion: m.planoxubicacion?.ubicacion,
                fecha: m.fecha,
                stock: m.stock,
              }))
            : []),
        ];

        console.log('Movimientos combinados y procesados:', movimientos);

        movimientos.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));

        setHistorialMovimientos(movimientos);
      } catch (err) {
        setError('Error al cargar el historial de movimientos.');
        console.error('Error fetching historial:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchHistorial();
  }, []);

  if (loading) return <div className="text-white text-center p-6">Cargando historial...</div>;

  if (error) return <div className="text-red-500 text-center p-6">{error}</div>;

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
                  <th className="py-2 px-4 border-b border-zinc-600 text-left">Stock</th>
                </tr>
              </thead>
              <tbody>
                {historialMovimientos.map((movimiento, index) => (
                  <tr key={index} className="hover:bg-zinc-600">
                    <td className="py-2 px-4 border-b border-zinc-600">
                      {new Date(movimiento.fecha).toLocaleString()}
                    </td>
                    <td className="py-2 px-4 border-b border-zinc-600">{movimiento.plano?.plano || '-'}</td>
                    <td className="py-2 px-4 border-b border-zinc-600">{movimiento.plano?.denominacion || '-'}</td>
                    <td className="py-2 px-4 border-b border-zinc-600">{movimiento.ubicacion?.codigo || '-'}</td>
                    <td className="py-2 px-4 border-b border-zinc-600">
                      {movimiento.tipo_movimiento === 'ingreso' ? 'Ingreso' : 'Egreso'}
                    </td>
                    <td className="py-2 px-4 border-b border-zinc-600">{movimiento.stock}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default PaginaHistorial;


// import { useState, useEffect } from 'react';
// import axios from 'axios';

// function PaginaHistorial() {
//   const [historialMovimientos, setHistorialMovimientos] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');

//   useEffect(() => {
//     async function fetchHistorial() {
//       try {
//         const res = await axios.get('http://localhost:3000/api/planos');
//         console.log("Respuesta completa:", res.data);

//         const movimientos = res.data.body;

//         if (Array.isArray(movimientos)) {
//           setHistorialMovimientos(movimientos);
//         } else {
//           setHistorialMovimientos([]);
//           console.warn("No se recibieron movimientos.");
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

//   if (loading) return <div className="text-white text-center p-6">Cargando historial...</div>;

//   if (error) return <div className="text-red-500 text-center p-6">{error}</div>;

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
//                   <th className="py-2 px-4 border-b border-zinc-600 text-left">Stock</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {historialMovimientos.map((movimiento, index) => (
//                   <tr key={index} className="hover:bg-zinc-600">
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {new Date(movimiento.fecha).toLocaleString()}
//                     </td>
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {movimiento.planoxubicacion?.plano?.plano || '-'}
//                     </td>
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {movimiento.planoxubicacion?.plano?.denominacion || '-'}
//                     </td>
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {movimiento.planoxubicacion?.ubicacion?.codigo || '-'}
//                     </td>
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {movimiento.tipo_movimiento === 'ingreso' ? 'Ingreso' : 'Egreso'}
//                     </td>
//                     <td className="py-2 px-4 border-b border-zinc-600">
//                       {movimiento.stock}
//                     </td>
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
