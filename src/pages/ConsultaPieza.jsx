// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Edit } from 'lucide-react';
// import axios from 'axios';

// export default function Consultapieza() {
//     const [busqueda, setBusqueda] = useState('');
//     const [resultados, setResultados] = useState([]);
//     const [busquedaRealizada, setBusquedaRealizada] = useState(false);
//     const [sugerencias, setSugerencias] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSugerencias = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/planos'); // Ruta que devuelve todos los planos
//                 if (response.data.ok) {
//                     const planos = response.data.body.map(p => p.plano);
//                     setSugerencias(planos);
//                 }
//             } catch (error) {
//                 console.error('Error al obtener sugerencias de planos:', error);
//             }
//         };

//         fetchSugerencias();
//     }, []);

//     const handleBuscar = async () => {
//         setBusquedaRealizada(true);
//         try {
//             const response = await axios.get(`http://localhost:3000/api/planos/numero/${busqueda}`);
//             if (response.data.ok) {
//                 setResultados(response.data.body);
//             } else {
//                 setResultados([]);
//             }
//         } catch (error) {
//             console.error("Error al buscar plano:", error);
//             setResultados([]);
//         }
//     };

//     return (
//         <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
//             <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
//                 <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Piezas</h2>
//                 <div className="flex gap-4">
//                     <input
//                         type="text"
//                         list="sugerenciasPlanos"
//                         placeholder="Buscar por número de plano..."
//                         className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
//                         value={busqueda}
//                         onChange={(e) => setBusqueda(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
//                     />
//                     <datalist id="sugerenciasPlanos">
//                         {sugerencias.map((plano, index) => (
//                             <option key={index} value={plano} />
//                         ))}
//                     </datalist>
//                     <button
//                         className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm"
//                         onClick={handleBuscar}
//                     >
//                         Buscar
//                     </button>
//                 </div>
//             </div>

//             <div className="w-full max-w-3xl mx-auto">
//                 {busquedaRealizada && resultados.length === 0 && (
//                     <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
//                         No se encontraron resultados para la búsqueda.
//                     </div>
//                 )}

//                 {resultados.length > 0 && (
//                     <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
//                         <thead className="bg-zinc-700 text-yellow-200">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plano</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Denominación</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ubicación</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Origen</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Editar</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-zinc-900 divide-y divide-zinc-700">
//                             {resultados.map((plano) => {
//                                 if (plano.planosxubicaciones.length > 0) {
//                                     return plano.planosxubicaciones.map((relacion, index) => (
//                                         <tr className="hover:bg-zinc-700" key={`${plano.plano_id}-${relacion.ubicacion?.ubicacion_id || index}`}>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{relacion.ubicacion?.codigo || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{relacion.stock}</td>
//                                             <td className="px-6 py-4 text-sm">
//                                                 <button
//                                                     className="text-yellow-200 p-2 rounded-md"
//                                                     onClick={() =>
//                                                         navigate(`/editarplano/${plano.plano_id}`, {
//                                                             state: {
//                                                                 plano,
//                                                                 ubicacionActual: relacion.ubicacion,
//                                                                 stockActual: relacion.stock,
//                                                             },
//                                                         })
//                                                     }
//                                                     title="Editar"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ));
//                                 } else {
//                                     return (
//                                         <tr className="hover:bg-zinc-700" key={plano.plano_id}>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">-</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">0</td>
//                                             <td className="px-6 py-4 text-sm">
//                                                 <button
//                                                     className="text-yellow-200 p-2 rounded-md"
//                                                     onClick={() =>
//                                                         navigate(`/editarplano/${plano.plano_id}`, {
//                                                             state: {
//                                                                 plano,
//                                                                 ubicacionActual: null,
//                                                                 stockActual: 0,
//                                                             },
//                                                         })
//                                                     }
//                                                     title="Editar"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 }
//                             })}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Edit } from 'lucide-react';
// import axios from 'axios';

// export default function Consultapieza() {
//     const [busqueda, setBusqueda] = useState('');
//     const [resultados, setResultados] = useState([]);
//     const [busquedaRealizada, setBusquedaRealizada] = useState(false);
//     const [sugerencias, setSugerencias] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSugerencias = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/planos');
//                 if (response.data.ok) {
//                     const planos = response.data.body.map(p => p.plano);
//                     setSugerencias(planos);
//                 }
//             } catch (error) {
//                 console.error('Error al obtener sugerencias de planos:', error);
//             }
//         };

