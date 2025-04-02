import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
  Modal,
  Dimensions,
} from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import * as ImagePicker from "expo-image-picker";
import QRCode from "react-native-qrcode-svg";
import { Picker } from "@react-native-picker/picker";
import * as Linking from "expo-linking";
import * as Sharing from "expo-sharing";

const { width, height } = Dimensions.get("window");

const CreateVisitScreen = () => {
  const navigation = useNavigation();

  const [visitorName, setVisitorName] = useState("Juan Pérez");
  const [numPersons, setNumPersons] = useState("3");
  const [description, setDescription] = useState("Vamos con el fin de saludar a una amiga");
  const [vehiclePlate, setVehiclePlate] = useState("PWL-728-LS9");
  const [keyword, setKeyword] = useState("Plátano");
  const [houseNumber, setHouseNumber] = useState("45");
  const [visitDate, setVisitDate] = useState("12/12/25 00:00");
  

  const [visitStatus, setVisitStatus] = useState(false); // false = Pendiente, true = Terminada
  const [showStatusOptions, setShowStatusOptions] = useState(false);
  
  const [ineImage, setIneImage] = useState(null);

  const [alertModalVisible, setAlertModalVisible] = useState(false);
  const [alertTitle, setAlertTitle] = useState("");
  const [alertMessage, setAlertMessage] = useState("");

  const showAlert = (title, message) => {
    setAlertTitle(title);
    setAlertMessage(message);
    setAlertModalVisible(true);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setIneImage(result.uri);
    }
  };

  const generateQR = () => {
    if (
      !visitorName ||
      !numPersons ||
      !description ||
      !vehiclePlate ||
      !houseNumber ||
      !visitDate ||
      !visitStatus
    ) {
      showAlert("Campos incompletos", "Por favor, llena todos los campos antes de generar el QR.");
      return;
    }

    const qrValue = `${visitorName}|${numPersons}|${description}|${vehiclePlate}|${houseNumber}|${visitDate}|${visitStatus}`;

    navigation.navigate("VisitQRScreen", {
      qrValue,
      visitorName,
      numPersons,
      description,
      vehiclePlate,
      houseNumber,
      visitDate,
      visitStatus,
      ineImage,
      from: "crear",
    });

    showAlert("¡Éxito!", "El código QR se generó y compartió correctamente.");
  };

  const shareLink = async () => {
    const link = Linking.createURL("/create-visit", {
      queryParams: {
        name: visitorName,
        numPersons,
        description,
        vehiclePlate,
        houseNumber,
        visitDate,
        visitStatus,
        keyword,
      },
    });

    if (await Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(link);
      showAlert("¡Éxito!", "El enlace se compartió correctamente.");
    } else {
      showAlert("Error", "Compartir no está disponible en este dispositivo.");
    }
  };

  return (
    <>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.container}>
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image source={require("../assets/circulo-de-flecha.png")} style={styles.icon} />
            </TouchableOpacity>

            <Text style={styles.logo}>SCSVF</Text>

            <TouchableOpacity
              onPress={() =>
                navigation.dispatch(
                  CommonActions.reset({
                    index: 0,
                    routes: [{ name: "HomeStack" }],
                  })
                )
              }
            >
              <Image source={require("../assets/menu_icon.png")} style={styles.icon} />
            </TouchableOpacity>
          </View>

          <Text style={styles.title}>Crear visita</Text>

          <Text style={styles.label}>Nombre o nombres completos:</Text>
          <TextInput style={styles.input} value={visitorName} onChangeText={setVisitorName} />

          <Text style={styles.label}>Número de personas:</Text>
          <TextInput
            style={styles.input}
            value={numPersons}
            onChangeText={setNumPersons}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Descripción:</Text>
          <TextInput style={styles.input} value={description} onChangeText={setDescription} />

          <Text style={styles.label}>Placas del vehículo (si es el caso):</Text>
          <TextInput style={styles.input} value={vehiclePlate} onChangeText={setVehiclePlate} />

          <Text style={styles.label}>Palabras clave (si es el caso):</Text>
          <TextInput style={styles.input} value={keyword} onChangeText={setKeyword} />

          <Text style={styles.label}>INE del trabajador (Si es el caso):</Text>
          <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
            <Text style={styles.photoButtonText}>Foto del INE</Text>
          </TouchableOpacity>
          {ineImage && <Image source={{ uri: ineImage }} style={styles.image} />}

          <Text style={styles.label}>Número de casa a visitar:</Text>
          <TextInput
            style={styles.input}
            value={houseNumber}
            onChangeText={setHouseNumber}
            keyboardType="numeric"
          />

          <Text style={styles.label}>Fecha y hora de visita:</Text>
          <TextInput style={styles.input} value={visitDate} onChangeText={setVisitDate} />
          <Text style={styles.label}>Estatus de visita:</Text>

<TouchableOpacity
  style={styles.dropdownButton}
  onPress={() => setShowStatusOptions(!showStatusOptions)}
>
  <Text style={styles.dropdownButtonText}>
    {visitStatus ? "Terminada" : "Pendiente"}
  </Text>
</TouchableOpacity>

{showStatusOptions && (
  <View style={styles.dropdownOptions}>
    <TouchableOpacity
      style={styles.dropdownOption}
      onPress={() => {
        setVisitStatus(false);
        setShowStatusOptions(false);
      }}
    >
      <Text style={styles.dropdownOptionText}>Pendiente</Text>
    </TouchableOpacity>
    <TouchableOpacity
      style={styles.dropdownOption}
      onPress={() => {
        setVisitStatus(true);
        setShowStatusOptions(false);
      }}
    >
      <Text style={styles.dropdownOptionText}>Terminada</Text>
    </TouchableOpacity>
  </View>
)}


          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.shareButton} onPress={shareLink}>
              <Text style={styles.shareButtonText}>Compartir enlace</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.qrButton} onPress={generateQR}>
              <Text style={styles.qrButtonText}>Generar código QR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      {/* ✅ Modal de alerta */}
      <Modal
        transparent
        animationType="fade"
        visible={alertModalVisible}
        onRequestClose={() => setAlertModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>{alertTitle}</Text>
            <Text style={styles.alertMessage}>{alertMessage}</Text>
            <TouchableOpacity style={styles.alertButton} onPress={() => setAlertModalVisible(false)}>
              <Text style={styles.alertButtonText}>De acuerdo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "#F18F5A",
    paddingHorizontal: 20,
    paddingTop: 30,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  label: {
    marginBottom: 4,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  photoButton: {
    backgroundColor: "#5d0c0c",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 12,
  },
  photoButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  pickerContainer: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    marginBottom: 12,
  },
  picker: {
    height: 40,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  shareButton: {
    backgroundColor: "#5d0c0c",
    padding: 12,
    borderRadius: 8,
  },
  shareButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  qrButton: {
    backgroundColor: "#5d0c0c",
    padding: 12,
    borderRadius: 8,
  },
  qrButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  image: {
    width: 200,
    height: 150,
    alignSelf: "center",
    marginBottom: 12,
    borderRadius: 8,
  },

  // ✅ Estilos del modal de alerta
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
  dropdownButton: {
    backgroundColor: "#FFF",
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    justifyContent: "center",
  },
  dropdownButtonText: {
    fontWeight: "bold",
    color: "#000",
  },
  dropdownOptions: {
    backgroundColor: "#FFF",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    marginBottom: 12,
  },
  dropdownOption: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  dropdownOptionText: {
    color: "#000",
  },
  
  
});

export default CreateVisitScreen;
