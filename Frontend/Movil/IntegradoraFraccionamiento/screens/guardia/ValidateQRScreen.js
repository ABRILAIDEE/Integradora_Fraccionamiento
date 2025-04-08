import React, { useState, useRef, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { CameraView, useCameraPermissions } from "expo-camera";

export default function ValidateQRScreen({ navigation }) {
  const [facing, setFacing] = useState("back");
  const [scanned, setScanned] = useState(false);
  const [qrData, setQrData] = useState(null);
  const [showCamera, setShowCamera] = useState(true);
  const [permission, requestPermission] = useCameraPermissions();

  // Verificar y solicitar permisos de cámara
  if (!permission) {
    return <View style={styles.container}><Text>Cargando permisos de cámara...</Text></View>;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>Necesitamos tu permiso para usar la cámara</Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Otorgar Permiso</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Manejar el escaneo del código QR
  const handleQRScanned = ({ data }) => {
    if (!scanned) {
      setScanned(true);
      setShowCamera(false);
      
      // Intentar diferentes formas de parseo
      try {
        // Intentar parsear como JSON
        let parsedData;
        try {
          parsedData = JSON.parse(data);
        } catch (jsonError) {
          // Si no es JSON válido, revisar si es una URL o texto con formato específico
          if (data.startsWith('http') || data.includes('?') || data.includes('=')) {
            // Podría ser una URL con parámetros
            const params = {};
            
            // Si es una URL, extraer la parte de query
            let queryPart = data;
            if (data.includes('?')) {
              queryPart = data.split('?')[1];
            }
            
            // Extraer parámetros
            if (queryPart.includes('=')) {
              queryPart.split('&').forEach(param => {
                if (param.includes('=')) {
                  const [key, value] = param.split('=');
                  params[key] = decodeURIComponent(value);
                }
              });
              parsedData = params;
            } else {
              // Si no tiene formato de parámetros, mostrar como texto plano
              parsedData = { texto: data };
            }
          } else {
            // Si es texto plano, intentar buscar patrones comunes
            const possiblePatterns = [
              { regex: /id[=:]?(\w+)/i, key: "id" },
              { regex: /nombre[=:]?([^,;]+)/i, key: "nombre" },
              { regex: /casa[=:]?(\w+)/i, key: "casa" },
              { regex: /tipo[=:]?([^,;]+)/i, key: "tipo" }
            ];
            
            parsedData = { texto: data };
            
            // Buscar cada patrón en el texto
            possiblePatterns.forEach(pattern => {
              const match = data.match(pattern.regex);
              if (match && match[1]) {
                parsedData[pattern.key] = match[1].trim();
              }
            });
          }
        }
        
        // Asegurarse de que tengamos un ID
        if (parsedData && !parsedData.id && data.includes('id')) {
          // Intentar extraer ID de la cadena original
          const idMatch = data.match(/id[=:]?(\w+)/i);
          if (idMatch && idMatch[1]) {
            parsedData.id = idMatch[1];
          }
        }
        
        // Si es un objeto vacío o solo tiene la propiedad texto, añadir un ID generado
        if (parsedData && (Object.keys(parsedData).length === 0 || 
            (Object.keys(parsedData).length === 1 && parsedData.texto))) {
          parsedData.id = `temp_${Date.now()}`;
          parsedData.generated = true; // Marcar como ID generado
        }
        
        setQrData(parsedData);
        
        // Verificar si tiene ID
        if (!parsedData.id) {
          console.log("Advertencia: El QR no contiene un ID de visita y no se pudo extraer uno");
        }
      } catch (error) {
        // En caso de cualquier error, mostrar el texto sin procesar
        console.error("Error general al procesar QR:", error);
        setQrData({ 
          texto: data,
          id: `temp_${Date.now()}`,
          generated: true
        });
      }
    }
  };

  // Función para reiniciar el escaneo
  const resetScan = () => {
    setScanned(false);
    setQrData(null);
    setShowCamera(true);
  };

  // Función para validar y navegar a la pantalla de resumen
  const validateAndNavigate = () => {
    // Si no hay datos o no hay ID, mostrar alerta
    if (!qrData) {
      Alert.alert(
        "Error", 
        "No se pudieron procesar los datos del QR.",
        [{ text: "Escanear de nuevo", onPress: resetScan }]
      );
      return;
    }
    
    // Formatear los datos del QR para la siguiente pantalla
    const visitData = {
      id: qrData.id || qrData.ID || qrData.visitaId || `temp_${Date.now()}`,
      name: qrData.nombre || qrData.name || qrData.visitante || '',
      house: qrData.casa || qrData.house || qrData.numero || '',
      visitType: qrData.tipo || qrData.type || qrData.visitType || '',
      date: qrData.fecha || qrData.date || new Date().toLocaleDateString(),
      palabraClave: qrData.palabraClave || qrData.password || qrData.clave || '',
      raw: qrData.texto || '' // Guardar el texto original por si acaso
    };
    
    // Si el ID fue generado, informar al usuario
    if (qrData.generated) {
      Alert.alert(
        "Aviso", 
        "No se encontró un ID válido en el QR. Se usará un ID temporal.",
        [
          { text: "Escanear otro QR", onPress: resetScan },
          { text: "Continuar de todos modos", onPress: () => navigation.navigate('EntrySummaryScreen', { visitData }) }
        ]
      );
    } else {
      // Navegar con los datos procesados
      navigation.navigate('EntrySummaryScreen', { visitData });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeScreen')}>
          <Ionicons name="arrow-back" size={28} color="black" />
        </TouchableOpacity>
        <Text style={styles.title}>SCSVF</Text>
        <View style={{ width: 28 }} />
      </View>

      {showCamera ? (
        <>
          <Text style={styles.subtitle}>Escanea el QR de la visita</Text>
          <View style={styles.cameraContainer}>
            <CameraView
              style={styles.camera}
              facing={facing}
              onBarcodeScanned={scanned ? undefined : handleQRScanned}
            >
              <View style={styles.overlay}>
                <View style={styles.scanFrame} />
              </View>
            </CameraView>
          </View>
          <TouchableOpacity 
            style={styles.flipButton} 
            onPress={() => setFacing(current => (current === "back" ? "front" : "back"))}
          >
            <Ionicons name="camera-reverse" size={24} color="white" />
          </TouchableOpacity>
        </>
      ) : (
        // Mostrar datos escaneados y botones de validación
        <>
          <Text style={styles.subtitle}>Datos de la visita</Text>
          <View style={styles.dataContainer}>
            {qrData && Object.entries(qrData).map(([key, value], index) => {
              // No mostrar la propiedad "generated" ni textos muy largos completos
              if (key === 'generated') return null;
              if (key === 'texto' && value && value.length > 100) {
                value = value.substring(0, 100) + "...";
              }
              
              return (
                <View key={index} style={styles.dataRow}>
                  <Text style={styles.dataLabel}>{key}: </Text>
                  <Text style={styles.dataValue}>
                    {value !== null && value !== undefined ? value.toString() : ''}
                  </Text>
                </View>
              );
            })}
          </View>
          
          <TouchableOpacity style={styles.button} onPress={validateAndNavigate}>
            <Text style={styles.buttonText}>Validar visita</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.button, {backgroundColor: '#ccc'}]} onPress={resetScan}>
            <Text style={styles.buttonText}>Volver a escanear</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F28D52",
    alignItems: "center",
    paddingTop: 20,
  },
  header: {
    marginTop: '5%',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    position: "absolute",
    top: 20,
    zIndex: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  subtitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginTop: 80,
    marginBottom: 20,
  },
  cameraContainer: {
    width: '80%',
    height: 300,
    overflow: 'hidden',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanFrame: {
    width: 200,
    height: 200,
    borderWidth: 2,
    borderColor: '#FFF',
    borderRadius: 10,
  },
  flipButton: {
    position: 'absolute',
    bottom: 100,
    right: 50,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 10,
    borderRadius: 50,
  },
  button: {
    backgroundColor: "#5A2D0C",
    padding: 15,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
    marginVertical: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  message: {
    textAlign: "center",
    paddingBottom: 10,
    fontSize: 16,
  },
  dataContainer: {
    backgroundColor: 'white',
    width: '80%',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  dataRow: {
    flexDirection: 'row',
    paddingVertical: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    flexWrap: 'wrap'
  },
  dataLabel: {
    fontWeight: 'bold',
    flex: 1,
  },
  dataValue: {
    flex: 2,
  }
});