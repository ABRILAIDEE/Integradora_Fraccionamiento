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
  Modal,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

const EditProfileScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [name, setName] = useState("Juan Pérez");
  const [email, setEmail] = useState("juanperez@gmail.com");
  const [age, setAge] = useState("34");
  const [birthDate, setBirthDate] = useState("13/05/1987");
  const [address, setAddress] = useState("Av. Colima No.35 Calle Lluvia");
  const [phone, setPhone] = useState("777 123 1233");

  // ✅ Estado para controlar el modal

  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
const [successModalVisible, setSuccessModalVisible] = useState(false);


  const handleSave = () => {
    setConfirmModalVisible(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* ✅ Header con iconos */}
        <View style={styles.header}>
          {/* Icono de regreso */}
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/circulo-de-flecha.png")}
              style={styles.icon}
            />
          </TouchableOpacity>

          <Text style={styles.logo}>SCSVF</Text>

          {/* Icono de perfil */}
          <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")}>
            <Image
              source={require("../assets/perfil_Icon.png")}
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>

        {/* ✅ Título */}
        <Text style={styles.title}>Editar Perfil</Text>

        {/* ✅ Imagen de perfil */}
        <View style={styles.avatarContainer}>
          <Image
            source={require("../assets/perfil_Icon.png")}
            style={styles.avatar}
          />
        </View>

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

        {/* ✅ Botón para guardar */}
        <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
          <Text style={styles.saveButtonText}>Guardar Cambios</Text>
        </TouchableOpacity>
      </ScrollView>

      {/*  Modal para la alerta */}

      {/* Modal de Confirmación */}
<Modal
  transparent
  animationType="fade"
  visible={confirmModalVisible}
  onRequestClose={() => setConfirmModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.alertBox}>
      <Text style={styles.alertTitle}>Confirmar</Text>
      <Text style={styles.alertMessage}>¿Deseas guardar los cambios?</Text>
      <View style={{ flexDirection: "row", gap: 10 }}>
        <TouchableOpacity
          style={styles.alertButton}
          onPress={() => setConfirmModalVisible(false)}
        >
          <Text style={styles.alertButtonText}>Cancelar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.alertButton}
          onPress={() => {
            setConfirmModalVisible(false);
            setSuccessModalVisible(true);
          }}
        >
          <Text style={styles.alertButtonText}>Aplicar</Text>
        </TouchableOpacity>
      </View>
    </View>
  </View>
</Modal>

{/* Modal de Éxito */}
{/* Modal de Éxito */}
<Modal
  transparent
  animationType="fade"
  visible={successModalVisible}
  onRequestClose={() => setSuccessModalVisible(false)}
>
  <View style={styles.modalContainer}>
    <View style={styles.alertBox}>
      <Text style={styles.alertTitle}>¡Éxito!</Text>
      <Text style={styles.alertMessage}>Tu perfil se actualizó correctamente.</Text>
      <TouchableOpacity
        style={styles.alertButton}
        onPress={() => {
          setSuccessModalVisible(false);
          navigation.navigate("ProfileScreen"); // 🔁 Redirección aquí
        }}
      >
        <Text style={styles.alertButtonText}>De acuerdo</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

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
    paddingBottom: height * 0.05,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: width * 0.04, // antes era margin
    marginBottom: height * 0.015,     // menos separación abajo
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
  },
  icon: {
    width: width * 0.07,
    height: width * 0.07,
    marginHorizontal: width * 0.01, // 🔥 reduce separación entre íconos
  },
  
  title: {
    fontSize: width * 0.06,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: height * 0.03,
  },
  avatarContainer: {
    alignItems: "center",
    marginBottom: height * 0.03,
  },
  avatar: {
    width: width * 0.3,
    height: width * 0.3,
    borderRadius: width * 0.15,
  },
  formContainer: {
    width: "100%",
    paddingHorizontal: width * 0.02,
  },
  label: {
    fontSize: width * 0.04,
    fontWeight: "bold",
    marginBottom: height * 0.005,
    color: "#000",
  },
  input: {
    height: height * 0.05,
    backgroundColor: "#f0f0f0",
    borderRadius: width * 0.02,
    paddingHorizontal: width * 0.02,
    marginBottom: height * 0.02,
    width: "100%",
  },
  saveButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: height * 0.018,  // 🔥 más pequeño
    paddingHorizontal: width * 0.08,
    borderRadius: width * 0.04,
    alignItems: "center",
    marginTop: height * 0.02,
    width: "70%", // 🔥 más estrecho
    alignSelf: "center", // 🔥 centrarlo visualmente
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: width * 0.042,
  },
  // ✅ Estilos para la alerta
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#fff",
    padding: width * 0.05,
    borderRadius: width * 0.04,
    alignItems: "center",
    width: "80%",
  },
  alertTitle: {
    fontSize: width * 0.05,
    fontWeight: "bold",
    marginBottom: height * 0.01,
    color: "#5d0c0c",
  },
  alertMessage: {
    fontSize: width * 0.04,
    marginBottom: height * 0.02,
    textAlign: "center",
  },
  alertButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: height * 0.015,
    paddingHorizontal: width * 0.07,
    borderRadius: width * 0.02,
    alignItems: "center",
  },
  
  alertButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
