import React, { useState, useEffect, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, Alert, StyleSheet, ActivityIndicator  } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from 'expo-image-picker';
import ReportService from '../../services/ReportService.js'; // Importamos el servicio
import { AuthContext } from '../../context/AuthContext.js'; // Asumiendo que tienes un contexto de autenticación

export default function EntrySummaryScreen({ route, navigation }) {
    // Contexto de autenticación para obtener el token
    const { user } = useContext(AuthContext);
    
    // Obtener los datos del QR si existen
    const visitData = route.params?.visitData || {};
    
    // Estados para el formulario
    const [hasPassword, setHasPassword] = useState(null);
    const [licensePlatePhoto, setLicensePlatePhoto] = useState(null);
    const [trunkPhoto, setTrunkPhoto] = useState(null);
    const [nameConfirmed, setNameConfirmed] = useState(null);
    const [visitType, setVisitType] = useState(visitData.visitType || '');
    const [houseNumberConfirmed, setHouseNumberConfirmed] = useState(null);
    const [idPhoto, setIdPhoto] = useState(null);
    const [passengersConfirmed, setPassengersConfirmed] = useState(null);
    const [observations, setObservations] = useState('');
    const [loading, setLoading] = useState(false);

    // Pre-llenar formulario con datos del QR si están disponibles
    useEffect(() => {
        if (visitData.name) {
            setNameConfirmed(true);
        }
        if (visitData.house) {
            setHouseNumberConfirmed(true);
        }
        if (visitData.visitType) {
            setVisitType(visitData.visitType);
        }
    }, [visitData]);

    // Función para tomar fotos
    const takePicture = async (setPhoto) => {
        const { status } = await ImagePicker.requestCameraPermissionsAsync();
        
        if (status !== 'granted') {
            Alert.alert('Permiso denegado', 'Necesitamos permiso para usar la cámara');
            return;
        }

        try {
            const result = await ImagePicker.launchCameraAsync({
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
                
                setPhoto(formData);
            }
        } catch (error) {
            console.error('Error al tomar la foto:', error);
            Alert.alert('Error', 'No se pudo tomar la foto');
        }
    };

    // Validar formulario antes de enviar
    // Dentro de EntrySummaryScreen.js, actualiza la función handleSubmit para verificar el ID correctamente:
    const handleSubmit = async () => {
        // Verificar los campos requeridos
        const requiredFields = [
            { value: hasPassword !== null, message: 'Por favor confirma si la contraseña es correcta' },
            { value: nameConfirmed !== null, message: 'Por favor confirma si el nombre es correcto' },
            { value: visitType !== '', message: 'Por favor selecciona un tipo de visita' },
            { value: houseNumberConfirmed !== null, message: 'Por favor confirma si el número de casa es correcto' },
            { value: passengersConfirmed !== null, message: 'Por favor confirma el número de pasajeros' }
        ];

        // Buscar primer campo requerido que no esté completo
        const missingField = requiredFields.find(field => !field.value);

        if (missingField) {
            Alert.alert('Información incompleta', missingField.message);
            return;
        }

        // Verificar si tenemos un ID de visita
        if (!visitData || !visitData.id) {
            Alert.alert('Error', 'No se encontró el ID de la visita. Por favor, vuelva a escanear el código QR.');
            return;
        }

        if (!user || !user.token) {
            Alert.alert('Error', 'No se encontró información de la sesión');
            return;
        }

        try {
            setLoading(true);

            // Preparar datos para enviar
            const reportData = {
                visitId: visitData.id,
                palabraClave: hasPassword ? visitData.palabraClave || '' : '',
                fotoPlacas: licensePlatePhoto,
                fotoCajuela: trunkPhoto,
                nombreVisitante: nameConfirmed,
                tipoVisita: visitType,
                numeroCasa: houseNumberConfirmed,
                fotoIne: idPhoto,
                numeroPersonas: passengersConfirmed,
                observaciones: observations
            };

            // Verificamos token correctamente formateado
            const token = user.token.includes(' ') ? user.token : `Bearer ${user.token}`;

            // Llamamos al servicio
            const response = await ReportService.createReport(reportData, token);

            setLoading(false);
            Alert.alert(
                'Reporte Enviado', 
                'El reporte de visita ha sido registrado correctamente',
                [
                    { text: 'OK', onPress: () => navigation.navigate('HomeScreen') }
                ]
            );
        } catch (error) {
            setLoading(false);
            console.error('Error al enviar el reporte:', error.message || error);
            Alert.alert('Error', 'No se pudo registrar el reporte. Intenta nuevamente.');
        }
    };

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()} >
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>SCSVF</Text>
                    <TouchableOpacity></TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>Reporte de visita</Text>
                
                {/* Mostrar datos del QR si están disponibles */}
                {Object.keys(visitData).length > 0 && (
                    <View style={styles.qrInfoContainer}>
                        <Text style={styles.qrInfoTitle}>Información del QR</Text>
                        {visitData.name && (
                            <Text style={styles.qrInfoText}>Visitante: {visitData.name}</Text>
                        )}
                        {visitData.house && (
                            <Text style={styles.qrInfoText}>Casa: {visitData.house}</Text>
                        )}
                        {visitData.visitType && (
                            <Text style={styles.qrInfoText}>Tipo: {visitData.visitType}</Text>
                        )}
                        {visitData.date && (
                            <Text style={styles.qrInfoText}>Fecha: {visitData.date}</Text>
                        )}
                    </View>
                )}

                <View style={styles.form}>
                    <Text style={styles.label}>Contraseña (frase):</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity 
                            style={[
                                styles.buttonSi, 
                                hasPassword === true ? styles.buttonSelected : null
                            ]}
                            onPress={() => setHasPassword(true)}
                        >
                            <Ionicons name="checkmark" size={28} color={hasPassword === true ? "white" : "black"} />                    
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.buttonNo, 
                                hasPassword === false ? styles.buttonSelected : null
                            ]}
                            onPress={() => setHasPassword(false)}
                        >
                            <Ionicons name="close" size={28} color={hasPassword === false ? "white" : "black"} />                    
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Placas:</Text>
                    <TouchableOpacity 
                        style={styles.photoButton}
                        onPress={() => takePicture(setLicensePlatePhoto)}
                    >
                        {licensePlatePhoto ? (
                            <Image source={{ uri: licensePlatePhoto.uri }} style={styles.previewImage} />
                        ) : (
                            <View style={styles.photoButtonContent}>
                                <Text style={{ color: "gray"}}>Foto de placas</Text>
                                <Ionicons name="camera" size={28} color="black" />
                            </View>
                        )}
                    </TouchableOpacity>
                    
                    <Text style={styles.label}>Cajuela:</Text>
                    <TouchableOpacity 
                        style={styles.photoButton}
                        onPress={() => takePicture(setTrunkPhoto)}
                    >
                        {trunkPhoto ? (
                            <Image source={{ uri: trunkPhoto.uri }} style={styles.previewImage} />
                        ) : (
                            <View style={styles.photoButtonContent}>
                                <Text style={{ color: "gray"}}>Foto de cajuela</Text>
                                <Ionicons name="camera" size={28} color="black" />
                            </View>
                        )}
                    </TouchableOpacity>
                    
                    <Text style={styles.label}>Nombre del visitante:</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity 
                            style={[
                                styles.buttonSi, 
                                nameConfirmed === true ? styles.buttonSelected : null
                            ]}
                            onPress={() => setNameConfirmed(true)}
                        >
                            <Ionicons name="checkmark" size={28} color={nameConfirmed === true ? "white" : "black"} />                    
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.buttonNo, 
                                nameConfirmed === false ? styles.buttonSelected : null
                            ]}
                            onPress={() => setNameConfirmed(false)}
                        >
                            <Ionicons name="close" size={28} color={nameConfirmed === false ? "white" : "black"} />                    
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Tipo de visita:</Text>
                    <View style={styles.pickerContainer}>
                        <Picker
                            selectedValue={visitType}
                            onValueChange={(itemValue) => setVisitType(itemValue)}
                            style={styles.picker}
                        >
                            <Picker.Item label="Seleccione" value="" />
                            <Picker.Item label="Técnica" value="Técnica" />
                            <Picker.Item label="Familiar" value="Familiar" />
                        </Picker>
                    </View>
                    
                    <Text style={styles.label}>Número de casa:</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity 
                            style={[
                                styles.buttonSi, 
                                houseNumberConfirmed === true ? styles.buttonSelected : null
                            ]}
                            onPress={() => setHouseNumberConfirmed(true)}
                        >
                            <Ionicons name="checkmark" size={28} color={houseNumberConfirmed === true ? "white" : "black"} />                    
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.buttonNo, 
                                houseNumberConfirmed === false ? styles.buttonSelected : null
                            ]}
                            onPress={() => setHouseNumberConfirmed(false)}
                        >
                            <Ionicons name="close" size={28} color={houseNumberConfirmed === false ? "white" : "black"} />                    
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>INE del trabajador (si es el caso):</Text>
                    <TouchableOpacity 
                        style={styles.photoButton}
                        onPress={() => takePicture(setIdPhoto)}
                    >
                        {idPhoto ? (
                            <Image source={{ uri: idPhoto.uri }} style={styles.previewImage} />
                        ) : (
                            <View style={styles.photoButtonContent}>
                                <Text style={{ color: "gray"}}>Foto de INE</Text>
                                <Ionicons name="camera" size={28} color="black" />
                            </View>
                        )}
                    </TouchableOpacity>
                    
                    <Text style={styles.label}>Número de pasajeros:</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity 
                            style={[
                                styles.buttonSi, 
                                passengersConfirmed === true ? styles.buttonSelected : null
                            ]}
                            onPress={() => setPassengersConfirmed(true)}
                        >
                            <Ionicons name="checkmark" size={28} color={passengersConfirmed === true ? "white" : "black"} />                    
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[
                                styles.buttonNo, 
                                passengersConfirmed === false ? styles.buttonSelected : null
                            ]}
                            onPress={() => setPassengersConfirmed(false)}
                        >
                            <Ionicons name="close" size={28} color={passengersConfirmed === false ? "white" : "black"} />                    
                        </TouchableOpacity>
                    </View>
                    
                    <Text style={styles.label}>Observaciones:</Text>
                    <TextInput 
                        style={styles.inputTextArea} 
                        multiline 
                        placeholder='Ingresa tus observaciones'
                        value={observations}
                        onChangeText={setObservations}
                    />
                    
                    <TouchableOpacity 
                        style={styles.submitButton} 
                        onPress={handleSubmit}
                        disabled={loading}
                    >
                        {loading ? (
                            <ActivityIndicator size="small" color="#000" />
                        ) : (
                            <Text style={styles.submitText}>Enviar</Text>
                        )}
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F28D52", // Cambiado para coincidir con el estilo del segundo ejemplo
        alignItems: "center",
        paddingTop: 20,
        paddingBottom: 40,
    },
    header: {
        marginTop: '5%',
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
    qrInfoContainer: {
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        borderRadius: 10,
        padding: 15,
        width: "90%",
        marginBottom: 20,
    },
    qrInfoTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#5A2D0C",
        marginBottom: 10,
    },
    qrInfoText: {
        fontSize: 16,
        marginBottom: 5,
    },
    form: {
        width: "90%",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
        marginTop: 10
    },
    pickerContainer: {
        backgroundColor: "#FFF",
        borderRadius: 12,
        marginBottom: 15,
        overflow: "hidden",
    },
    picker: {
        width: "100%",
        height: 50,
    },
    inputTextArea: {
        backgroundColor: "#FFF",
        padding: 12,
        borderRadius: 12,
        marginBottom: 15,
        placeholderTextColor: "gray",
        height: 80, 
        width: "100%",
        textAlignVertical: 'top'
    },
    submitButton: { 
        backgroundColor: '#5A2D0C', // Cambiado al color marrón del segundo ejemplo
        alignItems: 'center', 
        padding: 15,
        borderRadius: 12, // Hecho más cuadrado para coincidir con el segundo ejemplo
        marginTop: 10,
        marginBottom: 20,
        elevation: 3, // Añadido para dar un efecto 3D como en el segundo ejemplo
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
    },
    submitText: { 
        color: '#fff', // Cambiado a blanco para coincidir con el segundo ejemplo
        fontWeight: 'bold',
        fontSize: 18
    },
    photoButton: { 
        backgroundColor: '#FFF', 
        borderRadius: 12, 
        marginBottom: 15, 
        height: 100,
        overflow: "hidden",
        borderWidth: 1, // Añadido para coincidir con el estilo del segundo ejemplo
        borderColor: '#DDD',
        borderStyle: 'dashed',
    },
    photoButtonContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        height: "100%",
    },
    previewImage: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    buttonSi: { 
        backgroundColor: '#FFF', 
        padding: 10, 
        borderRadius: 10, 
        alignItems: 'center', 
        justifyContent: 'center',
        marginBottom: 10, 
        width: 50, 
        height: 50, 
        marginRight: 10,
    },
    buttonNo: { 
        backgroundColor: '#FFF', 
        padding: 10, 
        borderRadius: 10, 
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10, 
        width: 50, 
        height: 50, 
        marginLeft: 10
    },
    containerButtons: {
        flexDirection: "row",
        marginBottom: 10,
    },
    buttonSelected: {
        backgroundColor: "#5A2D0C", // Cambiado para coincidir con el color marrón del segundo ejemplo
    }
});