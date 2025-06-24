import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Swal from 'sweetalert2';

function FormUsuarios() {
    const { usuario_id } = useParams();
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [sector, setSector] = useState('');
    const [legajo, setLegajo] = useState('');
    const [rol, setRol] = useState('');
    const [activo, setActivo] = useState(false);

    useEffect(() => {
        if (usuario_id) {
            const obtenerUsuario = async () => {
                try {
                    const response = await axios.get(`http://localhost:3000/api/usuarios/${usuario_id}`);
                    if (response.status === 200) {
                        const usuario = response.data.body;
                        setNombre(usuario.nombre);
                        setApellido(usuario.apellido);
                        setCorreo(usuario.correo);
                        setSector(usuario.sector);
                        setLegajo(usuario.legajo);
                        const rolId = usuario.rol?.rol_id?.toString() || '';
                        setRol(rolId);
                        setActivo(usuario.activo === "1" || usuario.activo === 1 || usuario.activo === true);
                    }
                } catch (error) {
                    console.error("Error al obtener el usuario", error);
                }
            };
            obtenerUsuario();
        }
    }, [usuario_id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3000/api/usuarios/admin', {
                nombre, apellido, correo, sector, legajo, rol, activo,
            });

            if (res.data.ok) {
                await Swal.fire({
                    icon: 'success',
                    title: 'Usuario creado con éxito',
                    timer: 2000,
                    showConfirmButton: false,
                });
                setNombre('');
                setApellido('');
                setCorreo('');
                setSector('');
                setLegajo('');
                setRol('');
                setActivo(false);
            }
        } catch (error) {
            console.error('Error al agregar el usuario:', error);
            await Swal.fire({
                icon: 'error',
                title: 'Error al crear usuario',
            });
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:3000/api/usuarios/${usuario_id}`, {
                nombre, apellido, correo, sector, legajo, rol_id: rol, activo,
            });
            await Swal.fire({
                icon: 'success',
                title: 'Usuario actualizado con éxito',
                timer: 2000,
                showConfirmButton: false,
            });
        } catch (error) {
            await Swal.fire({
                icon: 'error',
                title: 'Error al actualizar el usuario',
            });
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-[#1a1a1a] via-[#2b2b2b] to-black text-white font-[Poppins] flex flex-col items-center px-4 py-10">
            <form
                onSubmit={usuario_id ? handleUpdate : handleSubmit}
                className="w-full max-w-full sm:max-w-lg bg-[#1f1f1f] rounded-xl shadow-lg px-4 sm:px-8 py-8 space-y-5 border border-orange-400"
            >
                <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-8 text-orange-400 text-center">
                    {usuario_id ? "Editar Usuario" : "Agregar Usuario"}
                </h2>

                <input type="text" placeholder="Nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required
                    className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <input type="text" placeholder="Apellido" value={apellido} onChange={(e) => setApellido(e.target.value)} required
                    className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <input type="email" placeholder="Email" value={correo} onChange={(e) => setCorreo(e.target.value)} required
                    className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <input type="text" placeholder="Sector" value={sector} onChange={(e) => setSector(e.target.value)} required
                    className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <input type="text" placeholder="Legajo" value={legajo} onChange={(e) => setLegajo(e.target.value)} required
                    className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-yellow-300 placeholder-yellow-200 focus:outline-none focus:ring-2 focus:ring-orange-400" />

                <select value={rol} onChange={(e) => setRol(e.target.value)} required
                    className="w-full px-4 py-2 rounded-md bg-[#2c2c2c] text-yellow-300 focus:outline-none focus:ring-2 focus:ring-orange-400">
                    <option value="">Seleccionar Rol</option>
                    <option value="1">Administrador</option>
                    <option value="2">Usuario</option>
                </select>

                <div className="flex items-center space-x-3">
                    <input type="checkbox" checked={activo} onChange={(e) => setActivo(e.target.checked)}
                        className="w-5 h-5 text-orange-400 focus:ring-orange-300" />
                    <label className="text-sm font-medium text-yellow-200">Activo</label>
                </div>

                <input type="submit" value={usuario_id ? "Actualizar" : "Agregar"}
                    className="w-full py-2 mt-4 bg-gradient-to-r from-yellow-400 via-orange-400 to-yellow-500 text-black font-semibold rounded-md hover:from-orange-400 hover:to-yellow-300 transition duration-300" />
            </form>

        </div>
    );
}

export default FormUsuarios;
