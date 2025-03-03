import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TextInput, 
  TouchableOpacity 
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const handleSendCode = () => {
    console.log("Intentando navegar a Home2Screen");
    navigation.navigate("Home2");
  };

  return (
    <View style={styles.container}>
      <Image source={require("../assets/fondo.png")} style={styles.image} />
      <View style={styles.card}>
        <Text style={styles.title}>Iniciar Sesión</Text>
        <Text style={styles.subtitle}>Bienvenido a la App</Text>

        <TextInput 
          style={styles.input} 
          placeholder="Ingresa tu número" 
          keyboardType="numeric" 
        />

        <TouchableOpacity style={styles.button} onPress={handleSendCode}>
          <Text style={styles.buttonText}>Mandar Código</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={styles.guardText}>Soy guardia</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F28D52",
    padding: 20,
  },
  image: {
    position: "absolute",
    top: 0,
    width: "120%",
    height: "50%",
    resizeMode: "cover",
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
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 50,
    fontWeight: "500",
    textAlign: "center",
  },
  input: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#F18F5A",
    paddingVertical: 15,
    borderRadius: 25,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  guardText: {
    marginTop: 15,
    color: "black",
    fontSize: 14,
  },
});

export default HomeScreen;
