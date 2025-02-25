import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";

const VisitasScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>¿Que vas a hacer hoy?</Text>

      <Image source={require("../assets/perfil_icon.png")} style={styles.icon} />

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateVisitScreen")}>
        <Text style={styles.buttonText}>Crear visitas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyVisitsScreen")}>
        <Text style={styles.buttonText}>Mis visitas</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ED8748",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "black",
    marginBottom: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "white",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 20,
    marginVertical: 10,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
  },
});

export default VisitasScreen;
