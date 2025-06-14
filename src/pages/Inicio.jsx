// import React, { useState, useEffect, useRef } from 'react';
// import axios from 'axios'; // Asegúrate de tener axios instalado
// import logo from '../assets/imagenes/logoJosemadesing.png';
// import whatsapp from "../assets/imagenes/whatsapp.png";
// import { FaSignInAlt, FaEnvelope } from "react-icons/fa";

// export default function Inicio() {
//   const [mostrarChat, setMostrarChat] = useState(false);
//   const [mensaje, setMensaje] = useState('');
//   const [historial, setHistorial] = useState([
//     { from: 'bot', text: '👋 ¡Hola! ¿En qué puedo ayudarte?' }
//   ]);
//   const chatRef = useRef(null);

//   const enviarMensaje = async () => {
//     if (!mensaje.trim()) return;

//     // Añadir mensaje del usuario al historial
//     setHistorial((prev) => [...prev, { from: 'user', text: mensaje }]);

//     try {
//       // Llamar al backend para obtener respuesta
//       const response = await axios.post('http://localhost:3000/api/ai/ask', { question: mensaje });
//       const respuesta = response.data.answer;

//       // Añadir respuesta del bot al historial
//       setHistorial((prev) => [...prev, { from: 'bot', text: respuesta }]);
//     } catch (error) {
//       setHistorial((prev) => [...prev, { from: 'bot', text: 'Error al conectar con el servidor' }]);
//     }

//     setMensaje('');
//   };

//   // Enviar mensaje cuando presionan Enter en el input (sin shift)
//   const handleKeyDown = (e) => {
//     if (e.key === 'Enter' && !e.shiftKey) {
//       e.preventDefault();
//       enviarMensaje();
//     }
//   };

//   // Scroll automático al último mensaje
//   useEffect(() => {
//     if (chatRef.current) {
//       chatRef.current.scrollTop = chatRef.current.scrollHeight;
//     }
//   }, [historial]);

//   return (
//     <div className="min-h-screen bg-orange-50 flex flex-col">
//       {/* Header */}


//       <header className="bg-gradient-to-r from-[#1A1A1A] to-orange-500 shadow">
//         <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
//           <div className="flex items-center space-x-4">
//             <img src={logo} alt="Logo" className="h-40 w-auto" />
//           </div>
//           <nav className="space-x-6 flex items-center">
//             <a href="/login" className="flex items-center text-white hover:text-yellow-100 font-semibold space-x-2">
//               <FaSignInAlt className="text-xl" />
//               <span className="hidden sm:inline font-poppins">Iniciar Sesión</span>
//             </a>
//             <a href="#footer" className="flex items-center text-white hover:text-yellow-100 font-semibold space-x-2">
//               <FaEnvelope className="text-xl" />
//               <span className="hidden sm:inline font-poppins">Contacto</span>
//             </a>
//           </nav>
//         </div>
//       </header>

//       {/* Contenido principal */}
//       <div className="p-6 space-y-12 flex-grow">
//         {/* Secciones */}
//         <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
//           <img
//             src="https://media.istockphoto.com/id/2177135894/photo/the-inside-of-a-working-warehouse-dispatch-centre.jpg?s=1024x1024&w=is&k=20&c=t-QL-Ak-CIAxsyOajUoH78YdlI2KI1CDwNoweow4LMw="
//             alt="Depósito de piezas"
//             className="w-full md:w-1/2 rounded-lg object-cover"
//           />
//           <div>
//             <h3 className="text-xl font-semibold text-orange-500 mb-2 font-poppins">Nuestros Almacenes</h3>
//             <p className="text-gray-700">
//               En nuestros depósitos especializados gestionamos con precisión miles de piezas automotrices...
//             </p>
//           </div>
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 flex flex-col-reverse md:flex-row items-center gap-6">
//           <div>
//             <h3 className="text-xl font-semibold text-orange-500 mb-2 font-poppins">Nuestra Flota Interna</h3>
//             <p className="text-gray-700">
//               Contamos con una flota moderna de vehículos especializados para operaciones dentro del depósito...
//             </p>
//           </div>
//           <img
//             src="https://images.unsplash.com/photo-1740733448722-82e16d3468bb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//             alt="Vehículos de fábrica"
//             className="w-full md:w-1/2 rounded-lg object-cover"
//           />
//         </div>

