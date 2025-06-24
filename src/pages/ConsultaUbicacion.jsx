import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Consultaubicacion() {
    const [codigo, setCodigo] = useState('');
    const [planos, setPlanos] = useState([]);
    const [ubicacionNombre, setUbicacionNombre] = useState('');
    const [ubicaciones, setUbicaciones] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    useEffect(() => {
        const obtenerUbicaciones = async () => {
            try {
                const res = await axios.get('http://localhost:3000/api/ubicaciones');
                setUbicaciones(res.data.body);
            } catch (error) {
                console.error('Error al obtener ubicaciones:', error);
            }
        };
        obtenerUbicaciones();
    }, []);

    const handleBuscar = async () => {
        setBusquedaRealizada(true);
        try {
            const res = await axios.get(`http://localhost:3000/api/ubicaciones/ubicacion/${codigo}`);
            const data = res.data.body[0];
            setUbicacionNombre(data?.codigo || '');

            const planosEncontrados = Array.isArray(data?.planosxubicaciones)
                ? data.planosxubicaciones.map(pxu => ({
                    plano: pxu.plano.plano,
                    denominacion: pxu.plano.denominacion,
                    origen: pxu.plano.origen,
                    stock: pxu.stock
                }))
                : [];

            setPlanos(planosEncontrados);
        } catch (error) {
            console.error('Error al buscar ubicación:', error);
            setPlanos([]);
            setUbicacionNombre('');
        }
    };

    return (
        <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
            <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-6 sm:p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
                <h2 className="text-2xl sm:text-3xl font-bold text-orange-500 mb-6 text-center">Consultar Ubicación</h2>
                <div className="flex flex-wrap gap-4">
                    <input
                        list="ubicaciones"
                        type="text"
                        value={codigo}
                        onChange={(e) => setCodigo(e.target.value)}
                        placeholder="Buscar por código de ubicación..."
                        className="flex-grow min-w-[200px] bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 focus:outline-none focus:border-orange-500"
                        onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                                handleBuscar();
                            }
                        }}
                    />
                    <datalist id="ubicaciones">
                        {ubicaciones.map((ubi) => (
                            <option key={ubi.ubicacion_id} value={ubi.codigo} />
                        ))}
                    </datalist>
                    <button
                        onClick={handleBuscar}
                        className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 min-w-[120px]"
                    >
                        Buscar
                    </button>
                </div>
            </div>

            <div className="w-full max-w-3xl mx-auto">
                {busquedaRealizada && planos.length === 0 && (
                    <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg shadow-md border-2 border-orange-500">
                        No se encontraron resultados para la ubicación.
                    </div>
                )}

                {planos.length > 0 && (
                    <div className="overflow-x-auto rounded-lg shadow-md">
                        <table className="min-w-full bg-zinc-800 rounded-lg overflow-hidden">
                            <thead className="bg-zinc-700 text-yellow-200">
                                <tr>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Ubicación</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Plano</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Denominación</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Origen</th>
                                    <th className="px-4 sm:px-6 py-3 text-left text-xs sm:text-sm font-semibold uppercase tracking-wider">Stock</th>
                                </tr>
                            </thead>
                            <tbody className="bg-zinc-900 divide-y divide-zinc-700">
                                {planos.map((plano, index) => (
                                    <tr key={plano.plano + index} className="hover:bg-zinc-700">
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-yellow-200">{ubicacionNombre}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-yellow-200">{plano.plano}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-yellow-200">{plano.denominacion}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-yellow-200">{plano.origen}</td>
                                        <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-sm sm:text-base text-yellow-200">{plano.stock}</td>
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
