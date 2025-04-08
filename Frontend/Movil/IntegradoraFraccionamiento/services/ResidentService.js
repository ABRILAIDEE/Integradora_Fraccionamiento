import axios from 'axios';

const API_URL = "http://192.168.0.190:8080"; // URL para acceso local en la red

const ResidentService = {
  // Obtener un residente por ID
  getResidentById: async (id, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/residente/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener el residente', error);
      throw error;
    }
  },

  // Obtener todos los residentes (solo admin)
  getAllResidents: async (token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/residente`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los residentes', error);
      throw error;
    }
  },

  // Crear un nuevo residente (solo admin)
  createResident: async (residentData, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/residente`, residentData, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear el residente', error);
      throw error;
    }
  },

  // Actualizar un residente (admin o el propio residente)
  updateResident: async (id, residentData, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.put(`${API_URL}/api/residente/${id}`, residentData, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el residente', error);
      throw error;
    }
  },

  // Actualizar el estado de un residente (solo admin)
  updateResidentStatus: async (id, status, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.patch(`${API_URL}/api/residente/${id}/estado`, { estado: status }, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el estado del residente', error);
      throw error;
    }
  },
};

export default ResidentService;