//         <div className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
//           <img
//             src="https://media.istockphoto.com/id/1477501411/photo/group-new-generation-of-engineers-in-a-metal-sheet-factory-studying-work-methods-from.jpg?s=612x612&w=0&k=20&c=IEawOMyTAWBfWbN0Dc2N8LKpBQkyjp2d778vXd04cqs="
//             alt="Operarios en planta"
//             className="w-full md:w-1/2 rounded-lg object-cover"
//           />
//           <div>
//             <h3 className="text-xl font-semibold text-orange-500 mb-2 font-poppins">Nuestro equipo</h3>
//             <p className="text-gray-700">
//               Más de 150 operarios capacitados garantizan el correcto funcionamiento del sistema de almacenamiento...
//             </p>
//           </div>
//         </div>

//         {/* <div className="bg-white rounded-xl shadow p-6 text-center">
//           <h3 className="text-2xl font-semibold text-orange-500 mb-3 font-poppins">Nuestra Visión</h3>
//           <p className="text-gray-700 max-w-3xl mx-auto">
//             Ser líderes en la industria automotriz ofreciendo soluciones logísticas eficientes...
//           </p>
//           <h3 className="text-2xl font-semibold text-orange-500 mt-6 mb-3 font-poppins">Nuestra Misión</h3>
//           <p className="text-gray-700 max-w-3xl mx-auto">
//             Garantizar el abastecimiento rápido y preciso de piezas...
//           </p>
//         </div> */}
//       </div>

//       {/* Footer */}
//       <footer className="bg-gradient-to-r from-[#1A1A1A] to-orange-500 text-white py-10 mt-12 font-poppins" id="footer">
//         <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Ir a...</h3>
//             <ul className="space-y-2 text-white">
//               <li className="flex items-center gap-2">
//                 <i className="fas fa-home text-orange-400"></i>
//                 <a href="/inicio" className="hover:underline">Inicio</a>
//               </li>
//             </ul>

//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-3">Contacto</h3>
//             <ul className="space-y-2 text-white">
//               <li className="flex items-center gap-2">
//                 <i className="fas fa-map-marker-alt text-orange-400"></i>
//                 Isla Verde 2152
//               </li>
//               <li className="flex items-center gap-2">
//                 <i className="fas fa-phone-alt text-orange-400"></i>
//                 +54 9 351 3374719
//               </li>
//               <li className="flex items-center gap-2">
//                 <i className="fas fa-envelope text-orange-400"></i>
//                 contacto@sistemadeposito.com
//               </li>
//             </ul>

//           </div>
//           <div>
//             <h3 className="text-lg font-semibold mb-3 mx-8">Síguenos</h3>
//             <ul className="space-y-2 text-white flex gap-6">
//               <li className="flex items-center gap-2">
//                 <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
//                   <i className="fab fa-facebook text-blue-600 text-3xl" aria-hidden="true"></i>
//                 </a>
//               </li>
//               <li className="flex items-center gap-2">
//                 <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
//                   <i className="fab fa-instagram text-pink-500 text-3xl" aria-hidden="true"></i>
//                 </a>
//               </li>
//               <li className="flex items-center gap-2">
//                 <a href="https://ar.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
//                   <i className="fab fa-linkedin text-blue-500 text-3xl" aria-hidden="true"></i>
//                 </a>
//               </li>
//             </ul>

//           </div>
//         </div>

//         <div className="text-center mt-10 text-xs border-t border-orange-400 pt-4">
//           <p>&copy; {new Date().getFullYear()} JosemaDesign - Sistema de Depósito. Todos los derechos reservados.</p>
//           <p className="mt-1">Desarrollado por JosemaDesign</p>
//         </div>
//       </footer>

//       {/* Botón para abrir chat */}
//       <div className="fixed bottom-6 right-6 z-50">
//         <button
//           onClick={() => setMostrarChat(!mostrarChat)}
//           className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
//         >
//           💬
//         </button>
//       </div>

//       {/* Ventana del chat */}
//       {mostrarChat && (
//         <div className="fixed bottom-20 right-6 w-80 bg-[#1f1f1f] text-white rounded-lg shadow-xl p-4 z-50 border border-orange-400 flex flex-col">
//           <div className="flex justify-between items-center mb-2">
//             <h3 className="text-lg font-semibold text-orange-400">Asistente Virtual</h3>
//             <button onClick={() => setMostrarChat(false)} className="text-orange-300 hover:text-red-500">✖</button>
//           </div>

