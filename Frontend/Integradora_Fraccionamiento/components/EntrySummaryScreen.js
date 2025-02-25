import * as React from "react";
import {TextInput, View, Text, TouchableOpacity, StyleSheet, Image, ScrollView, Picker } from 'react-native';
import {Button, List, Dialog, Portal, Paragraph, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";

const back = require('../assets/flecha-izquierda.png');
const user = require('../assets/cuenta.png');
const wrong = require('../assets/marca-x.png');
const right = require('../assets/cheque.png');

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: 'black',
    accent: 'yellow',
  },
};

export default function EntrySummary({navigation}) {
  const [expanded, setExpanded] = useState(false);
  const [title, setTitle] = useState('Tipo de visita');
  const [visible, setVisible] = useState(false);

  const handlePress = () => setExpanded(!expanded);

  const handleItemPress = (itemTitle) => {
    setTitle(itemTitle);
    setExpanded(false);
  };

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  return (
    <PaperProvider theme={theme}>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => navigation.navigate('PendingEntryScreen')} >
                <Ionicons name="arrow-back" size={28} color="black" />
          </TouchableOpacity>
          <Text style={styles.text}>SCSVF</Text>
          <TouchableOpacity>
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Informe de entrada </Text>

        <ScrollView>
          <View style={styles.forInput}>
            <Text style={styles.label}> Contraseña </Text>
            <View style={styles.checkInput}>
              <TouchableOpacity
              onPress={() => console.log('Is right')}>
                <Image style={styles.smallBtn} source={right} />
              </TouchableOpacity>
              <TouchableOpacity
              onPress={() => console.log('Is wrong')}>
                <Image style={styles.smallBtn} source={wrong} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forInput}>
            <Text style={styles.label}> Placas </Text>
            <Button 
              icon="camera"
              mode="contained"
              style={styles.mediumBtn}
              buttonColor="white"
              textColor="black"
              onPress={() => console.log('Pressed')}
            >
              Fotos de placas
            </Button>
          </View>

          <View style={styles.forInput}>
            <Text style={styles.label}> Cajuela </Text>
            <Button 
              icon="camera"
              mode="contained"
              style={styles.mediumBtn}
              buttonColor="white"
              textColor="black"
              onPress={() => console.log('Pressed')}
            >
              Foto de cajuela
            </Button>
          </View>
          
          <View style={styles.forInput}>
            <Text style={styles.label}> Nombre del visitante </Text>
            <View style={styles.checkInput}>
              <TouchableOpacity onPress={() => console.log('Is right')}>
                <Image style={styles.smallBtn} source={right} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Is wrong')}>
                <Image style={styles.smallBtn} source={wrong} />
              </TouchableOpacity>
            </View>
          </View>
          
          <View style={styles.forInput}>
            <Text style={styles.label}> Tipo de visita </Text>
            <Picker style={styles.picker}>
            <Picker.Item label="Seleccione" value="" />
            <Picker.Item label="Tecnica" value="" />
            <Picker.Item label="Familiar" value="" />
            </Picker>
          </View>
          
          <View style={styles.forInput}>
            <Text style={styles.label}> Numero de casa </Text>
            <View style={styles.checkInput}>
              <TouchableOpacity onPress={() => console.log('Is right')}>
                <Image style={styles.smallBtn} source={right} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Is wrong')}>
                <Image style={styles.smallBtn} source={wrong} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forInput}>
            <Text style={styles.label}> INE del trabajador (Si aplica) </Text>
            <Button 
              icon="camera"
              mode="contained"
              style={styles.mediumBtn}
              buttonColor="white"
              textColor="black"
              onPress={() => console.log('Pressed')}
            >
              Foto del INE
            </Button>
          </View>
          
          <View style={styles.forInput}>
            <Text style={styles.label}> Numero de pasajeros </Text>
            <View style={styles.checkInput}>
              <TouchableOpacity onPress={() => console.log('Is right')}>
                <Image style={styles.smallBtn} source={right} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => console.log('Is wrong')}>
                <Image style={styles.smallBtn} source={wrong} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.forInput}>
            <Text style={styles.label}> Observaciones </Text>

            <TextInput style={ styles.inputTextArea } multiline placeholder='Ingresa tus observaciones'></TextInput>
            
          </View>

          <View style={styles.forText}>
            <Button
              mode="contained"
              buttonColor='white'
              textColor='black'
              contentStyle={styles.button}
              onPress={showDialog}
            >
              Enviar
            </Button>
          </View>

          <Portal>
            <Dialog visible={visible} onDismiss={hideDialog}>
              <Dialog.Title>Confirmación</Dialog.Title>
              <Dialog.Content>
                <Paragraph>¿Está seguro de que quiere enviar el informe?</Paragraph>
              </Dialog.Content>
              <Dialog.Actions>
                <Button onPress={hideDialog}>Cancelar</Button>
                <Button onPress={hideDialog}>Aceptar</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>

        </ScrollView>
      </View>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F28D52",
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
    label: {
        fontSize: 16,
        marginLeft: 15,
        marginBottom: 5,
        fontWeight: 'bold',
      },
    forInput: {
        marginBottom: 12
      },
    checkInput: {
        flexDirection: "row",
        alignItems: "center",
        width: "90%",
        alignSelf: "center",
      },
    smallBtn: {
        width: 30,
        height: 30,
        marginRight: 15,
        marginTop: 5
    },
    input: {
        height: 40,
        width: '120%',
        marginBottom: 20,
    },
    button: {
        paddingHorizontal: 80,
        paddingVertical: 0,
      },
    forText: {
        alignItems: "center",
        alignSelf: "center",
        marginBottom: 10
    },
    mediumBtn: {
        width: '60%',
        marginTop: 5,
        marginLeft: 12,
    },
    accordion: {
        borderRadius: 15,
    },
    listItem: {
        backgroundColor: 'white',
    },
    picker: {
      marginLeft: 12,
      backgroundColor: "#FFF",
      padding: 12,
      borderRadius: 12,
      width: "50%", 
      height: "100%",
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
      width: "90%",
      marginLeft: 15,
    },
    
});
