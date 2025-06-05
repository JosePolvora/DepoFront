import React, { useState } from 'react';
import axios from 'axios';


function ExcelUploadPage() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadResult, setUploadResult] = useState(null);
    const [uploadError, setUploadError] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus(''); // Limpiar estado al seleccionar un nuevo archivo
        setUploadResult(null);
        setUploadError(null);
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setUploadStatus('Por favor, selecciona un archivo.');
            return;
        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        try {
            setUploadStatus('Subiendo...');
            setUploadResult(null); // Limpiar resultados y errores anteriores
            setUploadError(null);

            const response = await axios.post('http://localhost:3000/api/upload-excel', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setUploadStatus('Archivo subido exitosamente.');
            setUploadResult(response.data);
            setUploadError(null); // Clear any previous error
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            setUploadStatus('Error al subir el archivo.');
            setUploadError(error.response ? error.response.data : error.message);
            setUploadResult(null); // Clear any previous result
        }
    };

    return (
        <div className="bg-zinc-900 min-h-screen flex justify-center items-center p-6">
            <div className="bg-zinc-800 rounded-lg border-2 border-orange-500 p-8 shadow-md w-full max-w-3xl">
                <h1 className="text-2xl font-bold text-center text-orange-500 mb-6">Importar Planos</h1>

                <input
                    type="file"
                    accept=".xlsx, .xls"
                    onChange={handleFileChange}
                    className="block w-full text-sm text-white /* Color de texto para 'No file chosen' */
                       file:mr-4 file:py-2 file:px-4
                       file:rounded-md file:border-0
                       file:text-sm file:font-semibold
                       file:bg-zinc-700 file:text-yellow-200 file:border- file:border-zinc-600
                       hover:file:bg-zinc-600
                       mb-6 /* Aumentado mb para separación */
                       cursor-pointer"
                />

                <button
                    onClick={handleFileUpload}
                    className="w-full bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 text-black font-semibold py-2 px-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-orange-400 focus:ring-opacity-75 mb-6"
                >
                    {uploadStatus === 'Subiendo...' ? 'Subiendo...' : 'Subir Archivo'}
                </button>

                {uploadStatus && uploadStatus !== 'Subiendo...' && !uploadError && (
                    <p className="mb-4 p-3 rounded-md text-green-200 bg-green-900/50 border border-green-700">
                        {uploadStatus}
                    </p>
                )}

                {uploadError && (
                    <div className="mb-6 p-4 bg-zinc-700 border border-red-600 rounded-md text-red-200 shadow-sm">
                        <h2 className="font-bold mb-2 text-yellow-200">Error al subir:</h2>
                        <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(uploadError, null, 2)}</pre>
                    </div>
                )}

                {uploadResult && (
                    <div className="mt-8 overflow-x-auto"> {/* Ajustado mt */}
                        <h2 className="text-lg font-bold mb-4 text-yellow-200">Resultado de la subida:</h2>
                        <table className="min-w-full bg-zinc-900 shadow-inner rounded-lg overflow-hidden border border-zinc-700">
                            <thead className="bg-zinc-700">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-yellow-200">Plano</th>
                                    <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wider text-yellow-200">Estado</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-zinc-700">
                                {uploadResult.result.map((item, index) => (
                                    <tr
                                        key={index}
                                        className={index % 2 === 0 ? 'bg-zinc-900 hover:bg-zinc-700' : 'bg-zinc-800 hover:bg-zinc-700'}
                                    >
                                        <td className="py-2 px-6 whitespace-nowrap text-sm text-white">{item.plano}</td>
                                        <td className="py-2 px-6 whitespace-nowrap text-sm text-white">{item.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ExcelUploadPage;