import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useRoute } from "@react-navigation/native";

const VisitQRScreen = () => {
  const route = useRoute();
  const { name, time } = route.params || {};  // Obtiene los parámetros pasados

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}> 
               <Image source={require("../assets/menu_icon.png")} style={styles.icon} />
                </TouchableOpacity>
        <Text style={styles.logo}>SCSVF</Text>
       <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}> 
                 <Image source={require("../assets/perfil_Icon.png")} style={styles.icon} />
               </TouchableOpacity>
      </View>

      <Text style={styles.title}>QR de la visita</Text>

      {/* Muestra los detalles de la visita */}
      <Text style={styles.details}>{`Visita de: ${name}\nHora: ${time}`}</Text>

      <View style={styles.qrContainer}>
        <Image 
          source={{ uri: "https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=EjemploQR" }}
          style={styles.qrImage}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => alert("Compartir QR")}>
        <Text style={styles.buttonText}>Compartir QR</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7945b",
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    width: 24,
    height: 24,
  
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  details: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 15,
    textAlign: "center",
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
  },
  qrImage: {
    width: 200,
    height: 200,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default VisitQRScreen;
