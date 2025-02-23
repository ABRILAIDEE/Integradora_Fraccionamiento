import React from "react";
import { View, Text, TextInput, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function PerfilGuardia() {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                    <Text style={styles.title}>SCSVF</Text>
                <TouchableOpacity>
                    <Ionicons name="log-out-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>
            <Image source={require("../assets/perfilGuardia.png")} style={styles.profileImage} />
            <Text style={styles.subtitle}>Tu perfil</Text>
            <View style={styles.form}>
                <Text style={styles.label}>Nombre completo:</Text>
                <TextInput style={styles.input} value="Juan Pérez" editable={false} />
                <Text style={styles.label}>Correo electrónico:</Text>
                <TextInput style={styles.input} value="juanperez@gmail.com" editable={false} />
                <Text style={styles.label}>Edad:</Text>
                <TextInput style={styles.input} value="34" editable={false} />
                <Text style={styles.label}>Fecha de nacimiento:</Text>
                <TextInput style={styles.input} value="13/05/1987" editable={false} />
                <Text style={styles.label}>Dirección:</Text>
                <TextInput style={styles.input} value="Av. Colima No.35 Calle Lluvia" editable={false} />
                <Text style={styles.label}>Teléfono:</Text>
                <TextInput style={styles.input} value="777 123 1233" editable={false} />
            </View>
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Cerrar sesión</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E57E3B",
        alignItems: "center",
        paddingTop: 40,
    },
    header: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "90%",
        marginBottom: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        color: "#000",
    },
    profileImage: {
        width: 100,
        height: 100,
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 20,
    },
    form: {
        width: "90%",
    },
    label: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#000",
        marginBottom: 5,
    },
    input: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 5,
        marginBottom: 15,
    },
    logoutButton: {
        backgroundColor: "#5A2D0C",
        padding: 15,
        borderRadius: 5,
        marginTop: 20,
        width: "90%",
        alignItems: "center",
    },
    logoutText: {
        color: "#FFF",
        fontSize: 16,
        fontWeight: "bold",
    },
});