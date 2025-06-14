// import { useLocation, useNavigate } from "react-router-dom";
// import { useState, useEffect } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";

// export default function EditarPlano() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { plano, ubicacionActual, stockActual } = location.state || {};

//   const [nuevaUbicacion, setNuevaUbicacion] = useState("");
//   const [cantidadTrasladada, setCantidadTrasladada] = useState(stockActual || 0);
//   const [todasLasUbicaciones, setTodasLasUbicaciones] = useState([]);

//   useEffect(() => {
//     const fetchUbicaciones = async () => {
//       try {
//         const res = await axios.get("http://localhost:3000/api/ubicaciones");
//         setTodasLasUbicaciones(res.data.body || []);
//       } catch (error) {
//         console.error("Error al cargar ubicaciones:", error);
//       }
//     };

//     fetchUbicaciones();
//   }, []);

//   const handleCambioUbicacion = (e) => {
//     setNuevaUbicacion(e.target.value.toUpperCase());
//   };

//   const handleGuardar = async () => {
//     try {
//       const usuario = JSON.parse(localStorage.getItem("usuario"));
//       if (!usuario?.id) {
//         Swal.fire("Error", "Usuario no identificado. Por favor inicia sesión.", "error");
//         return;
//       }

//       if (!nuevaUbicacion) {
//         Swal.fire("Error", "Debe ingresar una nueva ubicación.", "error");
//         return;
//       }

//       const cantidad = parseInt(cantidadTrasladada, 10);
//       if (isNaN(cantidad) || cantidad <= 0) {
//         Swal.fire("Error", "Cantidad inválida.", "error");
//         return;
//       }

//       if (cantidad > stockActual) {
//         Swal.fire("Error", "La cantidad supera el stock disponible.", "error");
//         return;
//       }

//       // Obtener id de la nueva ubicación
//       const res = await axios.get(
//         `http://localhost:3000/api/ubicaciones/ubicacion/codigos/${nuevaUbicacion}`
//       );
//       const nueva_ubicacion_id = res.data?.body?.ubicacion_id;

//       if (!nueva_ubicacion_id) {
//         Swal.fire("Error", "Ubicación no encontrada.", "error");
//         return;
//       }

//       const origen_id = ubicacionActual.ubicacion_id;
//       const destino_id = nueva_ubicacion_id;

//       // 1) Registrar egreso (salida de stock) en ubicación origen
//       const egresoRes = await axios.post("http://localhost:3000/api/egresos", {
//         plano_id: plano.plano_id,
//         ubicacion_id: origen_id,
//         cantidad: cantidad,
//         motivo: "Traslado de plano a nueva ubicación",
//         usuario_id: usuario.id,
//       });

//       const egreso_id = egresoRes.data?.body?.egreso_id;

//       if (!egreso_id) {
//         Swal.fire("Error", "No se pudo registrar el egreso correctamente.", "error");
//         return;
//       }

//       // 2) Registrar historial con el egreso_id
//       await axios.post("http://localhost:3000/api/historiales", {
//         plano_id: plano.plano_id,
//         ubicacion_id: origen_id,
//         usuario_id: usuario.id,
//         egreso_id: egreso_id,
//         fecha: new Date(),
//       });

//       // 3) Actualizar stock
//       if (cantidad === stockActual) {
//         // Eliminar stock en origen y crear o actualizar en destino
//         await axios.delete("http://localhost:3000/api/planoxubicacion", {
//           data: {
//             plano_id: plano.plano_id,
//             ubicacion_id: origen_id,
//           },
//         });

//         await axios.post(
//           "http://localhost:3000/api/planoxubicacion/actualizar-stock-ubicacion",
//           {
//             plano_id: plano.plano_id,
//             ubicacion_id: destino_id,
//             cantidad: cantidad,
//           }
//         );
//       } else {
//         // Modificar cantidades en origen y destino
//         await axios.put("http://localhost:3000/api/planoxubicacion", {
//           plano_id: plano.plano_id,
//           ubicacion_origen_id: origen_id,
//           ubicacion_destino_id: destino_id,
//           cantidad: cantidad,
//         });
//       }

//       // 4) Registrar ingreso (entrada de stock) en destino
//       const ingresoRes = await axios.post("http://localhost:3000/api/ingresos", {
//         plano_id: plano.plano_id,
//         ubicacion_id: destino_id,
//         cantidad: cantidad,
//         motivo: "Recepción de plano por traslado",
//         usuario_id: usuario.id,
//       });

//       const ingreso_id = ingresoRes.data?.body?.ingreso_id;

//       if (!ingreso_id) {
//         Swal.fire("Error", "No se pudo registrar el ingreso en destino.", "error");
//         return;
//       }

//       // 5) Registrar historial con ingreso_id en la nueva ubicación
//       await axios.post("http://localhost:3000/api/historiales", {
//         plano_id: plano.plano_id,
//         ubicacion_id: destino_id,
//         usuario_id: usuario.id,
//         ingreso_id: ingreso_id,
//         fecha: new Date(),
//       });