//         fetchSugerencias();
//     }, []);

//     const handleBuscar = async () => {
//         setBusquedaRealizada(true);
//         try {
//             const response = await axios.get(`http://localhost:3000/api/planos/numero/${busqueda}`);
//             if (response.data.ok) {
//                 setResultados(response.data.body);
//             } else {
//                 setResultados([]);
//             }
//         } catch (error) {
//             console.error("Error al buscar plano:", error);
//             setResultados([]);
//         }
//     };

//     return (
//         <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
//             <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
//                 <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Piezas</h2>
//                 <div className="flex gap-4">
//                     <input
//                         type="text"
//                         list="sugerenciasPlanos"
//                         placeholder="Buscar por número de plano..."
//                         className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
//                         value={busqueda}
//                         onChange={(e) => setBusqueda(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
//                     />
//                     <datalist id="sugerenciasPlanos">
//                         {sugerencias.map((plano, index) => (
//                             <option key={index} value={plano} />
//                         ))}
//                     </datalist>
//                     <button
//                         className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm"
//                         onClick={handleBuscar}
//                     >
//                         Buscar
//                     </button>
//                 </div>
//             </div>

//             <div className="w-full max-w-3xl mx-auto">
//                 {busquedaRealizada && resultados.length === 0 && (
//                     <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
//                         No se encontraron resultados para la búsqueda.
//                     </div>
//                 )}

//                 {resultados.length > 0 && (
//                     <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
//                         <thead className="bg-zinc-700 text-yellow-200">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plano</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Denominación</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ubicación</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Origen</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Acciones</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-zinc-900 divide-y divide-zinc-700">
//                             {resultados.map((plano) => {
//                                 if (plano.planosxubicaciones.length > 0) {
//                                     return plano.planosxubicaciones.map((relacion, index) => (
//                                         <tr className="hover:bg-zinc-700" key={`${plano.plano_id}-${relacion.ubicacion?.ubicacion_id || index}`}>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{relacion.ubicacion?.codigo || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{relacion.stock}</td>
//                                             <td className="px-6 py-4 text-sm flex gap-2">
//                                                 <button
//                                                     className="text-yellow-200 p-2 rounded-md"
//                                                     onClick={() =>
//                                                         navigate(`/editarplano/${plano.plano_id}`, {
//                                                             state: {
//                                                                 plano,
//                                                                 ubicacionActual: relacion.ubicacion,
//                                                                 stockActual: relacion.stock,
//                                                             },
//                                                         })
//                                                     }
//                                                     title="Editar"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
//                                                 <button
//                                                     className="text-green-400 hover:text-green-300 p-2 rounded-md"
//                                                     onClick={() => navigate(`/generarqr/${plano.plano}`)}
//                                                     title="Generar código QR"
//                                                 >
//                                                     QR
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ));
//                                 } else {
//                                     return (
//                                         <tr className="hover:bg-zinc-700" key={plano.plano_id}>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">-</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">0</td>
//                                             <td className="px-6 py-4 text-sm flex gap-2">
//                                                 <button
//                                                     className="text-yellow-200 p-2 rounded-md"
//                                                     onClick={() =>
//                                                         navigate(`/editarplano/${plano.plano_id}`, {
//                                                             state: {
//                                                                 plano,
//                                                                 ubicacionActual: null,
//                                                                 stockActual: 0,
//                                                             },
//                                                         })
//                                                     }
//                                                     title="Editar"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
                                                
//                                                 <button
//                                                     className="text-green-400 hover:text-green-300 p-2 rounded-md"
//                                                     onClick={() => navigate(`/generarqr/${plano.plano}`)}  // 👈 cambio clave acá
//                                                     title="Generar código QR"
//                                                 >
//                                                     QR
//                                                 </button>

//                                             </td>
//                                         </tr>
//                                     );
//                                 }
//                             })}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }


// import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { Edit, QrCode } from 'lucide-react'; // 👈 Se agregó QrCode
// import axios from 'axios';

// export default function Consultapieza() {
//     const [busqueda, setBusqueda] = useState('');
//     const [resultados, setResultados] = useState([]);
//     const [busquedaRealizada, setBusquedaRealizada] = useState(false);
//     const [sugerencias, setSugerencias] = useState([]);

//     const navigate = useNavigate();

