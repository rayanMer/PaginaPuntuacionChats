// src/components/PaginaValoraciones.jsx
import { useEffect, useState } from 'react';
import ServicioLecturaConversacion from '../services/ServicioLecturaConversacion';
import PanelConversacion from './PaginaValoraciones/PanelConversacion';
import PanelMetricas from './PaginaValoraciones/PanelMetricas';
import { useAuth } from '../services/login/AuthProvider';

export default function PaginaValoraciones() {
  const [conversaciones, setConversaciones] = useState([]);
  const [conversacionesNoValoradas, setConversacionesNoValoradas] = useState([]);
  const [conversacionActual, setConversacionActual] = useState(null);
  const [mensajes, setMensajes] = useState([]);
  const [metricasLocales, setMetricasLocales] = useState({});
  const {email} = useAuth()

  // Cargar datos al montar el componente
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await ServicioLecturaConversacion.obtenerConversacionesTest();
        const todasConversaciones = datos.data;
        setConversaciones(todasConversaciones);

        const noValoradas = todasConversaciones.filter(conv => conv.metrics === null);
        setConversacionesNoValoradas(noValoradas);

        if (noValoradas.length > 0) {
          const aleatoria = seleccionarConversacionAleatoria(noValoradas);
          setConversacionActual(aleatoria);
          setMensajes(aleatoria.messages);
          setMetricasLocales({});
        }
      } catch (error) {
        console.error('Error cargando conversaciones:', error);
      }
    };

    cargarDatos();
  }, []);

  // Función para seleccionar una conversación no valorada aleatoriamente
  const seleccionarConversacionAleatoria = (lista) => {
    const indice = Math.floor(Math.random() * lista.length);
    return lista[indice];
  };

  // Validación: ¿todas las métricas están completas?
  const estaValoradaCompletamente = () => {
    return (
      metricasLocales.metric_1 != null &&
      metricasLocales.metric_2 != null &&
      metricasLocales.metric_3 != null &&
      metricasLocales.metric_4 != null
    );
  };

  const manejarSiguiente = async () => {
    if (!estaValoradaCompletamente()) {
      alert('Debes completar todas las métricas antes de continuar.');
      return;
    }

    try {
      const nuevasMetricas = {
        metric_1: metricasLocales.metric_1,
        metric_2: metricasLocales.metric_2,
        metric_3: metricasLocales.metric_3,
        metric_4: metricasLocales.metric_4
      };
      console.log(conversacionActual.id)
      await ServicioLecturaConversacion.guardarValoracion(conversacionActual.id, nuevasMetricas,email);

      const nuevasNoValoradas = conversacionesNoValoradas.filter(
        conv => conv.id !== conversacionActual.id
      );
      setConversacionesNoValoradas(nuevasNoValoradas);

      if (nuevasNoValoradas.length === 0) {
        alert('¡Has valorado todas las conversaciones!');
        setConversacionActual(null);
        setMensajes([]);
        setMetricasLocales({});
        return;
      }

      const nueva = seleccionarConversacionAleatoria(nuevasNoValoradas);
      setConversacionActual(nueva);
      setMensajes(nueva.messages);
      setMetricasLocales({});
    } catch (error) {
      console.error('Error guardando valoración:', error);
    }
  };

  return (
    <div className="min-h-screen bg-lightest-green">
      <div className="flex py-5 gap-15 justify-center">
        {/* Panel de conversación */}
        <PanelConversacion mensajes={mensajes} />

        {/* Panel de métricas */}
        <div className="flex flex-col gap-5 justify-between bg-white p-10 rounded-lg shadow-lg">
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