//       Swal.fire("¡Éxito!", "El traslado fue registrado correctamente.", "success").then(() => {
//         navigate("/consultapieza");
//       });
//     } catch (error) {
//       console.error("Error al guardar traslado:", error);
//       Swal.fire("Error", "Ocurrió un error al guardar los cambios.", "error");
//     }
//   };

//   if (!plano || !ubicacionActual) {
//     return (
//       <div className="text-white p-6">
//         No se pudo cargar la información del plano.
//       </div>
//     );
//   }

//   return (
//     <div className="bg-zinc-900 min-h-screen p-6 text-white">
//       <div className="bg-zinc-800 p-6 rounded-lg max-w-xl mx-auto border border-orange-500 shadow-md">
//         <h2 className="text-xl font-bold mb-6 text-orange-400 text-center">
//           Editar Plano - Traslado (Egreso + Ingreso)
//         </h2>

//         <p className="mb-2"><strong>Plano:</strong> {plano.plano}</p>
//         <p className="mb-2"><strong>Denominación:</strong> {plano.denominacion}</p>
//         <p className="mb-2"><strong>Cantidad actual:</strong> {stockActual ?? "-"}</p>
//         <p className="mb-2"><strong>Origen:</strong> {plano.origen || "-"}</p>
//         <p className="mb-4"><strong>Ubicación actual:</strong> {ubicacionActual?.codigo || "-"}</p>

//         <div className="mb-4">
//           <label className="block mb-1">Nueva ubicación:</label>
//           <input
//             type="text"
//             className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
//             value={nuevaUbicacion}
//             onChange={handleCambioUbicacion}
//             list="ubicaciones"
//             placeholder="Código nueva ubicación"
//           />
//           <datalist id="ubicaciones">
//             {todasLasUbicaciones.map((ubi) => (
//               <option key={ubi.ubicacion_id} value={ubi.codigo} />
//             ))}
//           </datalist>
//         </div>

//         <div className="mb-6">
//           <label className="block mb-1">Cantidad a trasladar:</label>
//           <input
//             type="number"
//             className="w-full p-2 rounded bg-zinc-700 border border-zinc-600"
//             value={cantidadTrasladada}
//             onChange={(e) => setCantidadTrasladada(e.target.value)}
//             placeholder="Cantidad"
//             min="1"
//             max={stockActual}
//           />
//         </div>

//         <button
//           onClick={handleGuardar}
//           className="w-full bg-orange-500 text-black font-semibold py-2 px-4 rounded hover:bg-orange-600"
//         >
//           Guardar
//         </button>
//       </div>
//     </div>
//   );
// }

