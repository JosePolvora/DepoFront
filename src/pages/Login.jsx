import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';  // Importar SweetAlert2

const Login = () => {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [errorLogin, setErrorLogin] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorLogin('');

    try {
      const response = await axios.post('http://localhost:3000/api/usuarios/login', {
        correo,
        clave,
      });

      console.log("Login exitoso:", response.data);

      if (response.data.ok) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('usuario', JSON.stringify(response.data.usuario));

        // Mostrar alerta de éxito
        await Swal.fire({
          icon: 'success',
          title: '¡Inicio de sesión exitoso!',
          text: `Bienvenido ${response.data.usuario.nombre} ${response.data.usuario.apellido}`,

          timer: 2000,
          showConfirmButton: false,
        });

        // Redireccionar según rol
        const rol = response.data.usuario.rol;

        if (rol === 'Administrador' || rol === 'Usuario') {
          navigate('/consultapieza');
        } else {
          navigate('/');
        }
      } else {
        setErrorLogin(response.data.message || 'Credenciales incorrectas. Por favor, verificá tus datos.');

        // Mostrar alerta de error
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: response.data.message || 'Credenciales incorrectas. Por favor, verificá tus datos.',
        });
      }
    } catch (error) {
      console.error('Error en el login:', error);
      setErrorLogin('Error al iniciar sesión. Revisá tu conexión o intentá de nuevo.');

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Error al iniciar sesión. Revisá tu conexión o intentá de nuevo.',
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

      <div className="relative z-10 bg-zinc-800 border-2 border-orange-500 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-bold text-orange-500 text-center mb-6">Inicio de Sesión</h2>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="correo" className="block text-sm font-semibold text-yellow-200 mb-1">Correo Electrónico</label>
            <input
              type="email"
              id="correo"
              name="correo"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
              className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
              placeholder="tucorreo@ejemplo.com"
            />
          </div>

          <div>
            <label htmlFor="clave" className="block text-sm font-semibold text-yellow-200 mb-1">Contraseña</label>
            <input
              type="password"
              id="clave"
              name="clave"
              value={clave}
              onChange={(e) => setClave(e.target.value)}
              required
              className="mt-1 w-full p-3 bg-zinc-700 text-white border border-zinc-600 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500 placeholder-zinc-400"
              placeholder="••••••••"
            />
          </div>

          {errorLogin && (
            <div className="bg-red-900/50 border border-red-600 text-red-200 p-3 rounded-md text-center">
              {errorLogin}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black p-3 rounded-md shadow-sm transition duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
          >
            Iniciar Sesión
          </button>
        </form>

        <p className="text-center text-sm text-zinc-400 mt-6">
          ¿No tenés una cuenta?{' '}
          <Link to="/registro" className="text-orange-400 hover:text-orange-300 hover:underline font-medium">
            Registrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
