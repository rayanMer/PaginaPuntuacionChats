import axios from "axios";
import http from './axios/http-axios';

const ServicioLecturaConversacion = {
  async obtenerConversaciones() {
    try {
      // Obtener todas las conversaciones
      const respuesta = await axios.get('http://localhost:3000/conversations');
      return respuesta.data;
    } catch (error) {
      console.error('Error al cargar las conversaciones:', error);
      throw error;
    }
  },

  async getPorId(id) {
    try {
      // Obtener conversación por id
      const respuesta = await axios.get(`http://localhost:3000/conversations/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error('Error al buscar la conversación por ID:', error);
      return null;
    }
  },

  async guardarMetricas(id, nuevasMetricas) {
  try {
const response = await axios.patch(`http://localhost:3000/conversations/${String(id)}`, {
  metrics: nuevasMetricas
});
    return response.data;
  } catch (error) {
    console.error('Error al guardar métricas:', error);
    throw error;
  }
}
,

  obtenerValoracionesPorUsuario(user) {
    return http.get(`/valoraciones?doctorEmail=${user}`)
  },

  obtenerValoracionesPorId(id) {
    return http.get(`/valoraciones/${id}`)
  }
};

export default ServicioLecturaConversacion;