import { useLocation, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";

export default function EditarPlano() {
  const location = useLocation();
  const navigate = useNavigate();
  const { plano, ubicacionActual, stockActual } = location.state || {};

  const [nuevaUbicacion, setNuevaUbicacion] = useState("");
  const [cantidadTrasladada, setCantidadTrasladada] = useState(stockActual || 0);
  const [todasLasUbicaciones, setTodasLasUbicaciones] = useState([]);

  useEffect(() => {
    const fetchUbicaciones = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/ubicaciones");
        setTodasLasUbicaciones(res.data.body || []);
      } catch (error) {
        console.error("Error al cargar ubicaciones:", error);
      }
    };

    fetchUbicaciones();
  }, []);

  const handleCambioUbicacion = (e) => {
    setNuevaUbicacion(e.target.value.toUpperCase());
  };

  const handleGuardar = async () => {
    try {
      const usuario = JSON.parse(localStorage.getItem("usuario"));
      if (!usuario?.id) {
        Swal.fire("Error", "Usuario no identificado. Por favor inicia sesión.", "error");
        return;
      }

      if (!nuevaUbicacion) {
        Swal.fire("Error", "Debe ingresar una nueva ubicación.", "error");
        return;
      }

      const cantidad = parseInt(cantidadTrasladada, 10);
      if (isNaN(cantidad) || cantidad <= 0) {
        Swal.fire("Error", "Cantidad inválida.", "error");
        return;
      }

      if (cantidad > stockActual) {
        Swal.fire("Error", "La cantidad supera el stock disponible.", "error");
        return;
      }

      // Obtener id de la nueva ubicación
      const res = await axios.get(
        `http://localhost:3000/api/ubicaciones/ubicacion/codigos/${nuevaUbicacion}`
      );
      const nueva_ubicacion_id = res.data?.body?.ubicacion_id;

      if (!nueva_ubicacion_id) {
        Swal.fire("Error", "Ubicación no encontrada.", "error");
        return;
      }

      const origen_id = ubicacionActual.ubicacion_id;
      const destino_id = nueva_ubicacion_id;

      // 1) Registrar egreso (salida de stock) en ubicación origen
      const egresoRes = await axios.post("http://localhost:3000/api/egresos", {
        plano_id: plano.plano_id,
        ubicacion_id: origen_id,
        cantidad: cantidad,
        motivo: "Traslado de plano a nueva ubicación",
        usuario_id: usuario.id,
      });

      const egreso_id = egresoRes.data?.body?.egreso_id;

      if (!egreso_id) {
        Swal.fire("Error", "No se pudo registrar el egreso correctamente.", "error");
        return;
      }

      // 2) Registrar historial con el egreso_id
      await axios.post("http://localhost:3000/api/historiales", {
        plano_id: plano.plano_id,
        ubicacion_id: origen_id,
        usuario_id: usuario.id,
        egreso_id: egreso_id,
        fecha: new Date(),
      });

      // 3) Actualizar stock
      if (cantidad === stockActual) {
        // Eliminar stock en origen y crear o actualizar en destino
        await axios.delete("http://localhost:3000/api/planoxubicacion", {
          data: {
            plano_id: plano.plano_id,
            ubicacion_id: origen_id,
          },
        });

        await axios.post(
          "http://localhost:3000/api/planoxubicacion/actualizar-stock-ubicacion",
          {
            plano_id: plano.plano_id,
            ubicacion_id: destino_id,
            cantidad: cantidad,
          }
        );
      } else {
        // Modificar cantidades en origen y destino
        await axios.put("http://localhost:3000/api/planoxubicacion", {
          plano_id: plano.plano_id,
          ubicacion_origen_id: origen_id,
          ubicacion_destino_id: destino_id,
          cantidad: cantidad,
        });
      }

      // 4) Registrar ingreso (entrada de stock) en destino
      const ingresoRes = await axios.post("http://localhost:3000/api/ingresos", {
        plano_id: plano.plano_id,
        ubicacion_id: destino_id,
        cantidad: cantidad,
        motivo: "Recepción de plano por traslado",
        usuario_id: usuario.id,
      });

      const ingreso_id = ingresoRes.data?.body?.ingreso_id;

      if (!ingreso_id) {
        Swal.fire("Error", "No se pudo registrar el ingreso en destino.", "error");
        return;
      }

      // 5) Registrar historial con ingreso_id en la nueva ubicación
      await axios.post("http://localhost:3000/api/historiales", {
        plano_id: plano.plano_id,
        ubicacion_id: destino_id,
        usuario_id: usuario.id,
        ingreso_id: ingreso_id,
        fecha: new Date(),
      });

      Swal.fire("¡Éxito!", "El traslado fue registrado correctamente.", "success").then(() => {
        navigate("/consultapieza");
      });
    } catch (error) {
      console.error("Error al guardar traslado:", error);
      Swal.fire("Error", "Ocurrió un error al guardar los cambios.", "error");
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
    <div className="bg-zinc-900 min-h-screen p-4 sm:p-6 text-white">
      <div className="bg-zinc-800 p-4 sm:p-6 rounded-lg max-w-xl mx-auto border border-orange-500 shadow-md">
        <h2 className="text-lg sm:text-xl font-bold mb-4 sm:mb-6 text-orange-400 text-center">
          Trasladar Plano entre Ubicaciones
        </h2>

        <p className="mb-2 text-sm sm:text-base">
          <strong>Plano:</strong> {plano.plano}
        </p>
        <p className="mb-2 text-sm sm:text-base">
          <strong>Denominación:</strong> {plano.denominacion}
        </p>
        <p className="mb-2 text-sm sm:text-base">
          <strong>Cantidad actual:</strong> {stockActual ?? "-"}
        </p>
        <p className="mb-2 text-sm sm:text-base">
          <strong>Origen:</strong> {plano.origen || "-"}
        </p>
        <p className="mb-4 text-sm sm:text-base">
          <strong>Ubicación actual:</strong> {ubicacionActual?.codigo || "-"}
        </p>

        <div className="mb-4">
          <label className="block mb-1 text-sm sm:text-base">Nueva ubicación:</label>
          <input
            type="text"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 text-sm sm:text-base"
            value={nuevaUbicacion}
            onChange={handleCambioUbicacion}
            list="ubicaciones"
            placeholder="Código nueva ubicación"
          />
          <datalist id="ubicaciones">
            {todasLasUbicaciones.map((ubi) => (
              <option key={ubi.ubicacion_id} value={ubi.codigo} />
            ))}
          </datalist>
        </div>

        <div className="mb-6">
          <label className="block mb-1 text-sm sm:text-base">Cantidad a trasladar:</label>
          <input
            type="number"
            className="w-full p-2 rounded bg-zinc-700 border border-zinc-600 text-sm sm:text-base"
            value={cantidadTrasladada}
            onChange={(e) => setCantidadTrasladada(e.target.value)}
            placeholder="Cantidad"
            min="1"
            max={stockActual}
          />
        </div>

        <button
          onClick={handleGuardar}
          className="w-full bg-orange-500 text-black font-semibold py-2 px-4 rounded hover:bg-orange-600 transition-colors duration-200"
        >
          Trasladar
        </button>
      </div>
    </div>
  );
}
