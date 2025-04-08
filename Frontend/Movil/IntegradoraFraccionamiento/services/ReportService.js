import axios from 'axios';

const API_URL = "http://192.168.0.190:8080"; // URL para acceso local en la red

const ReportService = {
  // Obtener todos los informes
  getAllReports: async (token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/informes`, {
        headers: {
          Authorization: `${token}`, // Usar el token proporcionado
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los informes', error);
      throw error;
    }
  },

  // Obtener un informe por ID
  getReportById: async (id, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/informes/${id}`, {
        headers: {
          Authorization: `${token}`, // Usar el token proporcionado
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el informe', error);
      throw error;
    }
  },

  // Crear un nuevo informe (solo para guardias)
  createReport: async (reportData, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    // Crear un FormData para enviar información multipart (incluye archivos)
    const formData = new FormData();
    
    // Agregar campos requeridos
    formData.append('visitId', reportData.visitId);
    formData.append('nombreVisitante', reportData.nombreVisitante);
    formData.append('tipoVisita', reportData.tipoVisita);
    formData.append('numeroCasa', reportData.numeroCasa);
    formData.append('numeroPersonas', reportData.numeroPersonas);
    
    // Agregar campos opcionales si existen
    if (reportData.palabraClave) {
      formData.append('palabraClave', reportData.palabraClave);
    }
    
    if (reportData.observaciones) {
      formData.append('observaciones', reportData.observaciones);
    }
    
    // Agregar archivos si existen
    if (reportData.fotoPlacas) {
      formData.append('fotoPlacas', reportData.fotoPlacas);
    }
    
    if (reportData.fotoCajuela) {
      formData.append('fotoCajuela', reportData.fotoCajuela);
    }
    
    if (reportData.fotoIne) {
      formData.append('fotoIne', reportData.fotoIne);
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/informes`, formData, {
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'multipart/form-data', // Importante para enviar archivos
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear el informe', error);
      throw error;
    }
  }
};

export default ReportService;