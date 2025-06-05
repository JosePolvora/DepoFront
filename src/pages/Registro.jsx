// import React, { useState } from 'react';
// import axios from 'axios';
// import { Link } from 'react-router-dom';

// const Registro = () => {
//   const [nombre, setNombre] = useState('');
//   const [apellido, setApellido] = useState('');
//   const [correo, setCorreo] = useState('');
//   const [clave, setClave] = useState('');
//   const [sector, setSector] = useState('');
//   const [legajo, setLegajo] = useState('');


//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post('http://localhost:3000/api/usuarios', {
//         nombre,
//         apellido,
//         correo,
//         clave,
//         sector,
//         legajo,

//       });

//       if (response.data.ok) {
//         console.log('Usuario registrado exitosamente');
//         alert('Registro exitoso');

//         setNombre('');
//         setApellido('');
//         setCorreo('');
//         setClave('');
//         setSector('');
//         setLegajo('');

//       } else {
//         console.error('Error al registrar el usuario');
//         alert('Error al registrar el usuario');
//       }
//     } catch (error) {
//       console.error('Error en el servidor:', error);
//       alert('Error en el servidor');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-900">
//       <div className="absolute inset-0 z-0">
//         <img
//           src="https://media.istockphoto.com/id/1208067405/es/foto/edificio-de-almac%C3%A9n-3d.jpg?s=1024x1024&w=is&k=20&c=LPG7PBQ2c7D6Q5ynFltpHb2wt5DTygirUHd0YqlSDN4="
//           alt="fondo"
//           className="w-full h-full object-cover opacity-30"
//         />
//       </div>

//       <div className="relative z-10 bg-white bg-opacity-90 p-10 rounded-2xl shadow-2xl max-w-2xl w-full">
//         <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Registro</h2>

//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700">Nombres</label>
//               <input
//                 type="text"
//                 value={nombre}
//                 onChange={(e) => setNombre(e.target.value)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="nombres"
//                 required
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700">Apellido</label>
//               <input
//                 type="text"
//                 value={apellido}
//                 onChange={(e) => setApellido(e.target.value)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="apellido"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700">Sector</label>
//               <input
//                 type="text"
//                 value={sector}
//                 onChange={(e) => setSector(e.target.value)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="sector"
//                 required
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700">Legajo</label>
//               <input
//                 type="text"
//                 value={legajo}
//                 onChange={(e) => setLegajo(e.target.value)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="legajo"
//                 required
//               />
//             </div>
//           </div>

//           <div className="flex space-x-4">
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
//               <input
//                 type="email"
//                 value={correo}
//                 onChange={(e) => setCorreo(e.target.value)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="tucorreo@ejemplo.com"
//                 required
//               />
//             </div>
//             <div className="w-1/2">
//               <label className="block text-sm font-medium text-gray-700">Contraseña</label>
//               <input
//                 type="password"
//                 value={clave}
//                 onChange={(e) => setClave(e.target.value)}
//                 className="mt-1 w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
//                 placeholder="••••••••"
//                 required
//               />
//             </div>
//           </div>

//           <div>
//             <button
//               type="submit"
//               className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition duration-200 font-semibold"
//             >
//               Registrarse
//             </button>
//           </div>
//         </form>

