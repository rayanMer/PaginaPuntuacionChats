import axios from "axios";

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
      // Primero obtener la conversación completa
      const conversacion = await this.getPorId(id);
      if (!conversacion) throw new Error('Conversación no encontrada');

      // Actualizar solo el campo metrics
      const conversacionActualizada = { ...conversacion, metrics: nuevasMetricas };

      // Guardar con PUT (reemplaza el objeto completo en json-server)
      const response = await axios.put(`http://localhost:3000/conversations/${id}`, conversacionActualizada);
      return response.data;
    } catch (error) {
      console.error('Error al guardar métricas:', error);
      throw error;
    }
  }
};

export default ServicioLecturaConversacion;
