import React, { useState, useEffect } from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Share, 
  Alert,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import QRCode from 'react-native-qrcode-svg';
import * as FileSystem from 'expo-file-system';
import * as Sharing from 'expo-sharing';
import * as MediaLibrary from 'expo-media-library';

export default function VisitQRScreen({ route, navigation }) {
  const { visitData } = route.params;
  const [loading, setLoading] = useState(false);
  const [qrRef, setQrRef] = useState(null);
  const [hasSharingPermission, setHasSharingPermission] = useState(false);
  const [hasMediaLibraryPermission, setHasMediaLibraryPermission] = useState(false);

  // Convertir los datos de la visita a JSON para usarlos en el QR
  const qrValue = JSON.stringify(visitData || {});

  useEffect(() => {
    checkPermissions();
  }, []);

  const checkPermissions = async () => {
    try {
      const sharingAvailable = await Sharing.isAvailableAsync();
      setHasSharingPermission(sharingAvailable);

      const { status } = await MediaLibrary.requestPermissionsAsync();
      setHasMediaLibraryPermission(status === 'granted');
    } catch (error) {
      console.error('Error al verificar permisos:', error);
    }
  };

  // Función para compartir el QR
  const handleShareQR = async () => {
    if (!qrRef) return;

    try {
      setLoading(true);

      // Convertir QR a una imagen PNG base64
      qrRef.toDataURL(async (dataURL) => {
        try {
          const shareOptions = {
            title: 'Detalles de la Visita',
            message: `Visita de ${visitData.nombreVisitante || 'Visitante'} el ${visitData.fecha || 'fecha no especificada'} a las ${visitData.hora || 'hora no especificada'}`,
          };

          // Si el dispositivo soporta compartir imágenes
          if (hasSharingPermission) {
            // Guardar QR como archivo temporal
            const fileUri = FileSystem.cacheDirectory + `visita_${visitData.id}.png`;
            await FileSystem.writeAsStringAsync(fileUri, dataURL, {
              encoding: FileSystem.EncodingType.Base64,
            });
            
            shareOptions.url = fileUri;
          }

          await Share.share(shareOptions);
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.error('Error al compartir QR:', error);
          Alert.alert('Error', 'No se pudo compartir el código QR');
        }
      });
    } catch (error) {
      setLoading(false);
      console.error('Error al generar QR para compartir:', error);
      Alert.alert('Error', 'No se pudo generar el código QR para compartir');
    }
  };

  // Función para guardar el QR en la galería
  const handleSaveQR = async () => {
    if (!qrRef || !hasMediaLibraryPermission) {
      if (!hasMediaLibraryPermission) {
        Alert.alert('Permiso requerido', 'Necesitas otorgar permisos para guardar imágenes en tu galería');
      }
      return;
    }

    try {
      setLoading(true);

      // Convertir QR a una imagen PNG base64
      qrRef.toDataURL(async (dataURL) => {
        try {
          // Guardar QR como archivo temporal
          const fileUri = FileSystem.cacheDirectory + `visita_${visitData.id}.png`;
          await FileSystem.writeAsStringAsync(fileUri, dataURL, {
            encoding: FileSystem.EncodingType.Base64,
          });

          // Guardar en galería
          const asset = await MediaLibrary.createAssetAsync(fileUri);
          await MediaLibrary.createAlbumAsync('SCSVF', asset, false);
          
          setLoading(false);
          Alert.alert('Éxito', 'Código QR guardado en tu galería');
        } catch (error) {
          setLoading(false);
          console.error('Error al guardar QR:', error);
          Alert.alert('Error', 'No se pudo guardar el código QR');
        }
      });
    } catch (error) {
      setLoading(false);
      console.error('Error al generar QR para guardar:', error);
      Alert.alert('Error', 'No se pudo generar el código QR para guardar');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>SCSVF</Text>
          <View style={{ width: 28 }} />
        </View>

        <Text style={styles.title}>Código QR de la Visita</Text>

        <ScrollView 
          style={styles.scrollContainer}
          contentContainerStyle={styles.contentContainer}
        >
          <View style={styles.card}>
            <View style={styles.qrContainer}>
              <QRCode
                value={qrValue}
                size={250}
                backgroundColor="white"
                color="black"
                getRef={(ref) => setQrRef(ref)}
              />
            </View>

            <View style={styles.visitInfo}>
              <Text style={styles.visitName}>{visitData.nombreVisitante || 'Sin nombre'}</Text>
              <Text style={styles.visitDetail}>
                {visitData.tipoVisita || 'Tipo no especificado'} · {visitData.numeroPersonas || '1'} {parseInt(visitData.numeroPersonas) === 1 ? 'persona' : 'personas'}
              </Text>
              <Text style={styles.visitDetail}>
                {visitData.fecha || 'Fecha no especificada'} · {visitData.hora || 'Hora no especificada'}
              </Text>
              
              <View style={[styles.statusBadge, { backgroundColor: getStatusColor(visitData.status) }]}>
                <Text style={styles.statusText}>{visitData.status || 'Pendiente'}</Text>
              </View>
            </View>

            {/* <View style={styles.buttonsContainer}>
              <TouchableOpacity 
                style={[styles.actionButton, styles.shareButton]} 
                onPress={handleShareQR}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator size="small" color="#FFF" />
                ) : (
                  <>
                    <Ionicons name="share-social" size={20} color="#FFF" />
                    <Text style={styles.actionButtonText}>Compartir QR</Text>
                  </>
                )}
              </TouchableOpacity>
              
              <TouchableOpacity 
                style={[styles.actionButton, styles.saveButton]} 
                onPress={handleSaveQR}
                disabled={loading || !hasMediaLibraryPermission}
              >
                <Ionicons name="download" size={20} color="#FFF" />
                <Text style={styles.actionButtonText}>Guardar QR</Text>
              </TouchableOpacity>
            </View> */}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

// Función para determinar el color según el estado
const getStatusColor = (status) => {
  const statusName = status ? status.toLowerCase() : "";
  if (statusName.includes("pendiente")) return "#FFB74D"; // Naranja
  if (statusName.includes("aprobada")) return "#66BB6A"; // Verde
  if (statusName.includes("rechazada")) return "#EF5350"; // Rojo
  if (statusName.includes("completada")) return "#42A5F5"; // Azul
  return "#9E9E9E"; // Gris para otros estados
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F28D52",
  },
  container: {
    flex: 1,
    backgroundColor: "#F28D52",
  },
  header: {
    marginTop: '8%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
    paddingVertical: 10,
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 20,
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    width: "100%",
  },
  contentContainer: {
    paddingHorizontal: 20,
    paddingBottom: 30,
    alignItems: 'center',
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    width: "100%",
    alignItems: 'center',
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  qrContainer: {
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 10,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  visitInfo: {
    width: "100%",
    alignItems: 'center',
    marginBottom: 20,
  },
  visitName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
    color: "#333",
  },
  visitDetail: {
    fontSize: 14,
    color: "#555",
    marginBottom: 5,
  },
  statusBadge: {
    marginTop: 10,
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 20,
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 12,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 10,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  shareButton: {
    backgroundColor: '#F2994A',
  },
  saveButton: {
    backgroundColor: '#5A2D0C',
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 14,
  },
});