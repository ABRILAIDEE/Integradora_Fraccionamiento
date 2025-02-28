import React from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ScrollView, SafeAreaView } from 'react-native';
import {Picker} from '@react-native-picker/picker';
import { Ionicons } from "@expo/vector-icons";

export default function ExitSummaryScreen({navigation}) {

    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                    onPress={() => navigation.navigate('PendingExitScreen')} >
                        <Ionicons name="arrow-back" size={28} color="black" />
                    </TouchableOpacity>
                    <Text style={styles.title}>SCSVF</Text>
                    <TouchableOpacity>
                    </TouchableOpacity>
                </View>

                <Text style={styles.subtitle}>Informe de salida</Text>

                <View style={styles.form}>
                    <Text style={styles.label}>Contraseña (frase):</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={styles.buttonSi}>
                            <Ionicons name="checkmark" size={28} color="black" />                    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNo}>
                            <Ionicons name="close" size={28} color="black" />                    
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Placas:</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "gray"}}>Foto de placas</Text>
                        <Ionicons name="camera" size={28} color="black" />                    
                    </TouchableOpacity>
                    <Text style={styles.label}>Cajuela:</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "gray"}}>Foto de cajuela</Text>
                        <Ionicons name="camera" size={28} color="black" />                    
                    </TouchableOpacity>
                    <Text style={styles.label}>Nombre del visitante:</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={styles.buttonSi}>
                            <Ionicons name="checkmark" size={28} color="black" />                    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNo}>
                            <Ionicons name="close" size={28} color="black" />                    
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Tipo de visita:</Text>
                    <Picker style={styles.input}>
                        <Picker.Item label="Seleccione" value="" />
                        <Picker.Item label="Tecnica" value="" />
                        <Picker.Item label="Familiar" value="" />
                    </Picker>
                    <Text style={styles.label}>Numero de casa:</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={styles.buttonSi}>
                            <Ionicons name="checkmark" size={28} color="black" />                    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNo}>
                            <Ionicons name="close" size={28} color="black" />                    
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>INE del trabajador (si es el caso):</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{ color: "gray"}}>Foto de INE</Text>
                        <Ionicons name="camera" size={28} color="black" />                    
                    </TouchableOpacity>
                    <Text style={styles.label}>Numero de pasajeros:</Text>
                    <View style={styles.containerButtons}>
                        <TouchableOpacity style={styles.buttonSi}>
                            <Ionicons name="checkmark" size={28} color="black" />                    
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonNo}>
                            <Ionicons name="close" size={28} color="black" />                    
                        </TouchableOpacity>
                    </View>
                    <Text style={styles.label}>Observaciones:</Text>
                    <TextInput style={ styles.inputTextArea } multiline placeholder='Ingresa tus observaciones'></TextInput>
                    <TouchableOpacity style={styles.submitButton}>
                        <Text style={styles.submitText}>Enviar</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    );
};

const styles = {
    container: {
        flex: 1,
        backgroundColor: "#E57E3B",
        alignItems: "center",
        paddingTop: 20,
    },
    header: {
      marginTop: '8%',
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
        marginTop:10
    },
    input: {
        backgroundColor: "#FFF",
        padding: 5,
        borderRadius: 12,
        marginBottom: 15,
        width: "50%", 
        height: "6%",
        placeholderTextColor: "gray",
        fontSize: 14
    },
    inputTextArea: {
        backgroundColor: "#FFF",
        padding: 10,
        borderRadius: 12,
        marginBottom: 15,
        placeholderTextColor: "gray",
        height: 80, 
        width: "100%"
    },
    submitButton: { 
        backgroundColor: '#EBEBF2', 
        alignItems: 'center', 
        padding: 10,
        borderRadius: 20,
        marginBottom: -30,
        height: "5.5%"
    },
    submitText: { 
        color: '#000', 
        fontWeight: 'bold',
        textAlign: "center",
        margin: "auto",
        fontSize: 18
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
        height: "5%"},
    buttonSi: { 
        backgroundColor: '#FFF', 
        padding: 4, 
        borderRadius: 10, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10, 
        width: "10%", 
        height: "80%", 
        marginRight: 5,
      },
    buttonNo: { 
        backgroundColor: '#FFF', 
        padding: 4, 
        borderRadius: 10, 
        alignItems: 'center', 
        flexDirection: 'row', 
        justifyContent: 'space-between', 
        marginBottom: 10, 
        width: "10%", 
        height: "80%", 
        marginLeft: 5},
    containerButtons: {
        flexDirection: "row",
        justifyItems: "start",
        marginBottom: -15,
    }
};