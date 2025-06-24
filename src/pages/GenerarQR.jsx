import { useParams } from 'react-router-dom';
import { QRCodeCanvas } from 'qrcode.react';
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GenerarQR() {
    const { plano } = useParams();
    const [numeroPlano, setNumeroPlano] = useState('');
    const [denominacion, setDenominacion] = useState('');
    const [loading, setLoading] = useState(true);
    const [qrSize, setQrSize] = useState(256);

    useEffect(() => {
        if (!plano) {
            setNumeroPlano('');
            setDenominacion('');
            setLoading(false);
            return;
        }

        const fetchPlano = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/planos/qr/${plano}`);
                if (
                    response.data.ok &&
                    response.data.body &&
                    typeof response.data.body === 'object' &&
                    response.data.body.plano
                ) {
                    setNumeroPlano(response.data.body.plano);
                    setDenominacion(response.data.body.denominacion || '');
                } else {
                    setNumeroPlano('No especificado');
                    setDenominacion('');
                }
            } catch (error) {
                console.error('Error al cargar plano:', error);
                setNumeroPlano('Error al cargar');
                setDenominacion('');
            } finally {
                setLoading(false);
            }
        };

        fetchPlano();
    }, [plano]);

    // Ajustar tamaño QR según ancho de pantalla
    useEffect(() => {
        function handleResize() {
            if (window.innerWidth < 400) {
                setQrSize(180);
            } else if (window.innerWidth < 640) {
                setQrSize(220);
            } else {
                setQrSize(256);
            }
        }

        handleResize(); // tamaño inicial
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const qrValue = JSON.stringify({ numeroPlano, denominacion });

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-zinc-900 text-white">
                <p>Cargando...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-zinc-900 text-white p-4">
            <h1 className="text-xl sm:text-2xl font-bold text-orange-400 mb-4 sm:mb-6 text-center px-2">
                Código QR para el plano número: {numeroPlano}
            </h1>
            <h2 className="text-sm sm:text-lg mb-4 sm:mb-6 text-gray-300 text-center px-2">
                Denominación: {denominacion}
            </h2>

            <div className="bg-zinc-800 p-4 sm:p-6 rounded-lg shadow-lg border-2 border-orange-500 flex flex-col items-center">
                <QRCodeCanvas
                    value={qrValue}
                    size={qrSize}
                    bgColor="#ffffff"
                    fgColor="#000000"
                    level="H"
                    includeMargin={true}
                />
                <p className="text-center mt-3 text-xs sm:text-sm text-gray-400 max-w-xs whitespace-pre-wrap px-2">
                    Número de Plano: {numeroPlano}
                    {"\n"}
                    Denominación: {denominacion}
                </p>
            </div>
        </div>
    );
}
