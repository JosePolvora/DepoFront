import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Edit } from 'lucide-react';
import axios from 'axios';

export default function Consultapieza() {
    const [busqueda, setBusqueda] = useState('');
    const [resultados, setResultados] = useState([]);
    const [busquedaRealizada, setBusquedaRealizada] = useState(false);

    const navigate = useNavigate();

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
        <div className="bg-zinc-900 min-h-screen flex flex-col items-center p-6">
            <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl mx-auto mb-8">
                <h2 className="text-2xl font-bold text-orange-500 mb-6 text-center">Consultar Piezas</h2>
                <div className="flex gap-4">
                    <input
                        type="text"
                        placeholder="Buscar por número de plano..."
                        className="flex-1 bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3"
                        value={busqueda}
                        onChange={(e) => setBusqueda(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleBuscar()}
                    />
                    <button
                        className="bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm"
                        onClick={handleBuscar}
                    >
                        Buscar
                    </button>
                </div>
            </div>

            <div className="w-full max-w-3xl mx-auto">
                {busquedaRealizada && resultados.length === 0 && (
                    <div className="bg-zinc-800 text-gray-400 text-center py-4 rounded-lg border-2 border-orange-500">
                        No se encontraron resultados para la búsqueda.
                    </div>
                )}

                {resultados.length > 0 && (
                    <table className="min-w-full bg-zinc-800 shadow-md rounded-lg overflow-hidden">
                        <thead className="bg-zinc-700 text-yellow-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Plano</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Denominación</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Ubicación</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Origen</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Stock</th>
                                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider">Editar</th>
                            </tr>
                        </thead>
                        <tbody className="bg-zinc-900 divide-y divide-zinc-700">
                            {resultados.map((plano) => {
                                if (plano.planosxubicaciones.length > 0) {
                                    return plano.planosxubicaciones.map((relacion, index) => (
                                        <tr className="hover:bg-zinc-700" key={`${plano.plano_id}-${relacion.ubicacion?.ubicacion_id || index}`}>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{relacion.ubicacion?.codigo || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{relacion.stock}</td>
                                            <td className="px-6 py-4 text-sm">
                                                <button
                                                    className="text-yellow-200 p-2 rounded-md"
                                                    onClick={() =>
                                                        navigate(`/editarplano/${plano.plano_id}`, {
                                                            state: {
                                                                plano,
                                                                ubicacionActual: relacion.ubicacion,
                                                                stockActual: relacion.stock, // ✅ pasamos el stock
                                                            },
                                                        })
                                                    }
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ));
                                } else {
                                    return (
                                        <tr className="hover:bg-zinc-700" key={plano.plano_id}>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{plano.plano}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{plano.denominacion}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">-</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">{plano.origen || '-'}</td>
                                            <td className="px-6 py-4 text-sm text-yellow-200">0</td>
                                            <td className="px-6 py-4 text-sm">
                                                <button
                                                    className="text-yellow-200 p-2 rounded-md"
                                                    onClick={() =>
                                                        navigate(`/editarplano/${plano.plano_id}`, {
                                                            state: {
                                                                plano,
                                                                ubicacionActual: null,
                                                                stockActual: 0, // ✅ stock = 0 si no hay ubicaciones
                                                            },
                                                        })
                                                    }
                                                    title="Editar"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                }
                            })}
                        </tbody>
                    </table>
                )}
            </div>
        </div>
    );
}