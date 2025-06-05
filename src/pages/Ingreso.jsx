import { useState, useEffect } from 'react';
import axios from 'axios';

function FormPlanoManual() {
  const [planoCodigo, setPlanoCodigo] = useState('');
  const [planoId, setPlanoId] = useState(null);
  const [ubicacionCodigo, setUbicacionCodigo] = useState('');
  const [ubicacionId, setUbicacionId] = useState('');
  const [denominacion, setDenominacion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (planoCodigo.trim() === '') {
      setDenominacion('');
      setPlanoId(null);
      return;
    }

    async function fetchDenominacion() {
      try {
        const res = await axios.get(`http://localhost:3000/api/planos/numero/denominacion/${planoCodigo}`);
        if (res.data?.body) {
          setDenominacion(res.data.body.denominacion || '');
          setPlanoId(res.data.body.plano_id || null);
        } else {
          setDenominacion('');
          setPlanoId(null);
        }
      } catch {
        setDenominacion('');
        setPlanoId(null);
      }
    }

    fetchDenominacion();
  }, [planoCodigo]);

  useEffect(() => {
    if (ubicacionCodigo.trim() === '') {
      setUbicacionId('');
      return;
    }

    async function fetchUbicacion() {
      try {
        const res = await axios.get(`http://localhost:3000/api/ubicaciones/ubicacion/codigos/${ubicacionCodigo}`);
        if (res.data?.body) {
          setUbicacionId(res.data.body.ubicacion_id || '');
        } else {
          setUbicacionId('');
        }
      } catch {
        setUbicacionId('');
      }
    }

    fetchUbicacion();
  }, [ubicacionCodigo]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensaje('');
    setError('');

    if (!planoId || ubicacionId === '' || cantidad.trim() === '' || isNaN(parseInt(cantidad))) {
      setError('Completa los campos obligatorios: plano válido, ubicación y cantidad');
      return;
    }

    try {
      const payload = {
        plano_id: planoId,
        ubicacion_id: parseInt(ubicacionId),
        cantidad: parseInt(cantidad),
      };

      await axios.post('http://localhost:3000/api/planoxubicacion/actualizar-stock', payload);

      setMensaje('✅ Stock actualizado con éxito');
      setPlanoCodigo('');
      setPlanoId(null);
      setUbicacionCodigo('');
      setUbicacionId('');
      setDenominacion('');
      setCantidad('');
    } catch {
      setError('❌ Error al actualizar stock');
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 w-full max-w-2xl"> {/* Ajustado a max-w-2xl, puedes cambiarlo */}
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-8 pt-2">Ingreso de Material</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1 text-yellow-200">Plano</label>
            <input
              type="text"
              value={planoCodigo}
              onChange={(e) => setPlanoCodigo(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 focus:outline-none focus:border-orange-500"
              placeholder="Ej: 1091503"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-yellow-200">Ubicación</label>
            <input
              type="text"
              value={ubicacionCodigo}
              onChange={(e) => setUbicacionCodigo(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 focus:outline-none focus:border-orange-500"
              placeholder="Ej: 0A0101"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-yellow-200">Denominación</label>
            <input
              type="text"
              value={denominacion}
              readOnly
              className="w-full bg-zinc-700 text-gray-400 rounded-md border border-zinc-600 py-2 px-3 cursor-not-allowed" // Texto gris para readOnly
              placeholder="Se completa automáticamente"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1 text-yellow-200">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 focus:outline-none focus:border-orange-500"
              placeholder="Ej: 100"
            />
          </div>

          {mensaje && <p className="text-green-100 bg-green-700 px-4 py-2 rounded-md">{mensaje}</p>}
          {error && <p className="text-red-100 bg-red-700 px-4 py-2 rounded-md">{error}</p>}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Actualizar Stock
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPlanoManual;