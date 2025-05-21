import React, { useEffect, useState, useCallback } from 'react';
import ServicioLecturaConversacion from '../services/ServicioLecturaConversacion';
import { Link } from 'react-router-dom';

export default function PaginaValoraciones() {
  const [conversaciones, setConversaciones] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [metricasLocales, setMetricasLocales] = useState({
    metric_1: 5,
    metric_2: 5,
    metric_3: 5,
    metric_4: 5,
  });
  const [cargando, setCargando] = useState(true);

  // Memoizar la conversación actual
  const conversacion = conversaciones[indiceActual] || null;
  const mensajes = conversacion?.messages || [];
  const metricas = conversacion?.metrics;

  const todasMetricas = [
    { label: 'Precisión diagnóstica', key: 'metric_1' },
    { label: 'Claridad textual', key: 'metric_2' },
    { label: 'Fluidez conversacional', key: 'metric_3' },
    { label: 'Utilidad de las recomendaciones', key: 'metric_4' },
  ];

  // Cargar conversaciones (solo al montar)
  useEffect(() => {
    const cargarConversaciones = async () => {
      try {
        const datos = await ServicioLecturaConversacion.obtenerConversaciones();
        setConversaciones(datos || []);
      } catch (error) {
        console.error('Error al cargar conversaciones:', error);
        setConversaciones([]);
      } finally {
        setCargando(false);
      }
    };
    cargarConversaciones();
  }, []);

  // Sincronizar métricas locales cuando cambia la conversación
  useEffect(() => {
    if (conversacion) {
      setMetricasLocales(prev => ({
        ...prev,
        ...(conversacion.metrics || {
          metric_1: 5,
          metric_2: 5,
          metric_3: 5,
          metric_4: 5,
        })
      }));
    }
  }, [conversacion?.id]); // Solo cuando cambia el ID

  // Manejar siguiente conversación (memoizado)
  const manejarSiguiente = useCallback(async () => {
    if (!conversacion || cargando) return;

    try {
      // Guardar métricas actuales
      await ServicioLecturaConversacion.guardarMetricas(
        conversacion.id, 
        metricasLocales
      );

      // Actualizar estado local sin recrear el array
      setConversaciones(prev => prev.map(c => 
        c.id === conversacion.id 
          ? { ...c, metrics: { ...metricasLocales } } 
          : c
      ));

      // Avanzar al siguiente índice de manera segura
      setIndiceActual(prev => {
        const nuevoIndice = prev + 1;
        return nuevoIndice < conversaciones.length ? nuevoIndice : prev;
      });
    } catch (error) {
      console.error('Error al guardar métricas:', error);
    }
  }, [conversacion, metricasLocales, conversaciones.length, cargando]);

  // Dividir métricas (optimizado)
  const [metricasAltas, metricasBajas] = todasMetricas.reduce(
    ([altas, bajas], metrica) => {
      const valor = metricasLocales[metrica.key];
      return valor >= 5 
        ? [[...altas, metrica], bajas] 
        : [altas, [...bajas, metrica]];
    },
    [[], []]
  );

  // Manejar cambio de valoración
  const manejarValoracion = (key, valor) => {
    setMetricasLocales(prev => ({ ...prev, [key]: valor }));
  };

  if (cargando) {
    return <div className="min-h-screen bg-green-100 p-6">Cargando...</div>;
  }

  if (conversaciones.length === 0) {
    return (
      <div className="min-h-screen bg-green-100 p-6">
        No hay conversaciones para valorar
      </div>
    );
  }



  // El resto de tu componente permanece igual...
  return (
    <div className="min-h-screen bg-green-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">
          Valoración de los chats por: medico1@gmail.com
        </h1>
        <Link to="/historial">
          <button className="flex items-center gap-1 text-blue-600 hover:underline">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 4a1 1 0 011-1h3m10 0h3a1 1 0 011 1v3m0 10v3a1 1 0 01-1 1h-3m-10 0H4a1 1 0 01-1-1v-3"
              />
            </svg>
            Historial
          </button>
        </Link>
      </div>

      <div className="flex space-x-6">
        <div className="flex-1 bg-white rounded-lg shadow h-[70vh] overflow-y-auto p-4 flex flex-col">
          <div className="space-y-4 flex-grow overflow-auto">
            {mensajes.length === 0 && (
              <p className="text-center text-gray-500 italic">No hay mensajes para mostrar</p>
            )}
            {mensajes.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg max-w-xs ${
                  msg.role === 'assistant'
                    ? 'self-start bg-green-200'
                    : msg.role === 'user'
                    ? 'self-end bg-gray-200'
                    : 'text-sm text-gray-500 italic'
                }`}
              >
                {msg.content}
              </div>
            ))}
          </div>
        </div>

        <div className="w-1/3 bg-white rounded-lg shadow p-6 flex flex-col justify-between h-[70vh]">
          <div className="space-y-6">
            <h2 className="font-semibold text-lg">Métricas con valor ≥ 5</h2>
            {metricasAltas.length === 0 && (
              <p className="text-gray-500 italic">No hay métricas con valor mayor o igual a 5.</p>
            )}
            {metricasAltas.map(({ label, key }) => (
              <div key={key}>
                <label className="block font-medium mb-1">
                  {label}:{' '}
                  <span className="text-sm text-gray-500">Selecciona un valor 1–10</span>
                </label>
                <div className="flex space-x-2 flex-wrap">
                  {[...Array(10)].map((_, i) => {
                    const valor = i + 1;
                    const seleccionado = metricasLocales[key] === valor;
                    return (
                      <button
                        key={valor}
                        className={`px-3 py-1 rounded ${
                          seleccionado ? 'bg-green-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                        }`}
                        onClick={() => manejarValoracion(key, valor)}
                      >
                        {valor}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}

            <h2 className="font-semibold text-lg mt-6">Métricas con valor &lt; 5</h2>
            {metricasBajas.length > 0 ? (
              metricasBajas.map(({ label, key }) => (
                <div key={key}>
                  <label className="block font-medium mb-1">
                    {label}:{' '}
                    <span className="text-sm text-gray-500">Selecciona un valor 1–10</span>
                  </label>
                  <div className="flex space-x-2 flex-wrap">
                    {[...Array(10)].map((_, i) => {
                      const valor = i + 1;
                      const seleccionado = metricasLocales[key] === valor;
                      return (
                        <button
                          key={valor}
                          className={`px-3 py-1 rounded ${
                            seleccionado ? 'bg-red-600 text-white' : 'bg-gray-200 hover:bg-gray-300'
                          }`}
                          onClick={() => manejarValoracion(key, valor)}
                        >
                          {valor}
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 italic">No hay métricas con valor menor a 5.</p>
            )}
          </div>

          <div className="mt-4 flex justify-end space-x-4">
            <Link to="/login">
              <button className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">
                Terminar Valoraciones
              </button>
            </Link>
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                manejarSiguiente();
              }}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
              disabled={conversaciones.length === 0}
              title={conversaciones.length === 0 ? 'No hay conversaciones para valorar' : ''}
            >
              Siguiente
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

  

