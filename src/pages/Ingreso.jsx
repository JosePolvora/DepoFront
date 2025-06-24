import { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

function FormPlanoManual() {
  const [planoCodigo, setPlanoCodigo] = useState('');
  const [planoId, setPlanoId] = useState(null);
  const [ubicacionCodigo, setUbicacionCodigo] = useState('');
  const [ubicacionId, setUbicacionId] = useState('');
  const [denominacion, setDenominacion] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [ubicaciones, setUbicaciones] = useState([]);

  useEffect(() => {
    async function fetchUbicaciones() {
      try {
        const res = await axios.get('http://localhost:3000/api/ubicaciones');
        setUbicaciones(res.data.body || []);
      } catch (err) {
        console.error('Error al cargar ubicaciones:', err);
        Swal.fire({
          icon: 'error',
          title: 'Error al cargar ubicaciones',
          text: 'No se pudieron obtener las ubicaciones desde el servidor.'
        });
      }
    }

    fetchUbicaciones();
  }, []);

  useEffect(() => {
    if (planoCodigo.trim() === '') {
      setDenominacion('');
      setPlanoId(null);
      return;
    }

    async function fetchDenominacion() {
      try {
        const res = await axios.get(`http://localhost:3000/api/planos/numero/denominacion/${planoCodigo}`);
        const data = res.data?.body;
        if (data) {
          setDenominacion(data.denominacion || '');
          setPlanoId(data.plano_id || null);
        } else {
          setDenominacion('');
          setPlanoId(null);
        }
      } catch (err) {
        console.error('Error al obtener denominación:', err);
        setDenominacion('');
        setPlanoId(null);
      }
    }

    fetchDenominacion();
  }, [planoCodigo]);

  useEffect(() => {
    const ubic = ubicaciones.find(u => u.codigo === ubicacionCodigo);
    setUbicacionId(ubic?.ubicacion_id || '');
  }, [ubicacionCodigo, ubicaciones]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!planoId || ubicacionId === '' || cantidad.trim() === '' || isNaN(parseInt(cantidad))) {
      Swal.fire({
        icon: 'error',
        title: 'Campos incompletos',
        text: 'Por favor completá todos los campos obligatorios correctamente.'
      });
      return;
    }

    const usuario = JSON.parse(localStorage.getItem('usuario'));
    const usuario_id = usuario?.id;

    const payload = {
      plano_id: planoId,
      ubicacion_id: parseInt(ubicacionId),
      cantidad: parseInt(cantidad),
    };

    let errores = [];
    let ingresoId = null;

    try {
      await axios.post('http://localhost:3000/api/planoxubicacion/actualizar-stock', payload);
    } catch (err) {
      console.error('Error al actualizar stock:', err);
      errores.push('Actualizar stock');
    }

    try {
      const resIngreso = await axios.post('http://localhost:3000/api/ingresos', payload);
      ingresoId = resIngreso.data.body?.ingreso_id || null;
    } catch (err) {
      console.error('Error al registrar ingreso:', err);
      errores.push('Registrar ingreso');
    }

    try {
      await axios.post('http://localhost:3000/api/historiales', {
        ...payload,
        usuario_id,
        ingreso_id: ingresoId,
      });
    } catch (err) {
      console.error('Error al guardar historial:', err);
      errores.push('Guardar historial');
    }

    if (errores.length === 0) {
      Swal.fire({
        icon: 'success',
        title: 'Operación exitosa',
        text: 'Se ingresó correctamente.'
      });

      setPlanoCodigo('');
      setPlanoId(null);
      setUbicacionCodigo('');
      setUbicacionId('');
      setDenominacion('');
      setCantidad('');
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Operación parcial',
        html: `Se completó parcialmente. Fallaron las siguientes acciones:<br><ul>${errores.map(e => `<li>${e}</li>`).join('')}</ul>`
      });
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-4 sm:p-6">
      <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-6 sm:p-8 w-full max-w-md sm:max-w-2xl">
        <h2 className="text-2xl font-bold text-center text-orange-500 mb-6 sm:mb-8 pt-2">
          Ingreso de Material
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          <div>
            <label className="block text-sm sm:text-base font-medium mb-1 text-yellow-200">Plano</label>
            <input
              type="text"
              value={planoCodigo}
              onChange={(e) => setPlanoCodigo(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 text-sm sm:text-base focus:outline-none focus:border-orange-500"
              placeholder="Ej: 1091503"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1 text-yellow-200">Ubicación</label>
            <input
              list="ubicaciones"
              value={ubicacionCodigo}
              onChange={(e) => setUbicacionCodigo(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 text-sm sm:text-base focus:outline-none focus:border-orange-500"
              placeholder="Escribí el código"
            />
            <datalist id="ubicaciones">
              {ubicaciones.map((ubic) => (
                <option key={ubic.ubicacion_id} value={ubic.codigo} />
              ))}
            </datalist>
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1 text-yellow-200">Denominación</label>
            <input
              type="text"
              value={denominacion}
              readOnly
              className="w-full bg-zinc-700 text-gray-400 rounded-md border border-zinc-600 py-2 px-3 text-sm sm:text-base cursor-not-allowed"
              placeholder="Se completa automáticamente"
            />
          </div>

          <div>
            <label className="block text-sm sm:text-base font-medium mb-1 text-yellow-200">Cantidad</label>
            <input
              type="number"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 text-sm sm:text-base focus:outline-none focus:border-orange-500"
              placeholder="Ej: 100"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 text-sm sm:text-base"
          >
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPlanoManual;