import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { FlatList } from "react-native-gesture-handler";
import VisitService from "../../services/VisitService";
import { AuthContext } from "../../context/AuthContext";

const back = require('../../assets/flecha-izquierda.png');
const user = require('../../assets/cuenta.png');

export default function ResidentVisitsScreen({navigation}) {
    // Estado para almacenar las visitas - inicializado como array vacío
    const [visitas, setVisitas] = useState([]);
    const [loading, setLoading] = useState(true);
    
    // Obtenemos los datos del usuario desde el contexto de autenticación
    const { user } = useContext(AuthContext);

    // Función para obtener las visitas del residente actual
    const fetchVisitas = async () => {
        try {
            // Verificamos que existan los datos necesarios
            if (!user || !user.userId || !user.token) {
                console.error("No se encontró la información de sesión:", user);
                Alert.alert('Error', 'No se encontró la información de sesión');
                setLoading(false);
                return;
            }
            
            console.log("ID de usuario:", user.userId);
            console.log("Token:", user.token);
            
            // Antes de la llamada a la API, verificamos la estructura de user.token
            if (typeof user.token !== 'string') {
                console.error("Token no es una cadena:", user.token);
                Alert.alert('Error', 'El token de autenticación no es válido');
                setLoading(false);
                return;
            }
            
            // Llamar al servicio para obtener las visitas del residente
            // Verificamos si es necesario decodificar el token
            const token = user.token.includes(' ') ? user.token.split(' ')[1] : user.token;
            
            console.log("Token usado para la petición:", token);
            const response = await VisitService.getVisitsByResidentId(user.userId, token);
            
            console.log("Respuesta completa:", response);
            
            // Verificar la estructura de la respuesta
            let visitasData = [];
            
            // Comprobar diferentes estructuras posibles
            if (response && response.data && Array.isArray(response.data)) {
                // Si la respuesta tiene estructura { data: [...] }
                visitasData = response.data;
                console.log("Usando response.data");
            } else if (response && response.body && Array.isArray(response.body)) {
                // Si la respuesta tiene estructura { body: [...] }
                visitasData = response.body;
                console.log("Usando response.body");
            } else if (response && Array.isArray(response)) {
                // Si la respuesta es directamente un array
                visitasData = response;
                console.log("Usando response directamente");
            } else if (response && typeof response === 'object') {
                console.log("Estructura de respuesta inesperada:", response);
                // Intentar extraer datos de cualquier propiedad que sea un array
                for (const key in response) {
                    if (Array.isArray(response[key])) {
                        visitasData = response[key];
                        console.log("Encontrado array en propiedad:", key);
                        break;
                    }
                }
            }
            
            console.log("Visitas procesadas:", visitasData);
            setVisitas(visitasData || []);
            
            // Si no se encontraron visitas pero la respuesta no era undefined
            if ((!visitasData || visitasData.length === 0) && response) {
                console.warn("No se pudieron extraer visitas de la respuesta:", response);
            }
            
            setLoading(false);
        } catch (error) {
            console.error('Error al cargar las visitas:', error);
            console.error('Detalles del error:', error.response ? error.response.data : 'No hay detalles adicionales');
            Alert.alert('Error', 'No se pudieron cargar las visitas');
            setLoading(false);
            setVisitas([]);
        }
    };

    // Cargar las visitas cuando el componente se monta o cuando cambia el usuario
    useEffect(() => {
        if (user && user.token) { 
            fetchVisitas();
        }
    }, [user]);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ResidentHome')}>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.text}>SCSVF</Text>
                <TouchableOpacity>
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Mis visitas</Text>
            
            {loading ? (
                <ActivityIndicator size="large" color="#000" style={styles.loader} />
            ) : (visitas && visitas.length > 0) ? (
                <FlatList
                    data={visitas}
                    keyExtractor={(item, index) => (item?.id?.toString() || `visit-${index}`)}
                    style={{ flex: 1, width: "100%" }}
                    contentContainerStyle={{ paddingBottom: 20, flexGrow: 1 }}
                    renderItem={({ item }) => (
                        <TouchableOpacity 
                            style={styles.card}
                            onPress={() => navigation.navigate('VisitDetailsScreen', { visitId: item.id })}
                        >
                            <Text style={styles.cardText}>
                                {item.nombreVisitante || "Visitante"} | Hora: {item.hora || "No especificada"}
                            </Text>
                            <Text style={styles.cardStatus}>
                                Estado: {item.status?.nombre || item.status?.name || "Pendiente"}
                            </Text>
                        </TouchableOpacity>
                    )}
                />
            ) : (
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>No tienes visitas registradas</Text>
                    <TouchableOpacity 
                        style={styles.refreshButton}
                        onPress={fetchVisitas}
                    >
                        <Text style={styles.refreshButtonText}>Reintentar</Text>
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
        paddingTop: 20,
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
    card: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 10,
        width: "85%",
        alignSelf: "center",
        marginBottom: 10,
    },
    cardText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center"
    },
    cardStatus: {
        fontSize: 14,
        color: "#555",
        textAlign: "center",
        marginTop: 5
    },
    logo: {
        width: 30,
        height: 30,
    },
    text: {
        fontSize: 16,
        marginLeft: 10,
        marginRight: 10,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20
    },
    emptyText: {
        fontSize: 18,
        color: "#000",
        textAlign: "center",
        marginBottom: 20
    },
    refreshButton: {
        backgroundColor: "#5A2D0C",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    refreshButtonText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold"
    }
});