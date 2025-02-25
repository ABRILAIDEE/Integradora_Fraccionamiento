import React from "react";
import { 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView, 
  ImageBackground, 
  TextInput, 
  TouchableOpacity, 
  View 
} from "react-native";

const HomeScreen = ({ navigation }) => {
  const handleSendCode = () => {
    navigation.navigate("Home2Screen", { phoneNumber: "123" });
  };

  return (
    <ImageBackground source={require("../assets/fondo.png")} style={styles.background}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Bienvenido a la App</Text>

            <TextInput 
              style={styles.input} 
              placeholder="Ingresa tu número" 
              keyboardType="numeric" 
            />

            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>mandar código</Text>
            </TouchableOpacity>

            <Text style={styles.guardText}>Soy guardia</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 20,
    width: "85%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    borderBottomWidth: 1,
    borderBottomColor: "black",
    paddingVertical: 10,
    marginBottom: 20,
    fontSize: 16,
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
    color: "gray",
    fontSize: 14,
  },
});

export default HomeScreen;