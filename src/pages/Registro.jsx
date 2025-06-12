import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const Registro = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [sector, setSector] = useState('');
  const [legajo, setLegajo] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

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
        await Swal.fire({
          icon: 'success',
          title: 'Registro exitoso',
          text: `¡Bienvenido ${nombre} ${apellido}! Ya puedes iniciar sesión.`,
          timer: 2500,
          showConfirmButton: false,
        });

        // Limpiar campos
        setNombre('');
        setApellido('');
        setCorreo('');
        setClave('');
        setSector('');
        setLegajo('');
      } else {
        await Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: response.data.message || 'Error al registrar el usuario. Intenta de nuevo.',
        });
      }
    } catch (error) {
      await Swal.fire({
        icon: 'error',
        title: 'Error en el servidor',
        text: 'Error en el servidor al intentar registrar. Revisa tu conexión.',
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 relative">
      <div className="absolute inset-0 z-0">
        <img
          src="https://media.istockphoto.com/id/1208067405/es/foto/edificio-de-almac%C3%A9n-3d.jpg?s=1024x1024&w=is&k=20&c=LPG7PBQ2c7D6Q5ynFltpHb2wt5DTygirUHd0YqlSDN4="
          alt="fondo"
          className="w-full h-full object-cover opacity-30"
        />
      </div>

      <div className="relative z-10 bg-zinc-800 border-2 border-orange-500 p-8 rounded-lg shadow-xl max-w-2xl w-full">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Registro de Usuario</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
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