//           <div
//             className="flex-grow h-60 overflow-y-auto bg-[#2b2b2b] p-2 rounded text-sm text-yellow-200 space-y-2"
//             ref={chatRef}
//           >
//             {historial.map((msg, i) => (
//               <p
//                 key={i}
//                 className={msg.from === 'user' ? 'text-right text-orange-300' : 'text-left'}
//               >
//                 {msg.text}
//               </p>
//             ))}
//           </div>

//           <textarea
//             rows={2}
//             value={mensaje}
//             onChange={(e) => setMensaje(e.target.value)}
//             onKeyDown={handleKeyDown}
//             placeholder="Escribe tu mensaje..."
//             className="mt-2 p-2 rounded bg-[#1f1f1f] text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
//           />
//           <button
//             onClick={enviarMensaje}
//             className="mt-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
//           >
//             Enviar
//           </button>
//         </div>
//       )}

//       <a
//         href="https://wa.me/5493513374719"
//         target="_blank"
//         rel="noopener noreferrer"
//         className="fixed bottom-6 left-6 z-50"
//       >
//         <img
//           src={whatsapp}
//           alt="WhatsApp"
//           className="w-14 h-14 ml-5 shadow-lg hover:scale-110 transition-transform duration-200"
//         />
//       </a>



//     </div>
//   );
// }


import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios'; // Asegúrate de tener axios instalado
import logo from '../assets/imagenes/logoJosemadesing.png';
import whatsapp from "../assets/imagenes/whatsapp.png";
import { FaSignInAlt, FaEnvelope } from "react-icons/fa";

