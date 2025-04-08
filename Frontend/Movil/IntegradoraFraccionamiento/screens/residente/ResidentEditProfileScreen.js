import React, { useEffect, useState, useContext } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ResidentService from "../../services/ResidentService.js";
import { AuthContext } from "../../context/AuthContext";

export default function ResidentEditProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estado para los campos editables
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    email: '',
    edad: '',
    fechaNacimiento: '',
    telefono: '',
    direccion: ''
  });
  
  // Datos no editables (para referencia)
  const [residentData, setResidentData] = useState(null);

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        if (!user?.userId) {
          console.error("No se encontró el ID del residente.");
          setError("No se pudo cargar la información del perfil.");
          setLoading(false);
          return;
        }
        
        const data = await ResidentService.getResidentById(user.userId, user.token);
        console.log("Datos del residente recibidos:", data);
        
        setResidentData(data.data);
        
        // Inicializar el formulario con los datos existentes
        setFormData({
          nombre: data.data.nombre || '',
          apellidos: data.data.apellidos || '',
          email: data.data.email || '',
          edad: data.data.edad ? data.data.edad.toString() : '',
          fechaNacimiento: data.data.fechaNacimiento || '',
          telefono: data.data.telefono || '',
          direccion: data.data.house?.direccion || ''
        });
        
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos del residente", err);
        setError("No se pudo cargar la información del perfil.");
        setLoading(false);
      }
    };
  
    fetchResidentData();
  }, [user]);
  
  // Manejar cambios en los campos del formulario
  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };
  
  // Enviar datos actualizados
  const handleSubmit = async () => {
    try {
      setLoading(true);
      
      // Preparar los datos para enviar al servidor - incluir todos los campos necesarios
      const updatedData = {
        nombre: formData.nombre,
        apellidos: formData.apellidos,
        email: formData.email,
        telefono: formData.telefono,
        edad: parseInt(formData.edad) || residentData.edad, // Conservar la edad original si no hay cambios
        fechaNacimiento: formData.fechaNacimiento || residentData.fechaNacimiento,
        // Incluir otros campos necesarios que podrían ser requeridos por el backend
      };
      
      console.log("Datos a enviar:", updatedData);
      
      // Llamada al servicio para actualizar los datos
      const response = await ResidentService.updateResident(
        user.userId, 
        updatedData, 
        user.token
      );
      
      console.log("Respuesta de actualización:", response);
      setLoading(false);
      
      // Mostrar mensaje de éxito
      Alert.alert(
        "Perfil actualizado",
        "Tu información ha sido actualizada exitosamente",
        [{ text: "OK", onPress: () => navigation.navigate('ResidentProfile') }]
      );
    } catch (err) {
      console.error("Error al actualizar el perfil", err);
      setLoading(false);
      Alert.alert(
        "Error",
        "No se pudo actualizar la información del perfil. Inténtalo de nuevo más tarde."
      );
    }
  };

  // Si está cargando, mostramos un mensaje o un spinner
  if (loading) {
    return <Text style={styles.loadingText}>Cargando...</Text>;
  }

  // Si hubo un error al obtener los datos, mostramos un mensaje de error
  if (error) {
    return <Text style={styles.errorText}>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ResidentProfile')}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>SCSVF</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <Image source={require("../../assets/avatar.png")} style={styles.profileImage} />
      <Text style={styles.subtitle}>Edita tu perfil</Text>
      
      <View style={styles.form}>
        <Text style={styles.label}>Nombre:</Text>
        <TextInput
          style={styles.input}
          value={formData.nombre}
          onChangeText={(value) => handleInputChange('nombre', value)}
        />
        
        <Text style={styles.label}>Apellidos:</Text>
        <TextInput
          style={styles.input}
          value={formData.apellidos}
          onChangeText={(value) => handleInputChange('apellidos', value)}
        />
        
        <Text style={styles.label}>Correo electrónico: (No se puede editar)</Text>
        <TextInput
          style={styles.input}
          value={formData.email}
          onChangeText={(value) => handleInputChange('email', value)}
          editable={false} // Generalmente el email no se puede cambiar
        />
        
        <Text style={styles.label}>Edad: (No se puede editar) </Text>
        <TextInput
          style={styles.input}
          value={formData.edad}
          onChangeText={(value) => handleInputChange('edad', value)}
          keyboardType="numeric"
          editable={false} // Asumiendo que la edad se calcula desde la fecha de nacimiento
        />
        
        <Text style={styles.label}>Fecha de nacimiento: (No se puede editar)</Text>
        <TextInput
          style={styles.input}
          value={formData.fechaNacimiento}
          onChangeText={(value) => handleInputChange('fechaNacimiento', value)}
          editable={false} // Generalmente no se cambia
        />
        
        {/* <Text style={styles.label}>Dirección: (No se puede editar)</Text>
        <TextInput
          style={styles.input}
          value={formData.direccion}
          onChangeText={(value) => handleInputChange('direccion', value)}
          editable={false} // Asumiendo que la dirección se gestiona en otro lugar
        /> */}
        
        <Text style={styles.label}>Teléfono: (No se puede editar)</Text>
        <TextInput
          style={styles.input}
          value={formData.telefono}
          onChangeText={(value) => handleInputChange('telefono', value)}
          keyboardType="phone-pad"
          editable={false} // Asumiendo que la dirección se gestiona en otro lugar
        />
      </View>
      
      <TouchableOpacity 
        style={styles.logoutButton}
        onPress={handleSubmit}
        disabled={loading}
      >
        <Text style={styles.logoutText}>
          {loading ? "Guardando..." : "Guardar cambios"}
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F28D52",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    marginTop: '5%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
  },
  profileImage: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  form: {
    width: "90%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  logoutButton: {
    backgroundColor: "#5A2D0C",
    padding: 15,
    borderRadius: 5,
    marginTop: 10,
    width: "90%",
    alignItems: "center",
    marginBottom: "4%"
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingText: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 18,
    textAlign: 'center',
    marginTop: 50,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 50,
  }
});