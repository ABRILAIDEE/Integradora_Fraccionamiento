import React, { useState, useEffect, useContext } from "react";
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import VisitService from "../../services/VisitService";
import { AuthContext } from "../../context/AuthContext";

export default function VisitDetailsScreen({ route, navigation }) {
  const { visitId } = route.params;
  const [visit, setVisit] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchVisitDetails = async () => {
      try {
        if (!user?.token || !visitId) {
          Alert.alert('Error', 'No se pudo obtener la información necesaria');
          setLoading(false);
          return;
        }

        const token = user.token.includes(' ') ? user.token.split(' ')[1] : user.token;
        const response = await VisitService.getVisitById(visitId, token);
        
        console.log("Detalles de visita recibidos:", response);
        
        if (response && response.data) {
          setVisit(response.data);
        } else if (response) {
          setVisit(response);
        } else {
          Alert.alert('Error', 'No se encontraron detalles de la visita');
        }
        
        setLoading(false);
      } catch (error) {
        console.error('Error al cargar los detalles de la visita:', error);
        Alert.alert('Error', 'No se pudieron cargar los detalles de la visita');
        setLoading(false);
      }
    };

    fetchVisitDetails();
  }, [visitId, user]);

  const getStatusColor = (status) => {
    const statusName = status?.nombre || status?.name || "";
    if (statusName.toLowerCase().includes("pendiente")) return "#FFB74D"; // Naranja
    if (statusName.toLowerCase().includes("aprobada")) return "#66BB6A"; // Verde
    if (statusName.toLowerCase().includes("rechazada")) return "#EF5350"; // Rojo
    if (statusName.toLowerCase().includes("completada")) return "#42A5F5"; // Azul
    return "#9E9E9E"; // Gris para otros estados
  };

  // Función para navegar a la pantalla de QR
  const handleGenerateQR = () => {
    if (visit) {
      // Crear un objeto con la información relevante para el QR
      const qrData = {
        id: visitId,
        nombreVisitante: visit.nombreVisitante,
        tipoVisita: visit.tipoVisita,
        numeroPersonas: visit.numeroPersonas,
        fecha: visit.fecha,
        hora: visit.hora,
        descripcion: visit.descripcion,
        placasVehiculo: visit.placasVehiculo || '',
        palabraClave: visit.palabraClave || '',
        status: visit.status?.nombre || visit.status?.name || "Pendiente"
      };
      
      navigation.navigate('VisitQRScreen', { visitData: qrData });
    } else {
      Alert.alert('Error', 'No hay datos de visita para generar el QR.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>SCSVF</Text>
        <View style={{ width: 28 }} />
      </View>

      <Text style={styles.title}>Detalles de la Visita</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#000" style={styles.loader} />
      ) : visit ? (
        <ScrollView 
          style={styles.detailsContainer}
          contentContainerStyle={{ paddingBottom: 30 }}
        >
          <View style={styles.card}>
            <View style={styles.statusBadge} backgroundColor={getStatusColor(visit.status)}>
              <Text style={styles.statusText}>
                {visit.status?.nombre || visit.status?.name || "Pendiente"}
              </Text>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Información del Visitante</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Nombre:</Text>
                <Text style={styles.infoValue}>{visit.nombreVisitante || "No especificado"}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Tipo de visita:</Text>
                <Text style={styles.infoValue}>{visit.tipoVisita || "No especificado"}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Número de personas:</Text>
                <Text style={styles.infoValue}>{visit.numeroPersonas || "1"}</Text>
              </View>
            </View>

            <View style={styles.infoSection}>
              <Text style={styles.sectionTitle}>Detalles de la Visita</Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Fecha:</Text>
                <Text style={styles.infoValue}>{visit.fecha || "No especificada"}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Hora:</Text>
                <Text style={styles.infoValue}>{visit.hora || "No especificada"}</Text>
              </View>
              
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Descripción:</Text>
                <Text style={styles.infoValue}>{visit.descripcion || "Sin descripción"}</Text>
              </View>
              
              {visit.palabraClave && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Palabra clave:</Text>
                  <Text style={styles.infoValue}>{visit.palabraClave}</Text>
                </View>
              )}
              
              {visit.placasVehiculo && (
                <View style={styles.infoRow}>
                  <Text style={styles.infoLabel}>Placas del vehículo:</Text>
                  <Text style={styles.infoValue}>{visit.placasVehiculo}</Text>
                </View>
              )}
            </View>

            {/* Si hay imágenes disponibles */}
            {(visit.fotoIne || visit.fotoPlacas || visit.fotoCajuela) && (
              <View style={styles.infoSection}>
                <Text style={styles.sectionTitle}>Imágenes</Text>
                <View style={styles.imagesContainer}>
                  {visit.fotoIne && (
                    <View style={styles.imageCard}>
                      <Text style={styles.imageLabel}>Identificación</Text>
                      <Image 
                        source={{ uri: visit.fotoIne }} 
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                  
                  {visit.fotoPlacas && (
                    <View style={styles.imageCard}>
                      <Text style={styles.imageLabel}>Placas</Text>
                      <Image 
                        source={{ uri: visit.fotoPlacas }} 
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                  
                  {visit.fotoCajuela && (
                    <View style={styles.imageCard}>
                      <Text style={styles.imageLabel}>Cajuela</Text>
                      <Image 
                        source={{ uri: visit.fotoCajuela }} 
                        style={styles.image}
                        resizeMode="cover"
                      />
                    </View>
                  )}
                </View>
              </View>
            )}

            {/* Botón para generar QR */}
            <TouchableOpacity 
              style={styles.qrButton}
              onPress={handleGenerateQR}
            >
              <Ionicons name="qr-code" size={20} color="#FFF" />
              <Text style={styles.qrButtonText}>Generar QR</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      ) : (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>No se encontró la información de la visita</Text>
          <TouchableOpacity 
            style={styles.refreshButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.refreshButtonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  detailsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: "#FFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  statusBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 20,
  },
  statusText: {
    color: "#FFF",
    fontWeight: "bold",
    textAlign: "center",
  },
  infoSection: {
    marginBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#E0E0E0",
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#5A2D0C",
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 8,
    flexWrap: "wrap",
  },
  infoLabel: {
    fontWeight: "bold",
    width: "40%",
    color: "#333",
  },
  infoValue: {
    flex: 1,
    color: "#555",
  },
  imagesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  imageCard: {
    width: "48%",
    marginBottom: 15,
    backgroundColor: "#F9F9F9",
    borderRadius: 8,
    padding: 8,
  },
  imageLabel: {
    textAlign: "center",
    marginBottom: 5,
    fontWeight: "bold",
    color: "#555",
  },
  image: {
    width: "100%",
    height: 120,
    borderRadius: 5,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: "#000",
    textAlign: "center",
    marginBottom: 20,
  },
  refreshButton: {
    backgroundColor: "#5A2D0C",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  refreshButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  qrButton: {
    backgroundColor: '#591202',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 5,
    width: "100%",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  qrButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
    fontSize: 16,
  },
});