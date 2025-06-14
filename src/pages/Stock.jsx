// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const ITEMS_PER_PAGE = 10;

// export default function ConsultaStock() {
//   const [busqueda, setBusqueda] = useState('');
//   const [planos, setPlanos] = useState([]);
//   const [paginaActual, setPaginaActual] = useState(1);
//   const [totalPlanos, setTotalPlanos] = useState(0);
//   const navigate = useNavigate();

//   // Función para obtener planos desde backend con paginación y búsqueda
//   const obtenerPlanos = async () => {
//     try {
//       const response = await axios.get('http://localhost:3000/api/planoStock', {
//         params: {
//           page: paginaActual,
//           limit: ITEMS_PER_PAGE,
//           search: busqueda,
//         },
//       });

//       if (response.data.ok) {
//         setPlanos(response.data.body || []);
//         setTotalPlanos(response.data.total || 0);
//       }
//     } catch (error) {
//       console.error('Error al obtener planos:', error);
//     }
//   };

//   // Cada vez que cambie página o búsqueda, cargo datos nuevos
//   useEffect(() => {
//     obtenerPlanos();
//   }, [paginaActual, busqueda]);

//   // Total de páginas basado en el total recibido del backend
//   const totalPaginas = Math.ceil(totalPlanos / ITEMS_PER_PAGE);

//   const cambiarPagina = (nuevaPagina) => {
//     if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
//       setPaginaActual(nuevaPagina);
//     }
//   };

//   return (
//     <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
//       <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
//         <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Stock</h2>
//         <div className="flex gap-4">
//           <input
//             type="text"
//             placeholder="Buscar por número o denominación..."
//             className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
//             value={busqueda}
//             onChange={(e) => {
//               setBusqueda(e.target.value);
//               setPaginaActual(1); // Reiniciar página al buscar
//             }}
//           />
//         </div>
//       </div>

//       <div className="w-full max-w-4xl mx-auto">
//         {planos.length === 0 ? (
//           <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
//             No se encontraron resultados para la búsqueda.
//           </div>
//         ) : (
//           <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
//             <thead className="bg-zinc-700 text-yellow-200">
//               <tr>
//                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plano</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Denominación</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Origen</th>
//                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock Total</th>
//               </tr>
//             </thead>
//             <tbody className="bg-zinc-900 divide-y divide-zinc-700">
//               {planos.map((plano) => (
//                 <tr className="hover:bg-zinc-700" key={plano.plano_id}>
//                   <td
//                     className="px-6 py-4 text-sm text-orange-400 underline cursor-pointer hover:text-orange-300"
//                     onClick={() => navigate(`/consultapieza/${plano.plano_id}`)}
//                   >
//                     {plano.plano}
//                   </td>
//                   <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                   <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                   <td className="px-6 py-4 text-sm text-yellow-200">{plano.stock_total}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         )}

//         {/* Paginación */}
//         {totalPaginas > 1 && (
//           <div className="flex justify-center mt-6 gap-2">
//             <button
//               className="px-4 py-2 bg-orange-500 text-black rounded disabled:opacity-50"
//               onClick={() => cambiarPagina(paginaActual - 1)}
//               disabled={paginaActual === 1}
//             >
//               Anterior
//             </button>
//             <span className="text-yellow-200 px-4 py-2">
//               Página {paginaActual} de {totalPaginas}
//             </span>
//             <button
//               className="px-4 py-2 bg-orange-500 text-black rounded disabled:opacity-50"
//               onClick={() => cambiarPagina(paginaActual + 1)}
//               disabled={paginaActual === totalPaginas}
//             >
//               Siguiente
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ITEMS_PER_PAGE = 10;

export default function ConsultaStock() {
  const [busqueda, setBusqueda] = useState('');
  const [planos, setPlanos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [totalPlanos, setTotalPlanos] = useState(0);
  const navigate = useNavigate();

  // Obtener planos desde el backend
  const obtenerPlanos = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/planoStock', {
        params: {
          page: paginaActual,
          limit: ITEMS_PER_PAGE,
          search: busqueda,
        },
      });

      if (response.data.ok) {
        setPlanos(response.data.body || []);
        setTotalPlanos(response.data.total || 0);
      }
    } catch (error) {
      console.error('Error al obtener planos:', error);
    }
  };

  // Esperar 300ms antes de hacer la búsqueda (debounce)
  useEffect(() => {
    const delay = setTimeout(() => {
      obtenerPlanos();
    }, 300);

    return () => clearTimeout(delay);
  }, [busqueda, paginaActual]);

  const totalPaginas = Math.ceil(totalPlanos / ITEMS_PER_PAGE);

  const cambiarPagina = (nuevaPagina) => {
    if (nuevaPagina >= 1 && nuevaPagina <= totalPaginas) {
      setPaginaActual(nuevaPagina);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-4 sm:p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-4 sm:p-8 shadow-md w-full max-w-3xl mx-auto mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-orange-500 mb-4 sm:mb-6 text-center">
          Consultar Stock
        </h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Buscar por número o denominación..."
            className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
            value={busqueda}
            onChange={(e) => {
              setBusqueda(e.target.value);
              setPaginaActual(1);
            }}
          />
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        {planos.length === 0 ? (
          <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
            No se encontraron resultados para la búsqueda.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
              <thead className="bg-zinc-700 text-yellow-200 text-sm">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Plano</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Denominación</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Origen</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Stock Total</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-900 divide-y divide-zinc-700 text-sm">
                {planos.map((plano) => (
                  <tr className="hover:bg-zinc-700" key={plano.plano_id}>
                    <td
                      className="px-4 py-3 text-orange-400 underline cursor-pointer hover:text-orange-300"
                      onClick={() => navigate(`/consultapieza/${plano.plano_id}`)}
                    >
                      {plano.plano}
                    </td>
                    <td className="px-4 py-3 text-yellow-200">{plano.denominacion}</td>
                    <td className="px-4 py-3 text-yellow-200">{plano.origen || '-'}</td>
                    <td className="px-4 py-3 text-yellow-200">{plano.stock_total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {totalPaginas > 1 && (
          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 gap-2 text-sm">
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
