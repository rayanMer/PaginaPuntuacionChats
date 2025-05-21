// src/components/PaginaValoraciones.jsx
import { useEffect, useState } from 'react';
import ServicioLecturaConversacion from '../../services/ServicioLecturaConversacion';
import { Link } from 'react-router-dom';
import PanelConversacion from './PanelConversacion';
import PanelMetricas from './PanelMetricas';
import Header from "../Header";

export default function PaginaValoraciones() {
  const [conversaciones, setConversaciones] = useState([]);
  const [indiceActual, setIndiceActual] = useState(0);
  const [metricasLocales, setMetricasLocales] = useState({});

  const conversacion = conversaciones[indiceActual];
  const mensajes = conversacion?.messages || [];
  const metricas = conversacion?.metrics || {};

  console.log(metricasLocales)

  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await ServicioLecturaConversacion.obtenerConversaciones();
        setConversaciones(datos);
      } catch (error) {
        console.error('Error cargando conversaciones:', error);
      }
    };
    cargarDatos();
  }, []);

  // Cuando cambia la conversación, inicializamos las métricas locales con las del JSON
  useEffect(() => {
    setMetricasLocales(metricas || {
      metric_1: 5,
      metric_2: 5,
      metric_3: 5,
      metric_4: 5,
    });
  }, [conversacion]);

  const manejarValoracion = (key, valor) => {
    setMetricasLocales((prev) => ({
      ...prev,
      [key]: valor,
    }));
  };

  const manejarSiguiente = async () => {
    if (conversacion && Object.keys(metricasLocales).length > 0) {
      try {
        // Guardamos las métricas modificadas en el json-server
        await ServicioLecturaConversacion.guardarMetricas(conversacion.id, metricasLocales);
        // Actualizamos el estado local para reflejar guardado
        setConversaciones((prev) =>
          prev.map((c) =>
            c.id === conversacion.id ? { ...c, metrics: metricasLocales } : c
          )
        );
      } catch (error) {
        console.error('Error guardando métricas:', error);
      }
    }
    if (indiceActual < conversaciones.length - 1) {
      setIndiceActual((prev) => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-lightest-green">
      {/* Main content */}
      <div className="flex py-5 gap-15 justify-center">
        {/* Chat pane */}
        <PanelConversacion mensajes = {mensajes} />

        {/* Valoraciones */}
        <div className='flex flex-col just gap-5 justify-between
        bg-white p-10 rounder-lg shadow-lg'>
          <PanelMetricas
            metricas={metricasLocales}
            setMetricas={setMetricasLocales}
          />
            <button
              onClick={manejarSiguiente}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Siguiente
            </button>
        </div>
        </div>
      </div>
  );
}
