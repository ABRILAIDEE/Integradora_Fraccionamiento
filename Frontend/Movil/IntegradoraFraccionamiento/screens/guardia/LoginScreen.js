import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { AuthContext } from "../../context/AuthContext";

const img = require("../../assets/solitude.png");

export default function LoginScreen({ navigation }) {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Bienvenido a la app de guardia</Text>

        <TextInput
          label="Usuario"
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: "orange", underlineColor: "transparent" } }}
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text.trim().toLowerCase())}
        />
        <TextInput
          label="Contraseña"
          mode="outlined"
          style={[styles.input, { marginBottom: 40 }]}
          secureTextEntry
          theme={{ colors: { primary: "orange", underlineColor: "transparent" } }}
          onChangeText={setPassword}
        />

        <Button
          mode="contained"
          buttonColor="orange"
          contentStyle={styles.button}
          onPress={() => login(username, password)}
        >
          Ingresar
        </Button>

        <Button
          mode="text"
          textColor="black"
          onPress={() => navigation.navigate("LoginEnterPhoneScreen")}
        >
          Soy residente
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F28D52",
  },
  image: {
    position: "absolute",
    top: 0,
    width: "120%",
    height: "50%",
    resizeMode: "cover",
    borderRadius: 40,
  },
  card: {
    marginTop: 180,
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 50,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 50,
  },
  input: {
    height: 40,
    width: "100%",
    marginBottom: 20,
  },
});
