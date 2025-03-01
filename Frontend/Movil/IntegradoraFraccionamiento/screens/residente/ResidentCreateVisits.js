import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, ScrollView, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";
import DateTimePickerModal from "react-native-modal-datetime-picker";

export default function ResidentCreateVisits({ navigation }) {
    const [dateTime, setDateTime] = useState(new Date());
    const [isPickerVisible, setPickerVisible] = useState(false);

    const handleConfirm = (selectedDate) => {
        setDateTime(selectedDate);
        setPickerVisible(false);
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <ScrollView contentContainerStyle={{ flexGrow: 1}}>
                <View style={styles.container}>
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.navigate('ResidentHome')}>
                            <Ionicons name="arrow-back" size={28} color="black" />
                        </TouchableOpacity>
                        <Text style={styles.title}>SCSVF</Text>
                        <TouchableOpacity />
                    </View>

                    <Text style={styles.subtitle}>Crear visita</Text>

                    <View style={styles.form}>
                        <Text style={styles.label}>Nombre o nombres completos:</Text>
                        <TextInput style={styles.input} multiline placeholder='Ingresa los nombres necesarios' />

                        <Text style={styles.label}>Número de personas:</Text>
                        <TextInput style={styles.input} placeholder='Ingresa el número de personas' keyboardType='numeric' />

                        <Text style={styles.label}>Descripción:</Text>
                        <TextInput style={styles.input} placeholder='Ingresa una descripción' />

                        <Text style={styles.label}>Tipo de visita:</Text>
                        <Picker style={styles.inputPicker}>
                            <Picker.Item style={{ fontSize: 12}}label="Seleccione" value="" />
                            <Picker.Item style={{ fontSize: 12}} label="Técnica" value="Tecnica" />
                            <Picker.Item style={{ fontSize: 12}}label="Familiar" value="Familiar" />
                        </Picker>

                        <Text style={styles.label}>Placas del vehículo (si es el caso):</Text>
                        <TextInput style={styles.input} placeholder='Ingresa las placas' />

                        <Text style={styles.label}>Palabra clave (si es el caso):</Text>
                        <TextInput style={styles.input} placeholder='Ingresa la palabra clave' />

                        <Text style={styles.label}>INE del trabajador (si es el caso):</Text>
                        <TouchableOpacity style={styles.button}>
                            <Text style={{ color: "gray" }}>Foto de INE</Text>
                            <Ionicons name="camera" size={22} color="black" />
                        </TouchableOpacity>

                        <Text style={styles.label}>Número de casa a visitar:</Text>
                        <TextInput style={styles.input} placeholder='Ingresa la palabra clave' keyboardType='numeric' />

                        <Text style={styles.label}>Fecha y hora de visita</Text>
                        <TouchableOpacity onPress={() => setPickerVisible(true)} style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={dateTime ? dateTime.toLocaleString("es-ES", { dateStyle: "short", timeStyle: "short" }) : "Seleccionar"}
                                editable={false}
                            />
                        </TouchableOpacity>

                        <DateTimePickerModal
                            isVisible={isPickerVisible}
                            mode="datetime"
                            onConfirm={handleConfirm}
                            onCancel={() => setPickerVisible(false)}
                        />

                        <View style={styles.buttonRow}>
                        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('ResidentHome')}>
                            <Text style={styles.submitText}>Compartir Enlace</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.submitButton} onPress={() => navigation.navigate('GenerateQR')}>
                            <Text style={styles.submitText}>Generar QR</Text>
                        </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = {
    container: {
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
        marginTop: 5,
    },
    input: {
        backgroundColor: "#FFF",
        padding: 5,
        borderRadius: 12,
        marginBottom: 10,
        width: "50%",
        height: 40,
        fontSize: 12,
    },
    submitButton: {
        backgroundColor: '#591202',
        alignItems: 'center',
        padding: 10,
        borderRadius: 10,
        marginTop: 10,
        marginBottom: 20,
        width: "50%",
        marginHorizontal: 5,
        flex: 1,
    },
    submitText: {
        color: '#fff',
        fontWeight: 'bold',
        textAlign: "center",
        fontSize: 18,
    },
    button: {
        backgroundColor: '#FFF',
        padding: 10,
        borderRadius: 12,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
        width: "50%",
    },
    inputPicker: {
        width: "50%",
        backgroundColor: "#FFF",
        margin:0,
        padding:0,
        height: 45
    },
    buttonRow: {
        flexDirection: "row",  
        justifyContent: "space-between", 
        alignItems: "center", 
        width: "100%",   
        marginTop: 10,  
    },
};
