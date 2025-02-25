import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import QRCode from 'react-native-qrcode-svg';

const CreateVisitScreen = () => {
  const [visitorName, setVisitorName] = useState("Juan Pérez");
  const [numPersons, setNumPersons] = useState("3");
  const [description, setDescription] = useState("Vamos con el fin de saludar a una amiga");
  const [vehiclePlate, setVehiclePlate] = useState("PWL-728-LS9");
  const [keyword, setKeyword] = useState("Plátano");
  const [houseNumber, setHouseNumber] = useState("45");
  const [visitDate, setVisitDate] = useState("12/12/25 00:00");
  const [visitStatus, setVisitStatus] = useState("Pendiente");
  const [ineImage, setIneImage] = useState(null);
  const [qrValue, setQrValue] = useState("");

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
    setQrValue(`${visitorName}|${numPersons}|${description}|${vehiclePlate}|${houseNumber}|${visitDate}|${visitStatus}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear visita</Text>

      <Text style={styles.label}>Nombre o nombres completos:</Text>
      <TextInput style={styles.input} value={visitorName} onChangeText={setVisitorName} />

      <Text style={styles.label}>Número de personas:</Text>
      <TextInput style={styles.input} value={numPersons} onChangeText={setNumPersons} keyboardType="numeric" />

      <Text style={styles.label}>Descripción:</Text>
      <TextInput style={styles.input} value={description} onChangeText={setDescription} />

      <Text style={styles.label}>Placas del vehículo (si es el caso):</Text>
      <TextInput style={styles.input} value={vehiclePlate} onChangeText={setVehiclePlate} />

      <Text style={styles.label}>Palabras clave (si es el caso):</Text>
      <TextInput style={styles.input} value={keyword} onChangeText={setKeyword} />

      <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
        <Text style={styles.photoButtonText}>Foto del INE</Text>
      </TouchableOpacity>
      {ineImage && <Image source={{ uri: ineImage }} style={styles.image} />}

      <Text style={styles.label}>Número de casa a visitar:</Text>
      <TextInput style={styles.input} value={houseNumber} onChangeText={setHouseNumber} keyboardType="numeric" />

      <Text style={styles.label}>Fecha y hora de visita:</Text>
      <TextInput style={styles.input} value={visitDate} onChangeText={setVisitDate} />

      <Text style={styles.label}>Estatus de visita:</Text>
      <TextInput style={styles.input} value={visitStatus} onChangeText={setVisitStatus} />

      <TouchableOpacity style={styles.qrButton} onPress={generateQR}>
        <Text style={styles.qrButtonText}>Generar código QR</Text>
      </TouchableOpacity>
      {qrValue ? <QRCode value={qrValue} size={150} /> : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f7945b",
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  label: {
    fontWeight: "bold",
    marginTop: 10,
  },
  input: {
    height: 40,
    backgroundColor: "#f5f5f5",
    borderRadius: 6,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  photoButton: {
    backgroundColor: "#5d0c0c",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 10,
  },
  photoButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    alignSelf: "center",
    marginTop: 10,
  },
  qrButton: {
    backgroundColor: "#5d0c0c",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginVertical: 10,
  },
  qrButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CreateVisitScreen;
