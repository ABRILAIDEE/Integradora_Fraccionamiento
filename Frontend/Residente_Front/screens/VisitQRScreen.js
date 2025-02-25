import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const VisitQRScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Regresar")}> 
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>SCSVF</Text>
        <TouchableOpacity onPress={() => alert("Opciones")}> 
          <Text style={styles.icon}>☺️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>QR de la visita</Text>

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
    fontSize: 22,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
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