export default function Inicio() {
  const [mostrarChat, setMostrarChat] = useState(false);
  const [mensaje, setMensaje] = useState('');
  const [historial, setHistorial] = useState([
    { from: 'bot', text: '👋 ¡Hola! ¿En qué puedo ayudarte?' }
  ]);
  const chatRef = useRef(null);

  const enviarMensaje = async () => {
    if (!mensaje.trim()) return;

    setHistorial(prev => [...prev, { from: 'user', text: mensaje }]);

    try {
      const response = await axios.post('http://localhost:3000/api/ai/ask', { question: mensaje });
      const respuesta = response.data.answer;

      setHistorial(prev => [...prev, { from: 'bot', text: respuesta }]);
    } catch (error) {
      setHistorial(prev => [...prev, { from: 'bot', text: 'Error al conectar con el servidor' }]);
    }

    setMensaje('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      enviarMensaje();
    }
  };

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [historial]);

  return (
    <div className="min-h-screen bg-orange-50 flex flex-col">
      {/* Header */}
      <header className="bg-gradient-to-r from-[#1A1A1A] to-orange-500 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img src={logo} alt="Logo" className="h-20 w-auto" />
          </div>
          <nav className="space-x-6 flex items-center">
            <a href="/login" className="flex items-center text-white hover:text-yellow-100 font-semibold space-x-2">
              <FaSignInAlt className="text-xl" />
              <span className="hidden sm:inline font-poppins">Iniciar Sesión</span>
            </a>
            <a href="#footer" className="flex items-center text-white hover:text-yellow-100 font-semibold space-x-2">
              <FaEnvelope className="text-xl" />
              <span className="hidden sm:inline font-poppins">Contacto</span>
            </a>
          </nav>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="p-6 space-y-12 flex-grow max-w-7xl mx-auto w-full">
        <section className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://media.istockphoto.com/id/2177135894/photo/the-inside-of-a-working-warehouse-dispatch-centre.jpg?s=1024x1024&w=is&k=20&c=t-QL-Ak-CIAxsyOajUoH78YdlI2KI1CDwNoweow4LMw="
            alt="Depósito de piezas"
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-2 font-poppins">Nuestros Almacenes</h3>
            <p className="text-gray-700">
              En nuestros depósitos especializados gestionamos con precisión miles de piezas automotrices...
            </p>
          </div>
        </section>

        <section className="bg-white rounded-xl shadow p-6 flex flex-col-reverse md:flex-row items-center gap-6">
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-2 font-poppins">Nuestra Flota Interna</h3>
            <p className="text-gray-700">
              Contamos con una flota moderna de vehículos especializados para operaciones dentro del depósito...
            </p>
          </div>
          <img
            src="https://images.unsplash.com/photo-1740733448722-82e16d3468bb?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Vehículos de fábrica"
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
        </section>

        <section className="bg-white rounded-xl shadow p-6 flex flex-col md:flex-row items-center gap-6">
          <img
            src="https://media.istockphoto.com/id/1477501411/photo/group-new-generation-of-engineers-in-a-metal-sheet-factory-studying-work-methods-from.jpg?s=612x612&w=0&k=20&c=IEawOMyTAWBfWbN0Dc2N8LKpBQkyjp2d778vXd04cqs="
            alt="Operarios en planta"
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
          <div>
            <h3 className="text-xl font-semibold text-orange-500 mb-2 font-poppins">Nuestro equipo</h3>
            <p className="text-gray-700">
              Más de 150 operarios capacitados garantizan el correcto funcionamiento del sistema de almacenamiento...
            </p>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-r from-[#1A1A1A] to-orange-500 text-white py-10 mt-12 font-poppins" id="footer">
        <div className="max-w-screen-xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
          <div>
            <h3 className="text-lg font-semibold mb-3">Ir a...</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <i className="fas fa-home text-orange-400"></i>
                <a href="/inicio" className="hover:underline">Inicio</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Contacto</h3>
            <ul className="space-y-2 text-white">
              <li className="flex items-center gap-2">
                <i className="fas fa-map-marker-alt text-orange-400"></i>
                Isla Verde 2152
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-phone-alt text-orange-400"></i>
                +54 9 351 3374719
              </li>
              <li className="flex items-center gap-2">
                <i className="fas fa-envelope text-orange-400"></i>
                contacto@sistemadeposito.com
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3 mx-8">Síguenos</h3>
            <ul className="space-y-2 text-white flex gap-6">
              <li className="flex items-center gap-2">
                <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <i className="fab fa-facebook text-blue-600 text-3xl" aria-hidden="true"></i>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <i className="fab fa-instagram text-pink-500 text-3xl" aria-hidden="true"></i>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <a href="https://ar.linkedin.com/" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  <i className="fab fa-linkedin text-blue-500 text-3xl" aria-hidden="true"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-10 text-xs border-t border-orange-400 pt-4">
          <p>&copy; {new Date().getFullYear()} JosemaDesign - Sistema de Depósito. Todos los derechos reservados.</p>
          <p className="mt-1">Desarrollado por JosemaDesign</p>
        </div>
      </footer>

      {/* Botón para abrir chat */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setMostrarChat(!mostrarChat)}
          className="bg-orange-500 hover:bg-orange-600 text-white p-3 rounded-full shadow-lg"
          aria-label="Abrir chat"
        >
          💬
        </button>
      </div>

      {/* Ventana del chat */}
      {mostrarChat && (
        <div className="fixed bottom-20 right-6 w-80 bg-[#1f1f1f] text-white rounded-lg shadow-xl p-4 z-50 border border-orange-400 flex flex-col">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-lg font-semibold text-orange-400">Asistente Virtual</h3>
            <button onClick={() => setMostrarChat(false)} className="text-orange-300 hover:text-red-500" aria-label="Cerrar chat">✖</button>
          </div>

          <div
            className="flex-grow h-60 overflow-y-auto bg-[#2b2b2b] p-2 rounded text-sm text-yellow-200 space-y-2"
            ref={chatRef}
          >
            {historial.map((msg, i) => (
              <p
                key={i}
                className={msg.from === 'user' ? 'text-right text-orange-300' : 'text-left'}
              >
                {msg.text}
              </p>
            ))}
          </div>

          <textarea
            rows={2}
            value={mensaje}
            onChange={(e) => setMensaje(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Escribe tu mensaje..."
            className="mt-2 p-2 rounded bg-[#1f1f1f] text-white border border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-400 resize-none"
          />
          <button
            onClick={enviarMensaje}
            className="mt-2 bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded text-white font-semibold"
          >
            Enviar
          </button>
        </div>
      )}

      {/* Botón flotante WhatsApp */}
      <a
        href="https://wa.me/5493513374719"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 left-6 z-50"
        aria-label="WhatsApp"
      >
        <img
          src={whatsapp}
          alt="WhatsApp"
          className="w-14 h-14 ml-5 shadow-lg hover:scale-110 transition-transform duration-200"
        />
      </a>
    </div>
  );
}
