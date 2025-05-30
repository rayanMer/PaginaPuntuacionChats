import http from './axios/http-axios';

const ServicioLecturaConversacion = {
  async obtenerConversaciones() {
    try {
      // Obtener todas las conversaciones
      const respuesta =  http.get('/conversations');
      return respuesta.data;
    } catch (error) {
      console.error('Error al cargar las conversaciones:', error);
      throw error;
    }
  },

  async getPorId(id) {
    try {
      // Obtener conversación por id
      const respuesta =  http.get(`/conversations/${id}`);
      return respuesta.data;
    } catch (error) {
      console.error('Error al buscar la conversación por ID:', error);
      return null;
    }
  }
,

  obtenerValoracionesPorUsuario(user) {
    return http.get(`/valoraciones?doctorEmail=${user}`)
  },

  obtenerValoracionesPorId(id) {
    return http.get(`/valoraciones/${id}`)
  },
  
  obtenerConversacionesTest() {
    return http.get('/conversations')
  },
    guardarValoracion(id,nuevasMetricas,email) {
        return http.patch(`/conversations/${id}`, { metrics: nuevasMetricas,doctorEmail:email })
    },
      
  getConversacionPorId(id) {
    return http.get(`/conversations?id=${id}`)
  },
};

export default ServicioLecturaConversacion;
