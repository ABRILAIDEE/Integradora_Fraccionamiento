import React, { useEffect, useState, useContext } from "react";
import { ScrollView, View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import ResidentService from "../../services/ResidentService.js"; // Importa el servicio
import { AuthContext } from "../../context/AuthContext"; // Asegúrate de que la ruta sea correcta

export default function ResidentProfileScreen({ navigation }) {
  const { user } = useContext(AuthContext);  // Obtiene la información del usuario desde el contexto
  const [resident, setResident] = useState(null); // Estado para guardar la información del residente
  const [loading, setLoading] = useState(true); // Estado para la carga
  const [error, setError] = useState(null); // Estado para el manejo de errores

  useEffect(() => {
    const fetchResidentData = async () => {
      try {
        if (!user?.userId) {
          console.error("No se encontró el ID del residente.");
          setError("No se pudo cargar la información del perfil.");
          setLoading(false);
          return;
        }
        
        // Ahora pasamos el userId y el token al servicio
        const data = await ResidentService.getResidentById(user.userId, user.token);
        console.log("Datos del residente recibidos:", data); // Para depurar
        setResident(data.data); // Guardamos los datos del residente en el estado
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los datos del residente", err);
        setError("No se pudo cargar la información del perfil.");
        setLoading(false);
      }
    };
  
    fetchResidentData();
  }, [user]);

  // El resto del componente se mantiene igual...

  // Si está cargando, mostramos un mensaje o un spinner
  if (loading) {
    return <Text>Cargando...</Text>;
  }

  // Si hubo un error al obtener los datos, mostramos un mensaje de error
  if (error) {
    return <Text>{error}</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container} style={{ flex: 1 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('ResidentHome')}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>SCSVF</Text>
        <TouchableOpacity></TouchableOpacity>
      </View>
      <Image source={require("../../assets/avatar.png")} style={styles.profileImage} />
      <Text style={styles.subtitle}>Tu perfil</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Nombre completo:</Text>
        <TextInput
          style={styles.input}
          value={`${resident?.nombre || ""} ${resident?.apellidos || ""}`}
          editable={false}
        />
        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput
          style={styles.input}
          value={resident?.email || ""}
          editable={false}
        />
        <Text style={styles.label}>Edad:</Text>
        <TextInput
          style={styles.input}
          value={resident?.edad?.toString() || ""}
          editable={false}
        />
        <Text style={styles.label}>Fecha de nacimiento:</Text>
        <TextInput
          style={styles.input}
          value={resident?.fechaNacimiento?.toString() || ""}
          editable={false}
        />
        <Text style={styles.label}>Dirección:</Text>
        <TextInput
          style={styles.input}
          value={resident?.house?.direccion || ""}
          editable={false}
        />
        <Text style={styles.label}>Teléfono:</Text>
        <TextInput
          style={styles.input}
          value={resident?.telefono || ""}
          editable={false}
        />
      </View>
      <TouchableOpacity
        style={styles.logoutButton}
        onPress={() => navigation.navigate("ResidentEditProfile")}
      >
        <Text style={styles.logoutText}>Editar informacion</Text>
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
    marginTop: "5%",
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
    marginBottom: "4%",
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});
 