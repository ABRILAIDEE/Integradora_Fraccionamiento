import React, { useRef, useLayoutEffect, useState } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  Platform
} from "react-native";
import { Dimensions } from "react-native";
const { width, height } = Dimensions.get("window");

import { useRoute, useNavigation } from "@react-navigation/native";
import QRCode from "react-native-qrcode-svg";
import { captureRef } from "react-native-view-shot";
import * as Sharing from "expo-sharing";


const VisitQRScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { qrValue, visitorName, visitDate, ineImage, name, time, from } = route.params || {};


  const qrRef = useRef();

  const [qrSharedModalVisible, setQrSharedModalVisible] = useState(false); // ✅ Modal para QR compartido

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const displayQR = qrValue || `${name}|${time}`;
  const handleShareQR = async () => {
    try {
      if (Platform.OS === "web") {
        // Simular compartir en web: solo mostrar la alerta bonita
        setQrSharedModalVisible(true);
        return;
      }
  
      const uri = await captureRef(qrRef, {
        format: "png",
        quality: 1,
      });
  
      await Sharing.shareAsync(uri);
      setQrSharedModalVisible(true);
    } catch (error) {
      console.error("Error al compartir QR:", error);
      Alert.alert("Error", "No se pudo compartir el QR.");
    }
  };
  

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <Image source={require("../assets/circulo-de-flecha.png")} style={styles.icon} />
        </TouchableOpacity>

        <Text style={styles.logo}>SCSVF</Text>

        <TouchableOpacity onPress={() => navigation.navigate("ProfileScreen")} style={styles.iconButton}>
          <Image source={require("../assets/perfil_Icon.png")} style={styles.icon} />
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>QR de la visita</Text>

      {displayQR ? (
        <View style={styles.qrContainer} ref={qrRef}>
          <QRCode value={displayQR} size={200} />
        </View>
      ) : null}

      {ineImage && (
        <Image source={{ uri: ineImage }} style={styles.image} />
      )}

      <Text style={styles.details}>{`Visita de: ${visitorName || name}\nFecha: ${visitDate || time}`}</Text>
      
      {from === "crear" && (
  <TouchableOpacity style={styles.button} onPress={handleShareQR}>
    <Text style={styles.buttonText}>Compartir QR</Text>
  </TouchableOpacity>
)}

      {/* ✅ Modal de Alerta al Compartir QR */}
      <Modal
        transparent
        animationType="fade"
        visible={qrSharedModalVisible}
        onRequestClose={() => setQrSharedModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>¡Listo!</Text>
            <Text style={styles.alertMessage}>El código QR fue compartido correctamente.</Text>
            <TouchableOpacity
              style={styles.alertButton}
              onPress={() => setQrSharedModalVisible(false)}
            >
              <Text style={styles.alertButtonText}>De acuerdo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F18F5A",
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    position: "absolute",
    top: 40,
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    width: 30,
    height: 30,
  },
  logo: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 100,
    marginBottom: 20,
  },
  qrContainer: {
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  details: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 10,
    color: "#000",
    fontWeight: "500",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 5,
  },

  // 👇 Estos estilos ya los tienes
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertBox: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    alignItems: "center",
    width: "80%",
  },
  alertTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5d0c0c",
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 20,
    textAlign: "center",
  },
  alertButton: {
    backgroundColor: "#5d0c0c",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: "center",
  },
  alertButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
  
});

export default VisitQRScreen;