//     useEffect(() => {
//         const fetchSugerencias = async () => {
//             try {
//                 const response = await axios.get('http://localhost:3000/api/planos');
//                 if (response.data.ok) {
//                     const planos = response.data.body.map(p => p.plano);
//                     setSugerencias(planos);
//                 }
//             } catch (error) {
//                 console.error('Error al obtener sugerencias de planos:', error);
//             }
//         };

//         fetchSugerencias();
//     }, []);

//     const handleBuscar = async () => {
//         setBusquedaRealizada(true);
//         try {
//             const response = await axios.get(`http://localhost:3000/api/planos/numero/${busqueda}`);
//             if (response.data.ok) {
//                 setResultados(response.data.body);
//             } else {
//                 setResultados([]);
//             }
//         } catch (error) {
//             console.error("Error al buscar plano:", error);
//             setResultados([]);
//         }
//     };

//     return (
//         <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
//             <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
//                 <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Piezas</h2>
//                 <div className="flex gap-4">
//                     <input
//                         type="text"
//                         list="sugerenciasPlanos"
//                         placeholder="Buscar por número de plano..."
//                         className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
//                         value={busqueda}
//                         onChange={(e) => setBusqueda(e.target.value)}
//                         onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
//                     />
//                     <datalist id="sugerenciasPlanos">
//                         {sugerencias.map((plano, index) => (
//                             <option key={index} value={plano} />
//                         ))}
//                     </datalist>
//                     <button
//                         className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm"
//                         onClick={handleBuscar}
//                     >
//                         Buscar
//                     </button>
//                 </div>
//             </div>

//             <div className="w-full max-w-3xl mx-auto">
//                 {busquedaRealizada && resultados.length === 0 && (
//                     <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
//                         No se encontraron resultados para la búsqueda.
//                     </div>
//                 )}

//                 {resultados.length > 0 && (
//                     <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
//                         <thead className="bg-zinc-700 text-yellow-200">
//                             <tr>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plano</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Denominación</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ubicación</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Origen</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock</th>
//                                 <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Acciones</th>
//                             </tr>
//                         </thead>
//                         <tbody className="bg-zinc-900 divide-y divide-zinc-700">
//                             {resultados.map((plano) => {
//                                 if (plano.planosxubicaciones.length > 0) {
//                                     return plano.planosxubicaciones.map((relacion, index) => (
//                                         <tr className="hover:bg-zinc-700" key={`${plano.plano_id}-${relacion.ubicacion?.ubicacion_id || index}`}>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{relacion.ubicacion?.codigo || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{relacion.stock}</td>
//                                             <td className="px-6 py-4 text-sm flex gap-2">
//                                                 <button
//                                                     className="text-yellow-200 p-2 rounded-md"
//                                                     onClick={() =>
//                                                         navigate(`/editarplano/${plano.plano_id}`, {
//                                                             state: {
//                                                                 plano,
//                                                                 ubicacionActual: relacion.ubicacion,
//                                                                 stockActual: relacion.stock,
//                                                             },
//                                                         })
//                                                     }
//                                                     title="Editar"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
//                                                 <button
//                                                     className="text-yellow-200 hover:text-yellow-300 p-2 rounded-md"
//                                                     onClick={() => navigate(`/generarqr/${plano.plano}`)}
//                                                     title="Generar código QR"
//                                                 >
//                                                     <QrCode size={18} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     ));
//                                 } else {
//                                     return (
//                                         <tr className="hover:bg-zinc-700" key={plano.plano_id}>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">-</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
//                                             <td className="px-6 py-4 text-sm text-yellow-200">0</td>
//                                             <td className="px-6 py-4 text-sm flex gap-2">
//                                                 <button
//                                                     className="text-yellow-200 p-2 rounded-md"
//                                                     onClick={() =>
//                                                         navigate(`/editarplano/${plano.plano_id}`, {
//                                                             state: {
//                                                                 plano,
//                                                                 ubicacionActual: null,
//                                                                 stockActual: 0,
//                                                             },
//                                                         })
//                                                     }
//                                                     title="Editar"
//                                                 >
//                                                     <Edit size={18} />
//                                                 </button>
//                                                 <button
//                                                     className="text-yellow-200 hover:text-yellow-300 p-2 rounded-md"
//                                                     onClick={() => navigate(`/generarqr/${plano.plano}`)}
//                                                     title="Generar código QR"
//                                                 >
//                                                     <QrCode size={18} />
//                                                 </button>
//                                             </td>
//                                         </tr>
//                                     );
//                                 }
//                             })}
//                         </tbody>
//                     </table>
//                 )}
//             </div>
//         </div>
//     );
// }


