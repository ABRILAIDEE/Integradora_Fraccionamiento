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
import CustomAppBar from "../components/CustomAppBar";

const EditProfileScreen = ({ navigation }) => {
  const [name, setName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juanperez@gmail.com");
  const [age, setAge] = useState("34");
  const [birthDate, setBirthDate] = useState("13/05/1987");
  const [address, setAddress] = useState("Av. Colima No.35 Calle Lluvia");
  const [phone, setPhone] = useState("777 123 1233");

  return (
    <SafeAreaView style={styles.container}>
      <CustomAppBar navigation={navigation} title="Editar Perfil" />

      <Text style={styles.title}>Edita tu perfil</Text>

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

      <TouchableOpacity style={styles.editButton} onPress={() => alert("Perfil actualizado")}> 
        <Text style={styles.editButtonText}>Editar perfil</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7945b",
    paddingHorizontal: 20,
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
    width: 120,
    height: 120,
    borderRadius: 60,
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
    backgroundColor: "#fff",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  editButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  editButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default EditProfileScreen;
