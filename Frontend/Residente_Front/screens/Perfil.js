import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";

const Perfil = () => {
  const [name, setName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juanperez@gmail.com");
  const [age, setAge] = useState("34");
  const [birthDate, setBirthDate] = useState("13/05/1987");
  const [address, setAddress] = useState("Av. Colima No.35 Calle Lluvia");
  const [phone, setPhone] = useState("777 123 1233");

  const handleEditProfile = () => alert("Información actualizada");
  const handleLogout = () => alert("Sesión cerrada");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => alert("Regresar")}> 
          <Text style={styles.icon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.logo}>SCSVF</Text>
        <TouchableOpacity onPress={() => alert("Opciones")}> 
          <Text style={styles.icon}>⚙️</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Tu perfil</Text>

      <View style={styles.avatarContainer}>
        <Image source={require("../assets/perfil_Icon.png")} style={styles.avatar} />
      </View>

      <View style={styles.formContainer}>
        <Text style={styles.label}>Nombre completo:</Text>
        <TextInput style={styles.input} value={name} onChangeText={setName} />

        <Text style={styles.label}>Correo electrónico:</Text>
        <TextInput style={styles.input} value={email} onChangeText={setEmail} />

        <Text style={styles.label}>Edad:</Text>
        <TextInput style={styles.input} value={age} onChangeText={setAge} keyboardType="numeric" />

        <Text style={styles.label}>Fecha de nacimiento:</Text>
        <TextInput style={styles.input} value={birthDate} onChangeText={setBirthDate} />

        <Text style={styles.label}>Dirección:</Text>
        <TextInput style={styles.input} value={address} onChangeText={setAddress} />

        <Text style={styles.label}>Teléfono:</Text>
        <TextInput style={styles.input} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
          <Text style={styles.editButtonText}>Editar información</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7945b",
    paddingHorizontal: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 10,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
  },
  icon: {
    fontSize: 22,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 12,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: 15,
  },
  avatar: {
    width: 140,
    height: 140,
    borderRadius: 70,
    borderWidth: 3,
    borderColor: "#000",
  },
  formContainer: {
    marginBottom: 15,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
  },
  input: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoutButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: "#fff",
    fontWeight: "bold",
  },
  editButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Perfil;
