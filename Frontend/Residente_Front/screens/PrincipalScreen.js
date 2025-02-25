
import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function PrincipalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber } = route.params || {}; // Recibe el número desde HomeScreen

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image source={require("../assets/menu_icon.png")} style={styles.icon} />
        </TouchableOpacity>
        <Text style={styles.title}>SCSVF</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Profile")}> 
          <Image source={require("../assets/profile_icon.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>¿Qué vas a hacer hoy?</Text>
        <Image source={require("../assets/location_user_icon.png")} style={styles.mainIcon} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateVisitStack")}> 
          <Text style={styles.buttonText}>Crear visitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("MyVisitsStack")}> 
          <Text style={styles.buttonText}>Mis visitas</Text>
        </TouchableOpacity>

        {phoneNumber && (
          <Text style={styles.phoneNumber}>Número ingresado: {phoneNumber}</Text>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F18F5A",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 24,
    height: 24,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  question: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 20,
  },
  mainIcon: {
    width: 120,
    height: 120,
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#f0f0f0",
    width: "90%",
    paddingVertical: 15,
    borderRadius: 20,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  phoneNumber: {
    marginTop: 15,
    fontSize: 14,
    color: "#333",
  },
});