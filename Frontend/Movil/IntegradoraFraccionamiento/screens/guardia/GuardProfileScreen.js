import React, { useEffect, useState, useContext } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet, ActivityIndicator } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import GuardService from "../../services/GuardService"; // Importar el servicio que acabamos de crear
import { AuthContext } from '../../context/AuthContext';

export default function GuardProfileScreen({navigation}) {
  const { user, logout } = useContext(AuthContext);
  const [guard, setGuard] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGuardData = async () => {
      try {
        if (!user?.userId) {
          console.error("No se encontró el ID del guardia en la sesión");
          setError("No se pudo cargar la información del perfil");
          setLoading(false);
          return;
        }

        console.log("Obteniendo datos del guardia con ID:", user.userId);
        const response = await GuardService.getGuardById(user.userId, user.token);
        console.log("Datos del guardia recibidos:", response);
        
        setGuard(response.data); // Asume que la respuesta tiene una propiedad 'data'
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos del guardia:", err);
        setError("No se pudo cargar la información del perfil");
        setLoading(false);
      }
    };

    fetchGuardData();
  }, [user]);

  // Si está cargando, mostrar un indicador de carga
  if (loading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#5A2D0C" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  // Si hubo un error, mostrar mensaje de error
  if (error) {
    return (
      <View style={[styles.container, styles.errorContainer]}>
        <Text style={styles.errorText}>{error}</Text>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>SCSVF</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <Image source={require("../../assets/policia.png")} style={styles.profileImage} />
      <Text style={styles.subtitle}>Tu perfil</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo:</Text>
        <TextInput 
          style={styles.input} 
          value={`${guard?.nombre || ""} ${guard?.apellidos || ""}`} 
          editable={false} 
        />
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput 
          style={styles.input} 
          value={guard?.email || ""} 
          editable={false} 
        />
        <Text style={styles.label}>Edad:</Text>
        <TextInput 
          style={styles.input} 
          value={guard?.edad?.toString() || ""} 
          editable={false} 
        />
        <Text style={styles.label}>Fecha de nacimiento:</Text>
        <TextInput 
          style={styles.input} 
          value={guard?.fechaNacimiento?.toString() || ""} 
          editable={false} 
        />
        <Text style={styles.label}>Dirección:</Text>
        <TextInput 
          style={styles.input} 
          value={guard?.direccion || ""} 
          editable={false} 
        />
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput 
          style={styles.input} 
          value={guard?.telefono || ""} 
          editable={false} 
        />
      </View>
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Cerrar sesión</Text>
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
  loadingContainer: {
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#5A2D0C",
  },
  errorContainer: {
    justifyContent: 'center',
  },
  errorText: {
    fontSize: 16,
    color: "red",
    textAlign: 'center',
    marginBottom: 20,
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
    marginBottom: "2%"
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});