import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit, QrCode } from 'lucide-react';
import axios from 'axios';

export default function Consultapieza() {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);
  const [busquedaRealizada, setBusquedaRealizada] = useState(false);
  const [sugerencias, setSugerencias] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchSugerencias = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/planos');
        if (response.data.ok) {
          const planos = response.data.body.map(p => p.plano);
          setSugerencias(planos);
        }
      } catch (error) {
        console.error('Error al obtener sugerencias de planos:', error);
      }
    };
    fetchSugerencias();
  }, []);

  const handleBuscar = async () => {
    setBusquedaRealizada(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/planos/numero/${busqueda}`);
      if (response.data.ok) {
        setResultados(response.data.body);
      } else {
        setResultados([]);
      }
    } catch (error) {
      console.error("Error al buscar plano:", error);
      setResultados([]);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-4 sm:p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-6 sm:p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
        <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Piezas</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            list="sugerenciasPlanos"
            placeholder="Buscar por número de plano..."
            className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
          />
          <datalist id="sugerenciasPlanos">
            {sugerencias.map((plano, index) => (
              <option key={index} value={plano} />
            ))}
          </datalist>
          <button
            className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm"
            onClick={handleBuscar}
          >
            Buscar
          </button>
        </div>
      </div>

      <div className="w-full max-w-5xl mx-auto">
        {busquedaRealizada && resultados.length === 0 && (
          <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
            No se encontraron resultados para la búsqueda.
          </div>
        )}

        {resultados.length > 0 && (
          <div className="overflow-x-auto rounded-lg shadow-md">
            <table className="min-w-full bg-zinc-800 text-yellow-200">
              <thead className="bg-zinc-700 text-xs sm:text-sm">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Plano</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Denominación</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Ubicación</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Origen</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Stock</th>
                  <th className="px-4 py-3 text-left font-semibold uppercase tracking-wider">Acciones</th>
                </tr>
              </thead>
              <tbody className="bg-zinc-900 divide-y divide-zinc-700 text-sm sm:text-base">
                {resultados.map((plano) => {
                  if (plano.planosxubicaciones.length > 0) {
                    return plano.planosxubicaciones.map((relacion, index) => (
                      <tr
                        className="hover:bg-zinc-700"
                        key={`${plano.plano_id}-${relacion.ubicacion?.ubicacion_id || index}`}
                      >
                        <td className="px-4 py-3">{plano.plano}</td>
                        <td className="px-4 py-3">{plano.denominacion}</td>
                        <td className="px-4 py-3">{relacion.ubicacion?.codigo || '-'}</td>
                        <td className="px-4 py-3">{plano.origen || '-'}</td>
                        <td className="px-4 py-3">{relacion.stock}</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            className="text-yellow-200 p-2 rounded-md hover:text-yellow-300"
                            onClick={() =>
                              navigate(`/editarplano/${plano.plano_id}`, {
                                state: {
                                  plano,
                                  ubicacionActual: relacion.ubicacion,
                                  stockActual: relacion.stock,
                                },
                              })
                            }
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="text-yellow-200 p-2 rounded-md hover:text-yellow-300"
                            onClick={() => navigate(`/generarqr/${plano.plano}`)}
                            title="Generar código QR"
                          >
                            <QrCode size={18} />
                          </button>
                        </td>
                      </tr>
                    ));
                  } else {
                    return (
                      <tr className="hover:bg-zinc-700" key={plano.plano_id}>
                        <td className="px-4 py-3">{plano.plano}</td>
                        <td className="px-4 py-3">{plano.denominacion}</td>
                        <td className="px-4 py-3">-</td>
                        <td className="px-4 py-3">{plano.origen || '-'}</td>
                        <td className="px-4 py-3">0</td>
                        <td className="px-4 py-3 flex gap-2">
                          <button
                            className="text-yellow-200 p-2 rounded-md hover:text-yellow-300"
                            onClick={() =>
                              navigate(`/editarplano/${plano.plano_id}`, {
                                state: {
                                  plano,
                                  ubicacionActual: null,
                                  stockActual: 0,
                                },
                              })
                            }
                            title="Editar"
                          >
                            <Edit size={18} />
                          </button>
                          <button
                            className="text-yellow-200 p-2 rounded-md hover:text-yellow-300"
                            onClick={() => navigate(`/generarqr/${plano.plano}`)}
                            title="Generar código QR"
                          >
                            <QrCode size={18} />
                          </button>
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
