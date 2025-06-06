import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function EditarPlano() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plano, ubicacionActual, stockActual } = location.state || {};

  const [nuevaUbicacion, setNuevaUbicacion] = useState("");
  const [nuevoStock, setNuevoStock] = useState(stockActual || 0);

  const handleGuardar = async () => {
    try {
      if (!nuevaUbicacion) return;

      const cantidadTrasladada = parseInt(nuevoStock);
      if (isNaN(cantidadTrasladada) || cantidadTrasladada <= 0) return;
      if (cantidadTrasladada > stockActual) return;

      // Obtener ID de nueva ubicación
      const res = await axios.get(
        `http://localhost:3000/api/ubicaciones/ubicacion/codigos/${nuevaUbicacion}`
      );
      const nueva_ubicacion_id = res.data?.body?.ubicacion_id;
      if (!nueva_ubicacion_id) return;

      const origen_id = ubicacionActual.ubicacion_id;
      const destino_id = nueva_ubicacion_id;

      // Registrar egreso en ubicación origen
      await axios.post("http://localhost:3000/api/egresos", {
        plano_id: plano.plano_id,
        ubicacion_id: origen_id,
        cantidad: cantidadTrasladada,
        motivo: "Traslado de plano a nueva ubicación",
      });

      // Registrar ingreso en ubicación destino
      await axios.post("http://localhost:3000/api/ingresos", {
        plano_id: plano.plano_id,
        ubicacion_id: destino_id,
        cantidad: cantidadTrasladada,
        motivo: "Ingreso por traslado de plano desde ubicación origen",
      });

      if (cantidadTrasladada === stockActual) {
        // Traslado total: eliminar relación origen
        await axios.delete("http://localhost:3000/api/planoxubicacion", {
          data: {
            plano_id: plano.plano_id,
            ubicacion_id: origen_id,
          },
        });

        // Insertar o actualizar nueva ubicación con todo el stock
        await axios.post(
          "http://localhost:3000/api/planoxubicacion/actualizar-stock-ubicacion",
          {
            plano_id: plano.plano_id,
            ubicacion_id: destino_id,
            cantidad: cantidadTrasladada,
          }
        );
      } else {
        // Traslado parcial: actualizar stock origen y mover stock a destino
        await axios.put("http://localhost:3000/api/planoxubicacion", {
          plano_id: plano.plano_id,
          ubicacion_origen_id: origen_id,
          ubicacion_destino_id: destino_id,
          cantidad: cantidadTrasladada,
        });
      }

      navigate("/consultapieza");
    } catch (error) {
      console.error("❌ Error al guardar los cambios del plano:", error);
    }
  };

  if (!plano || !ubicacionActual) {
    return (
      <div className="text-white p-6">
        No se pudo cargar la información del plano.
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 min-h-screen p-6 text-white">
      <div className="bg-zinc-800 p-6 rounded-lg max-w-xl mx-auto border border-orange-500 shadow-md">
        <h2 className="text-xl font-bold mb-6 text-orange-400 text-center">
          Editar Plano
        </h2>

        <p className="mb-2">
          <strong>Plano:</strong> {plano.plano}
        </p>
        <p className="mb-2">
          <strong>Denominación:</strong> {plano.denominacion}
        </p>
        <p className="mb-2">
          <strong>Cantidad actual:</strong> {stockActual ?? "-"}
        </p>
        <p className="mb-2">
          <strong>Origen:</strong> {plano.origen || "-"}
        </p>
        <p className="mb-4">
          <strong>Ubicación actual:</strong> {ubicacionActual?.codigo || "-"}
        </p>

        <div className="mb-4">
          <label className="block mb-1">Nueva ubicación:</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
            value={nuevaUbicacion}
            onChange={(e) => setNuevaUbicacion(e.target.value.toUpperCase())}
            placeholder="Código nueva ubicación"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1">Cantidad a trasladar:</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
            value={nuevoStock}
            onChange={(e) => setNuevoStock(e.target.value)}
            placeholder="Cantidad"
            min="1"
            max={stockActual}
          />
        </div>

        <button
          onClick={handleGuardar}
          className="w-full bg-orange-500 text-black font-semibold py-2 px-4 rounded hover:bg-orange-600"
        >
          Guardar cambios
        </button>
      </div>
    </div>
  );
}
