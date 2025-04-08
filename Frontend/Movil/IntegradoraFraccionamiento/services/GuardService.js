import axios from 'axios';

const API_URL = "http://192.168.0.190:8080"; // URL para acceso local en la red

const GuardService = {
  // Obtener un empleado por ID
  getGuardById: async (id, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/empleados/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los datos del guardia', error);
      throw error;
    }
  },

  // Obtener todos los empleados (guardias)
  getAllGuards: async (token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.get(`${API_URL}/api/empleados`, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al obtener los guardias', error);
      throw error;
    }
  },

  // Crear un nuevo empleado (solo admin)
  createGuard: async (guardData, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.post(`${API_URL}/api/empleados`, guardData, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al crear el guardia', error);
      throw error;
    }
  },

  // Actualizar un empleado (solo admin)
  updateGuard: async (id, guardData, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.put(`${API_URL}/api/empleados/${id}`, guardData, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el guardia', error);
      throw error;
    }
  },

  // Actualizar el estado de un empleado (solo admin)
  updateGuardStatus: async (id, status, token) => {
    if (!token) {
      console.error('No se encontró token');
      throw new Error('Token no disponible');
    }
    
    try {
      const response = await axios.patch(`${API_URL}/api/empleados/${id}/estado`, { estado: status }, {
        headers: {
          Authorization: `Bearer ${token}`, // Agregar token en la cabecera
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error al actualizar el estado del guardia', error);
      throw error;
    }
  },
};

export default GuardService;