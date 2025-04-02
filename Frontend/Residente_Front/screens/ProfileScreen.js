import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const ProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [age, setAge] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const handleChangeImage = () => {
    console.log("Cambio de imagen");
  };

  const handleEditProfile = () => alert("Información actualizada");

  const handleLogout = () => {
    navigation.navigate("HomeStack", {
      screen: "Home",
    });
  };
  
  

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ✅ Header */}
        <View style={styles.header}>
          {/* Icono de regreso */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/circulo-de-flecha.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
          <Text style={styles.logo}>SCSVF</Text>
          {/* Icono de menú */}
          {/* Icono de menú (ahora redirige a Home) */}
<TouchableOpacity onPress={() => navigation.navigate("HomeStack", { screen: "Home" })}>
  <Image
    source={require("../assets/menu_icon.png")}
    style={styles.icon}
  />
</TouchableOpacity>

        </View>

        {/* ✅ Título */}
        <Text style={styles.title}>Tu perfil</Text>

        {/* ✅ Imagen del perfil */}
        <TouchableOpacity onPress={handleChangeImage}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../assets/perfil_Icon.png")}
              style={styles.avatar}
            />
          </View>
        </TouchableOpacity>

        {/* ✅ Formulario */}
        <View style={styles.formContainer}>
          <Text style={styles.label}>Nombre completo:</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

          <Text style={styles.label}>Correo electrónico:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />

          <Text style={styles.label}>Edad:</Text>
          <TextInput
            style={styles.input}
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Fecha de nacimiento:</Text>
          <TextInput
            style={styles.input}
            value={birthDate}
            onChangeText={setBirthDate}
          />

          <Text style={styles.label}>Dirección:</Text>
          <TextInput
            style={styles.input}
            value={address}
            onChangeText={setAddress}
          />

          <Text style={styles.label}>Teléfono:</Text>
          <TextInput
            style={styles.input}
            value={phone}
            onChangeText={setPhone}
            keyboardType="phone-pad"
          />
        </View>

        {/*  Botones */}


        <View style={styles.buttonContainer}>
        
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
  <Text style={styles.logoutText}>Cerrar sesión</Text>
</TouchableOpacity>



          <TouchableOpacity
  style={styles.editButton}
  onPress={() => navigation.navigate("EditProfileScreen")}
>
  <Text style={styles.editButtonText}>Editar información</Text>
</TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F18F5A",
    paddingHorizontal: width * 0.05,
    paddingTop: height * 0.03,
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingBottom: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%", // antes era 100%
    alignSelf: "center",
    marginBottom: 20,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: 30,
    height: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  formContainer: {
    width: "90%", // ligeramente más centrado
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#000",
  },
  input: {
    height: 45,
    backgroundColor: "#f0f0f0",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 12,
    width: "100%",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginTop: 20,
    alignSelf: "center",
  },
  logoutButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    alignItems: "center",
  },
  logoutText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 14,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default ProfileScreen;
