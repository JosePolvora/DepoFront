import React, { useState } from 'react';
import axios from 'axios';

const preguntasFrecuentes = [
  "¿Qué significa 'Consultar Diseño'?",
  "¿Para qué sirve 'Consultar Ubicación'?",
  "¿Qué implica el 'Ingreso'?",
  "¿Qué se gestiona desde 'Stock'?",
  "¿Qué información ofrece 'Historial'?",
  "¿Qué es 'Gemini AI'?",
  "¿Para qué sirve 'Importar Planos'?",
  "¿Qué hace la función 'Importar Ubicaciones'?",
  "¿Cómo se utiliza 'Agregar Usuarios'?",
  "¿Qué permite hacer 'Editar Usuarios'?"
];

const GeminiAsk = () => {
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [source, setSource] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!question.trim()) return;
    consultarPregunta(question);
  };

  const consultarPregunta = async (pregunta) => {
    setLoading(true);
    setError('');
    setAnswer('');
    setSource('');
    setQuestion(pregunta);

    try {
      const response = await axios.post('http://localhost:3000/api/ai/ask', { question: pregunta });
      setAnswer(response.data.answer);
      setSource(response.data.source);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al conectar con el servidor');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-zinc-900 min-h-screen w-full box-border px-4 py-8 flex justify-center">
      <div className="bg-zinc-800 w-full max-w-5xl border-2 border-orange-500 p-6 sm:p-8 rounded-lg shadow-md overflow-hidden">
        <h2 className="text-2xl sm:text-3xl font-bold text-center text-orange-500 mb-6">
          Preguntas Frecuentes
        </h2>

        {/* Preguntas frecuentes en formato responsive */}
        <div className="mb-6">
          <h3 className="text-base sm:text-lg text-yellow-200 mb-2">Preguntas:</h3>
          <div className="flex flex-col sm:flex-row flex-wrap gap-2 sm:gap-3 w-full">
            {preguntasFrecuentes.map((pregunta, index) => (
              <button
                key={index}
                onClick={() => consultarPregunta(pregunta)}
                className="bg-orange-600 hover:bg-orange-700 text-black font-semibold px-4 py-2 rounded-md text-sm w-full sm:w-auto"
              >
                {pregunta}
              </button>
            ))}
          </div>
        </div>

        {/* Formulario manual */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="gemini-question" className="block text-sm font-medium mb-1 text-yellow-200">
              Tu pregunta:
            </label>
            <textarea
              id="gemini-question"
              className="w-full bg-zinc-700 text-white rounded-md border border-zinc-600 py-2 px-3 focus:outline-none focus:border-orange-500"
              rows="4"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Escribí tu pregunta acá..."
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75"
            disabled={loading}
          >
            {loading ? 'Consultando...' : 'Preguntar'}
          </button>
        </form>

        {/* Respuesta */}
        {answer && (
          <div className="mt-6 p-4 rounded-md bg-zinc-700 border border-green-600 text-green-200 shadow-sm">
            <strong className="text-yellow-200">Respuesta:</strong>
            <p className="mt-2">{answer}</p>
            {source && (
              <p className="mt-2 text-sm italic text-orange-400">
                Origen de la respuesta: {source === 'precargada' ? 'Precargada desde la base de datos' : 'Generada por Gemini'}
              </p>
            )}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="mt-6 p-4 rounded-md bg-zinc-700 border border-red-600 text-red-200 shadow-sm">
            <strong className="text-yellow-200">Error:</strong> {error}
          </div>
        )}
      </div>
    </div>
  );
};

export default GeminiAsk;
