import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function GenerateQRScreen({navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
            <TouchableOpacity
            onPress={() => navigation.navigate('ResidentHome')} >
                <Ionicons name="arrow-back" size={28} color="black" />
            </TouchableOpacity>
                <Text style={styles.title}>SCSVF</Text>
            <TouchableOpacity>
            </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>QR de la visita</Text>
            <View style={styles.box}>
                <Image source={require("../../assets/qr.jpg")} style={styles.qrImage} />
            </View>
            <TouchableOpacity style={styles.button}
            onPress={() => navigation.navigate('ResidentHome')}
            >
                <Text style={styles.buttonText}>Compartir QR</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F28D52",
        alignItems: "center",
        justifyContent: "center",
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
        marginBottom: 20,
    },
    qrImage: {
        width: 150,
        height: 150,
        marginBottom: 30,
    },
    button: {
        backgroundColor: "#FFF",
        padding: 15,
        borderRadius: 30,
        width: "50%",
        alignItems: "center",
        marginVertical: 10,
    },
    buttonText: {
        color: "#000",
        fontSize: 16,
        fontWeight: "bold",
    },
    box: {
        borderColor: "black",
        borderRadius: 5,
        backgroundColor: "white",
        width: 182,
        height: 182,
        padding: 15,
        marginBottom: 20
    }
});