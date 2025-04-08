import { createContext, useState, useEffect } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Define tu URL base de la API
const API_URL = "http://192.168.0.190:8080"; // URL para acceso local en la red

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Verificar si hay un token guardado al iniciar la app
  useEffect(() => {
    checkToken();
  }, []);

  const checkToken = async () => {
    setLoading(true);
    try {
      const userJson = await AsyncStorage.getItem('user');
      if (userJson) {
        const userData = JSON.parse(userJson);
        console.log("Token recuperado del almacenamiento:", userData);
        setUser(userData); // Actualizamos el estado solo después de obtener el token
      } else {
        console.log("No se encontró token en AsyncStorage");
      }
    } catch (err) {
      console.error("Error al verificar token:", err);
    } finally {
      setLoading(false); // Siempre cambiar a false después de que se haya intentado
    }
  };

  // Login para guardias (email y password)
  // Login para guardias (email y password)
const login = async (email, password) => {
  setLoading(true);
  setError(null);
  
  try {
    console.log("Intentando login de guardia con:", { email, password });
    
    const response = await axios.post(`${API_URL}/auth`, {
      email: email.toLowerCase().trim(),
      password
    });
    
    console.log("Respuesta completa del servidor:", response.data);
    
    if (response.data.status === 200 || response.data.status === "OK" || response.data.code === 200) {
      // El token está en response.data.data, no en response.data.token
      const token = response.data.data;
      
      // Extraer el ID del token JWT
      let userId;
      try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        userId = payload.id; // Asume que el id está en el payload como 'id'
        console.log("ID extraído del token:", userId);
      } catch (jwtErr) {
        console.error("Error al extraer ID del token:", jwtErr);
        userId = null;
      }
      
      // También podrías obtener el rol directamente del token
      let role;
      try {
        const base64Payload = token.split('.')[1];
        const payload = JSON.parse(atob(base64Payload));
        role = payload.role; // Asume que el rol está en el payload como 'role'
        console.log("Rol extraído del token:", role);
      } catch (jwtErr) {
        console.error("Error al extraer role del token:", jwtErr);
        role = "ROLE_GUARD"; // Valor por defecto
      }
      
      const userData = {
        token,
        role: role || "ROLE_GUARD",
        userId,
        // Opcionalmente puedes extraer más datos del token si los necesitas
      };
      
      console.log("Login exitoso como guardia:", userData);
      
      // Guardamos en AsyncStorage con el ID
      await AsyncStorage.setItem('user', JSON.stringify(userData));
      console.log("Usuario guardado en AsyncStorage:", userData);
      
      // Actualizamos el estado
      setUser(userData);
      setLoading(false);
      return true;
    } else {
      console.log("Error en respuesta:", response.data);
      setError(response.data.message || "Error en credenciales");
      setLoading(false);
      return false;
    }
  } catch (err) {
    console.error("Error completo en login:", err);
    setError(err.response?.data?.message || "Error al iniciar sesión");
    setLoading(false);
    return false;
  }
};

  // Enviar código OTP para residentes
  const sendOtp = async (telefono) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Enviando solicitud de OTP para:", telefono);
      
      const response = await axios.post(`${API_URL}/auth/send-code`, {
        telefono
      });
      
      console.log("Respuesta de envío de OTP:", response.data);
      
      setLoading(false);
      
      if (response.data.status === 200 || response.data.status === "OK" || response.data.code === 200) {
        console.log("Código OTP enviado con éxito");
        return true;
      } else {
        console.log("Error en envío de OTP:", response.data);
        setError(response.data.message || "Error al enviar código");
        return false;
      }
    } catch (err) {
      console.error("Error completo al enviar OTP:", err);
      setError(err.response?.data?.message || "Error al enviar el código");
      setLoading(false);
      return false;
    }
  };

  // Verificar código OTP
  const verifyOtp = async (telefono, codigo) => {
    setLoading(true);
    setError(null);
    
    try {
      console.log("Verificando OTP:", { telefono, codigo });
      
      const response = await axios.post(`${API_URL}/auth/verify-code`, {
        telefono,
        codigo
      });
      
      console.log("Respuesta completa de verificación OTP:", response.data);
      
      if (response.data.status === 200 || response.data.status === "OK" || response.data.code === 200) {
        // Aquí está el cambio - el token está en response.data.data
        const token = response.data.data;
        
        // El ID necesita ser extraído del JWT o del endpoint
        // Si no tienes el ID directamente, puedes intentar decodificar el JWT
        // o hacer una petición adicional al backend
        
        let userId;
        // Ejemplo de extracción del ID desde el JWT (básico)
        try {
          // Separamos el JWT y tomamos la parte del payload (segunda parte)
          const base64Payload = token.split('.')[1];
          // Decodificamos y parseamos como JSON
          const payload = JSON.parse(atob(base64Payload));
          userId = payload.id; // Asume que el id está en el payload del JWT
          console.log("ID extraído del token:", userId);
        } catch (jwtErr) {
          console.error("Error al extraer ID del token:", jwtErr);
          userId = null; // O algún valor por defecto
        }
  
        const userData = {
          token,
          role: "ROLE_RESIDENT",
          userId,
        };
        
        console.log("Verificación OTP exitosa, datos de usuario:", userData);
        
        await AsyncStorage.setItem('user', JSON.stringify(userData));
        console.log("Usuario guardado en AsyncStorage:", userData);
        
        setUser(userData);
        setLoading(false);
        return true;
      } else {
        console.log("Error en verificación de OTP:", response.data);
        setError(response.data.message || "Código inválido");
        setLoading(false);
        return false;
      }
    } catch (err) {
      console.error("Error completo al verificar código:", err);
      setError(err.response?.data?.message || "Error al verificar el código");
      setLoading(false);
      return false;
    }
  };

  // Cerrar sesión
  const logout = async () => {
    try {
      setLoading(true);
      await AsyncStorage.removeItem('user');
      setUser(null);
      console.log("Sesión cerrada");
      setLoading(false);
    } catch (err) {
      console.error("Error al cerrar sesión:", err);
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout, sendOtp, verifyOtp }} >
      {children}
    </AuthContext.Provider>
  );
};
