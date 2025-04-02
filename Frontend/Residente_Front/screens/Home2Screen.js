import React, { useEffect } from "react";
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
import { useNavigation } from "@react-navigation/native";

const Home2Screen = () => {
  const navigation = useNavigation();

  // ✅ Ocultar el header automáticamente
  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSendCode = () => {
    console.log("Navegando a PrincipalScreen...");
    navigation.navigate("PrincipalScreen", { phoneNumber: "123" });
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={require("../assets/fondo.png")} style={styles.image} />
      <View style={styles.overlay} />
      <SafeAreaView style={styles.contentContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.card}>
            <Text style={styles.title}>Iniciar Sesión</Text>
            <Text style={styles.subtitle}>Bienvenido a la App</Text>

            <TextInput 
              style={styles.input} 
              placeholder="Ingresa el código" 
              keyboardType="numeric" 
            />

            <TouchableOpacity style={styles.button} onPress={handleSendCode}>
              <Text style={styles.buttonText}>Ingresar</Text>
            </TouchableOpacity>

            <Text style={styles.guardText}>Soy guardia</Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F28D52",
  },
  image: {
    position: "absolute",
    top: 0,
    width: "120%",
    height: "70%",
    resizeMode: "stretch",
  },
  overlay: {
    position: "absolute",
    top: "50%",
    width: "100%",
    height: "50%",
    backgroundColor: "#F28D52",
  },
  contentContainer: {
    flex: 1,
    justifyContent: "center",
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
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
    width: "85%",
    alignItems: "center",
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
    textAlign: "center",
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

export default Home2Screen;
