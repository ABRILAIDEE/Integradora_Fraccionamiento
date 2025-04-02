import React, { useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";


export default function PrincipalScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { phoneNumber } = route.params || {}; 

  useEffect(() => {
    navigation.setOptions({ headerShown: false }); // 👈 Ocultar el header automáticamente
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.navigate("HomeStack", { screen: "Home" })}>
  <Image source={require("../assets/menu_icon.png")} style={styles.icon} />
</TouchableOpacity>

        <Text style={styles.title}>SCSVF</Text>
        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}> 
          <Image source={require("../assets/perfil_Icon.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.question}>¿Qué vas a hacer hoy?</Text>
        <Image source={require("../assets/location_user_icon.png")} style={styles.mainIcon} />

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("CreateVisitStack")}> 
          <Text style={styles.buttonText}>Crear visitas</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("VisitsScreen")}>
          <Text style={styles.buttonText}>Historial de Visitas</Text>
        </TouchableOpacity>
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
    paddingHorizontal: 15,
  },
  icon: {
    width: 30,
    height: 30,
    marginHorizontal: 2,
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