//         <p className="text-center text-sm text-gray-600 mt-6">
//           ¿Ya tenés una cuenta?{' '}
//           <Link to="/login" className="text-blue-600 hover:underline">
//             Iniciá sesión
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Registro;

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [sector, setSector] = useState('');
  const [legajo, setLegajo] = useState('');
  const [registroExitoso, setRegistroExitoso] = useState(false); // Nuevo estado para feedback
  const [errorRegistro, setErrorRegistro] = useState(''); // Nuevo estado para manejar errores

  const handleSubmit = async (e) => {
    e.preventDefault();
    setRegistroExitoso(false); // Resetear estado
    setErrorRegistro(''); // Limpiar errores previos

    try {
      const response = await axios.post('http://localhost:3000/api/usuarios', {
        nombre,
        apellido,
        correo,
        clave,
        sector,
        legajo,
      });

      if (response.data.ok) {
        console.log('Usuario registrado exitosamente');
        setRegistroExitoso(true); // Indicar éxito

        // Limpiar campos del formulario
        setNombre('');
        setApellido('');
        setCorreo('');
        setClave('');
        setSector('');
        setLegajo('');

      } else {
        console.error('Error al registrar el usuario:', response.data.message);
        setErrorRegistro(response.data.message || 'Error al registrar el usuario. Intenta de nuevo.');
      }
    } catch (error) {
      console.error('Error en el servidor:', error);
      setErrorRegistro('Error en el servidor al intentar registrar. Revisa tu conexión.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 relative"> {/* Fondo oscuro */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.istockphoto.com/id/1208067405/es/foto/edificio-de-almac%C3%A9n-3d.jpg?s=1024x1024&w=is&k=20&c=LPG7PBQ2c7D6Q5ynFltpHb2wt5DTygirUHd0YqlSDN4="
          alt="fondo"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 bg-zinc-800 border-2 border-orange-500 p-8 rounded-lg shadow-xl max-w-2xl w-full"> {/* Caja de registro estilizada */}
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Registro de Usuario</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"> {/* Flexbox para dos columnas */}
            <div className="w-full md:w-1/2">
              <label htmlFor="nombre" className="block text-sm font-semibold text-yellow-200 mb-1">Nombres</label>
              <input
                type="text"
                id="nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
                placeholder="ingresa tus nombres"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="apellido" className="block text-sm font-semibold text-yellow-200 mb-1">Apellido</label>
              <input
                type="text"
                id="apellido"
                value={apellido}
                onChange={(e) => setApellido(e.target.value)}
                className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
                placeholder="ingresa tu apellido"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="sector" className="block text-sm font-semibold text-yellow-200 mb-1">Sector</label>
              <input
                type="text"
                id="sector"
                value={sector}
                onChange={(e) => setSector(e.target.value)}
                className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
                placeholder="ej: Producción, Ventas"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="legajo" className="block text-sm font-semibold text-yellow-200 mb-1">Legajo</label>
              <input
                type="text"
                id="legajo"
                value={legajo}
                onChange={(e) => setLegajo(e.target.value)}
                className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
                placeholder="tu número de legajo"
                required
              />
            </div>
          </div>

          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="w-full md:w-1/2">
              <label htmlFor="correo" className="block text-sm font-semibold text-yellow-200 mb-1">Correo Electrónico</label>
              <input
                type="email"
                id="correo"
                value={correo}
                onChange={(e) => setCorreo(e.target.value)}
                className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
                placeholder="tucorreo@ejemplo.com"
                required
              />
            </div>
            <div className="w-full md:w-1/2">
              <label htmlFor="clave" className="block text-sm font-semibold text-yellow-200 mb-1">Contraseña</label>
              <input
                type="password"
                id="clave"
                value={clave}
                onChange={(e) => setClave(e.target.value)}
                className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
                placeholder="••••••••"
                required
              />
            </div>
          </div>

          {registroExitoso && (
            <div className="bg-green-900/50 border border-green-700 text-green-200 p-3 rounded-md text-center">
              ¡Registro exitoso! Ya puedes iniciar sesión.
            </div>
          )}

          {errorRegistro && (
            <div className="bg-red-900/50 border border-red-700 text-red-200 p-3 rounded-md text-center">
              {errorRegistro}
            </div>
          )}

          <div>
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black p-3 rounded-md shadow-sm transition duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
            >
              Registrarse
            </button>
          </div>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          ¿Ya tenés una cuenta?{' '}
          <Link to="/login" className="text-orange-400 hover:text-orange-300 hover:underline font-medium">
            Iniciá sesión
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Registro;