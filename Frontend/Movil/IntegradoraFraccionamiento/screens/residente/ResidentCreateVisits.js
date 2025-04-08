import React, { useState, useContext, useEffect } from "react";
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView, 
  Alert, 
  ActivityIndicator, 
  Image,
  StyleSheet,
  Platform
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as ImagePicker from 'expo-image-picker';
import VisitService from "../../services/VisitService";
import { AuthContext } from "../../context/AuthContext";

export default function ResidentCreateVisits({ navigation }) {
    const { user } = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [dateTime, setDateTime] = useState(new Date());
    const [isPickerVisible, setPickerVisible] = useState(false);
    
    // Campos del formulario
    const [nombreVisitante, setNombreVisitante] = useState('');
    const [numeroPersonas, setNumeroPersonas] = useState('1');
    const [descripcion, setDescripcion] = useState('');
    const [tipoVisita, setTipoVisita] = useState('');
    const [placasVehiculo, setPlacasVehiculo] = useState('');
    const [palabraClave, setPalabraClave] = useState('');
    const [houseId, setHouseId] = useState('');
    const [fotoIne, setFotoIne] = useState(null);
    const [fotoCajuela, setFotoCajuela] = useState(null);
    const [fotoPlacas, setFotoPlacas] = useState(null);

    // Permisos de cámara
    useEffect(() => {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestCameraPermissionsAsync();
          if (status !== 'granted') {
            Alert.alert('Permisos insuficientes', 'Se necesita acceso a la cámara para tomar fotos.');
          }
        }
      })();
    }, []);

    const handleConfirm = (selectedDate) => {
        setDateTime(selectedDate);
        setPickerVisible(false);
    };

    const handleTakePhoto = async (type) => {
      try {
        const result = await ImagePicker.launchCameraAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 0.7,
        });

        if (!result.canceled) {
          const uri = result.assets[0].uri;
          const uriParts = uri.split('.');
          const fileType = uriParts[uriParts.length - 1];
          
          const formData = {
            uri: uri,
            name: `photo_${Date.now()}.${fileType}`,
            type: `image/${fileType}`
          };

          switch(type) {
            case 'ine':
              setFotoIne(formData);
              break;
            case 'cajuela':
              setFotoCajuela(formData);
              break;
            case 'placas':
              setFotoPlacas(formData);
              break;
          }
        }
      } catch (error) {
        console.error("Error al tomar la foto:", error);
        Alert.alert("Error", "No se pudo tomar la foto");
      }
    };

    const handleSubmit = async () => {
      // Validaciones básicas
      if (!nombreVisitante.trim()) {
        Alert.alert("Error", "Debes ingresar el nombre del visitante");
        return;
      }
      
      if (!tipoVisita) {
        Alert.alert("Error", "Selecciona el tipo de visita");
        return;
      }
      
      if (!houseId) {
        Alert.alert("Error", "Ingresa el número de casa a visitar");
        return;
      }

      try {
        setLoading(true);

        if (!user || !user.userId || !user.token) {
          Alert.alert('Error', 'No se encontró la información de sesión');
          setLoading(false);
          return;
        }

        // Preparar datos para enviar
        const visitData = {
          fecha: dateTime.toISOString().split('T')[0], // Formato YYYY-MM-DD
          hora: dateTime.toTimeString().split(' ')[0].substring(0, 5), // Formato HH:MM
          numeroPersonas: numeroPersonas,
          descripcion: descripcion,
          tipoVisita: tipoVisita,
          placasVehiculo: placasVehiculo,
          palabraClave: palabraClave,
          nombreVisitante: nombreVisitante,
          residentId: user.userId,
          houseId: houseId,
          statusId: 1, // Asumiendo que 1 es el ID para visitas pendientes
          fotoIne: fotoIne,
          fotoCajuela: fotoCajuela,
          fotoPlacas: fotoPlacas
        };

        // Verificamos token correctamente formateado
        const token = user.token.includes(' ') ? user.token.split(' ')[1] : user.token;
        
        // Llamamos al servicio
        const response = await VisitService.createVisit(visitData, token);
        
        console.log("Respuesta del servidor:", response);
        
        setLoading(false);
        Alert.alert(
          "Éxito", 
          "Visita registrada correctamente", 
          [{ text: "OK", onPress: () => navigation.navigate('ResidentHome') }]
        );
      } catch (error) {
        setLoading(false);
        console.error("Error al registrar la visita:", error);
        Alert.alert("Error", "No se pudo registrar la visita. Intenta nuevamente.");
      }
    };

    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('ResidentHome')}>
                            <Ionicons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.title}>SCSVF</Text>
                        <View style={{ width: 28 }} /> {/* Espacio para equilibrar el encabezado */}
                    </View>

                    <Text style={styles.subtitle}>Crear visita</Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Nombre completo del visitante:</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Nombre(s) y apellido(s)'
                            value={nombreVisitante}
                            onChangeText={setNombreVisitante}
                        />

                        <Text style={styles.label}>Número de personas:</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Ingresa el número de personas' 
                            keyboardType='numeric'
                            value={numeroPersonas}
                            onChangeText={setNumeroPersonas}
                        />

                        <Text style={styles.label}>Descripción:</Text>
                        <TextInput 
                            style={[styles.input, styles.textArea]} 
                            placeholder='Propósito de la visita'
                            multiline={true}
                            numberOfLines={3}
                            value={descripcion}
                            onChangeText={setDescripcion}
                        />

                        <Text style={styles.label}>Tipo de visita:</Text>
                        <View style={styles.pickerContainer}>
                            <Picker
                                style={styles.inputPicker}
                                selectedValue={tipoVisita}
                                onValueChange={(itemValue) => setTipoVisita(itemValue)}
                            >
                                <Picker.Item style={styles.pickerItem} label="Seleccione" value="" />
                                <Picker.Item style={styles.pickerItem} label="Técnica" value="Tecnica" />
                                <Picker.Item style={styles.pickerItem} label="Familiar" value="Familiar" />
                            </Picker>
                        </View>

                        <Text style={styles.label}>Placas del vehículo (opcional):</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Ingresa las placas'
                            value={placasVehiculo}
                            onChangeText={setPlacasVehiculo}
                        />

                        <Text style={styles.label}>Palabra clave (opcional):</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Palabra para verificar identidad'
                            value={palabraClave}
                            onChangeText={setPalabraClave}
                        />

                        <Text style={styles.label}>Número de casa a visitar:</Text>
                        <TextInput 
                            style={styles.input} 
                            placeholder='Número de casa' 
                            keyboardType='numeric'
                            value={houseId}
                            onChangeText={setHouseId}
                        />

                        <Text style={styles.label}>Fecha y hora de visita:</Text>
                        <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={dateTime ? dateTime.toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }) : "Seleccionar"}
                                editable={false}
                            />
                            <Ionicons name="calendar" size={20} color="#555" style={styles.inputIcon} />
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isPickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={() => setPickerVisible(false)}
                            minimumDate={new Date()} // No permitir fechas pasadas
                        />

                        <Text style={styles.sectionTitle}>Documentación (Opcional)</Text>

                        <View style={styles.documentsContainer}>
                            <View style={styles.documentItem}>
                                <Text style={styles.documentLabel}>INE o identificación:</Text>
                                <TouchableOpacity style={styles.photoButton} onPress={() => handleTakePhoto('ine')}>
                                    {fotoIne ? (
                                        <Image source={{ uri: fotoIne.uri }} style={styles.photoThumbnail} />
                                    ) : (
                                        <>
                                            <Ionicons name="camera" size={22} color="#555" />
                                            <Text style={styles.photoButtonText}>Tomar foto</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.documentItem}>
                                <Text style={styles.documentLabel}>Foto de placas:</Text>
                                <TouchableOpacity style={styles.photoButton} onPress={() => handleTakePhoto('placas')}>
                                    {fotoPlacas ? (
                                        <Image source={{ uri: fotoPlacas.uri }} style={styles.photoThumbnail} />
                                    ) : (
                                        <>
                                            <Ionicons name="car" size={22} color="#555" />
                                            <Text style={styles.photoButtonText}>Tomar foto</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>

                            <View style={styles.documentItem}>
                                <Text style={styles.documentLabel}>Foto de cajuela:</Text>
                                <TouchableOpacity style={styles.photoButton} onPress={() => handleTakePhoto('cajuela')}>
                                    {fotoCajuela ? (
                                        <Image source={{ uri: fotoCajuela.uri }} style={styles.photoThumbnail} />
                                    ) : (
                                        <>
                                            <Ionicons name="car-sport" size={22} color="#555" />
                                            <Text style={styles.photoButtonText}>Tomar foto</Text>
                                        </>
                                    )}
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity 
                            style={styles.submitButton} 
                            onPress={handleSubmit}
                            disabled={loading}
                        >
                            {loading ? (
                                <ActivityIndicator size="small" color="#FFF" />
                            ) : (
                                <Text style={styles.submitText}>Registrar Visita</Text>
                            )}
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#F28D52",
    },
    scrollContainer: {
        flexGrow: 1,
    },
    container: {
        backgroundColor: "#F28D52",
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 30,
    },
    header: {
        marginTop: Platform.OS === 'ios' ? '10%' : '5%',
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
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
        marginTop: 30,
        marginBottom: 25,
        textAlign: "center",
    },
    form: {
        width: "90%",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
        marginTop: 10,
    },
    input: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 12,
        marginBottom: 10,
        width: "100%",
        fontSize: 14,
    },
    textArea: {
        minHeight: 80,
        textAlignVertical: 'top',
    },
    inputContainer: {
        position: 'relative',
        width: '100%',
        marginBottom: 10,
    },
    inputIcon: {
        position: 'absolute',
        right: 12,
        top: 12,
    },
    pickerContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 10,
        width: "100%",
        overflow: 'hidden',
    },
    inputPicker: {
        width: "100%",
        height: 45,
    },
    pickerItem: {
        fontSize: 14,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#5A2D0C",
        marginTop: 20,
        marginBottom: 15,
        textAlign: "center",
    },
    documentsContainer: {
        width: "100%",
        marginBottom: 20,
    },
    documentItem: {
        marginBottom: 15,
    },
    documentLabel: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    photoButton: {
        backgroundColor: '#FFF',
        padding: 15,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        width: "100%",
        borderWidth: 1,
        borderColor: '#DDD',
        borderStyle: 'dashed',
    },
    photoButtonText: {
        color: '#555',
        marginLeft: 8,
        fontSize: 14,
    },
    photoThumbnail: {
        width: 80,
        height: 80,
        borderRadius: 8,
    },
    submitButton: {
        backgroundColor: '#5A2D0C',
        alignItems: 'center',
        padding: 15,
        borderRadius: 12,
        marginTop: 20,
        marginBottom: 20,
        width: "100%",
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 18,
    },
    buttonRow: {
        flexDirection: "row",  
        justifyContent: "space-between", 
        alignItems: "center", 
        width: "100%",   
        marginBottom: 10,  
    },
    actionButton: {
        padding: 12,
        borderRadius: 12,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        marginHorizontal: 5,
    },
    shareButton: {
        backgroundColor: '#F2994A',
    },
    qrButton: {
        backgroundColor: '#591202',
    },
    actionButtonText: {
        color: '#FFF',
        fontWeight: 'bold',
        marginLeft: 5,
        fontSize: 14,
    }
});