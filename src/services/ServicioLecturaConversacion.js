import axios from "axios";

const ServicioLecturaConversacion = {
  async obtenerConversaciones() {
    try {
const respuesta = await axios.get('/data/conversacion.json');
      if (respuesta?.data?.conversations) {
        return respuesta.data.conversations;
      } else {
        console.warn('Formato de JSON inesperado:', respuesta.data);
        return [];
      }
    } catch (error) {
      console.error('Error al cargar las conversaciones:', error);
      throw error;
    }
  }

  
};

export default ServicioLecturaConversacion;
