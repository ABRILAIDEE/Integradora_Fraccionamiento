import React, { useEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";

export default function LoadingScreen({ navigation, route }) {
  useEffect(() => {
    const { redirectTo } = route.params || { redirectTo: "Main" };

    const timer = setTimeout(() => {
      navigation.replace(redirectTo);
    }, 2000); // Puedes ajustar la duración si lo necesitas

    return () => clearTimeout(timer);
  }, [navigation, route.params]);

  return (
    <View style={styles.container}>
      <Image source={require("../assets/perfil_Icon.png")} style={styles.icon} />
      <Text style={styles.title}>SCSVF</Text>
      <Text style={styles.subtitle}>Ingresando ...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ec865a",
  },
  icon: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 40,
  },
  subtitle: {
    fontSize: 16,
  },
});
