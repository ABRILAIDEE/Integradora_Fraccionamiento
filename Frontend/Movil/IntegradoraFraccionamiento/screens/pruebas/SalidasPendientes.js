import React from "react";
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function SalidasPendientes() {
    const visitas = [
        { id: "1", nombre: "Angel Daniel", hora: "18:00" },
        { id: "2", nombre: "Angel Daniel", hora: "18:00" },
        { id: "3", nombre: "Angel Daniel", hora: "18:00" },
        { id: "4", nombre: "Angel Daniel", hora: "18:00" },
        { id: "5", nombre: "Angel Daniel", hora: "18:00" },
        { id: "6", nombre: "Angel Daniel", hora: "18:00" },
        { id: "7", nombre: "Angel Daniel", hora: "18:00" },
        { id: "8", nombre: "Angel Daniel", hora: "18:00" },
        { id: "9", nombre: "Angel Daniel", hora: "18:00" },
        { id: "10", nombre: "Angel Daniel", hora: "18:00" },
        { id: "11", nombre: "Angel Daniel", hora: "18:00" },
    ];

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Ionicons name="arrow-back" size={28} color="black" />
                </TouchableOpacity>
                <Text style={styles.title}>SCSVF</Text>
                <TouchableOpacity>
                    <Ionicons name="person-circle-outline" size={28} color="black" />
                </TouchableOpacity>
            </View>
            <Text style={styles.subtitle}>Salidas Pendientes</Text>
            <FlatList
                data={visitas}
                keyExtractor={(item) => item.id}
                style={{ flex: 1, width: "100%" }}
                contentContainerStyle={{ paddingBottom: 20 }}
                renderItem={({ item }) => (
                    <View style={styles.card}>
                        <TouchableOpacity>
                            <Text style={styles.cardText}>
                                {item.nombre} | Hora: {item.hora}
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E57E3B",
        paddingTop: 20,
    },
    header: {
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
        marginBottom: 5, 
    },
    cardText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#000",
        textAlign: "center"
    },
});
