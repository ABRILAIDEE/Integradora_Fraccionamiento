import axios from 'axios';

const API_URL = "http://192.168.0.190:8080"; // URL para acceso local en la red

const VisitService = {
  // Obtener todas las visitas (solo admin y guardias)
  getAllVisits: async (token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/visitas`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener las visitas', error);
      throw error;
    }
  },

  // Obtener una visita por ID (admin, guardias y residentes)
  // En VisitService.js - actualiza el método getVisitById si es necesario
getVisitById: async (id, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/visitas/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Respuesta del servicio para visita por ID:", response);
      
      // Verificar y devolver los datos apropiadamente
      if (response && response.data) {
        // Si hay data.body, devolver eso
        if (response.data.body) {
          return response.data.body;
        }
        // Si no, devolver data directamente
        return response.data;
      }
      
      return null; // Si no hay datos
    } catch (error) {
      console.error('Error al obtener la visita', error);
      throw error;
    }
},

  // Registrar una nueva visita (solo residentes)
  createVisit: async (visitData, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    // Crear un FormData para enviar archivos y datos
    const formData = new FormData();
    
    // Agregar todos los campos de texto
    formData.append('fecha', visitData.fecha);
    formData.append('hora', visitData.hora);
    formData.append('numeroPersonas', visitData.numeroPersonas);
    formData.append('descripcion', visitData.descripcion);
    formData.append('tipoVisita', visitData.tipoVisita);
    formData.append('placasVehiculo', visitData.placasVehiculo);
    
    if (visitData.palabraClave) {
      formData.append('palabraClave', visitData.palabraClave);
    }
    
    formData.append('nombreVisitante', visitData.nombreVisitante);
    formData.append('residentId', visitData.residentId);
    formData.append('houseId', visitData.houseId);
    formData.append('statusId', visitData.statusId);
    
    // Agregar archivos si existen
    if (visitData.fotoPlacas) {
      formData.append('fotoPlacas', visitData.fotoPlacas);
    }
    
    if (visitData.fotoCajuela) {
      formData.append('fotoCajuela', visitData.fotoCajuela);
    }
    
    if (visitData.fotoIne) {
      formData.append('fotoIne', visitData.fotoIne);
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/visitas`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Importante para el envío de archivos
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al registrar la visita', error);
      throw error;
    }
  },

  // Actualizar el estado de una visita (admin y guardias)
  updateVisitStatus: async (id, nuevoEstado, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.patch(`${API_URL}/api/visitas/updateStatus/${id}`, nuevoEstado, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el estado de la visita', error);
      throw error;
    }
  },
  
  // Método para obtener las visitas de un residente específico usando el nuevo endpoint
  getVisitsByResidentId: async (residentId, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/visitas/resident/${residentId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      console.log("Respuesta raw de la API:", response);
      
      // Verificar la estructura y devolver los datos apropiadamente
      if (response && response.data) {
        // Si hay un campo 'body' dentro de data
        if (response.data.body) {
          return response.data.body;
        }
        // Si los datos están directamente en data
        return response.data;
      }
      
      return []; // Devolver un array vacío si no hay datos
    } catch (error) {
      console.error('Error al obtener las visitas del residente', error);
      throw error;
    }
},

// Verificar un QR de visita (para cuando se escanea en caseta)
verifyVisitQR: async (visitData, token) => {
  try {
    const response = await axios.post(
      `${API_URL}/visitas/verify`,
      visitData,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    return response.data;
  } catch (error) {
    console.error('Error en verifyVisitQR:', error);
    throw error;
  }
}
};

export default VisitService;