import * as React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image, ScrollView } from "react-native";
import { TextInput, Button, List, Dialog, Portal, Paragraph, Provider as PaperProvider, DefaultTheme } from 'react-native-paper';
import { useState } from "react";

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

export default function EntrySummary() {
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
          <TouchableOpacity onPress={() => console.log('Logout pressed')}>
            <Image style={styles.logo} source={back} />
          </TouchableOpacity>
          <Text style={styles.text}>SCSVF</Text>
          <TouchableOpacity onPress={() => console.log('User pressed')}>
            <Image style={styles.logo} source={user} />
          </TouchableOpacity>
        </View>

        <Text style={styles.subtitle}>Informe de entrada </Text>

        <ScrollView>
          <View style={styles.forInput}>
            <Text style={styles.label}> Contraseña </Text>
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
            <Text style={styles.label}> Placas </Text>
            <Button 
              icon="qrcode-scan"
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
              icon="qrcode-scan"
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
            <List.Section style={styles.mediumBtn}>
              <List.Accordion
                title={title}
                expanded={expanded}
                onPress={handlePress}
                style={styles.accordion}
              >
                <List.Item 
                  title="Personal" 
                  onPress={() => handleItemPress('Personal')} 
                  style={styles.listItem} 
                />
                <List.Item 
                  title="Técnica" 
                  onPress={() => handleItemPress('Técnica')} 
                  style={styles.listItem} 
                />
              </List.Accordion>
            </List.Section>
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
              icon="qrcode-scan"
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
            <View style={styles.forText}>
              <TextInput
                numberOfLines={10}
                style={styles.input}
              />
            </View>
          </View>

          <View>
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
                <Paragraph>Su informe ha sido enviado con éxito.</Paragraph>
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
        marginLeft: 12,
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
        paddingVertical: 5,
        paddingHorizontal: 50,
      },
    forText: {
        alignItems: "center",
        alignSelf: "center",
    },
    mediumBtn: {
        width: '60%',
        marginTop: 5,
        marginLeft: 8,
    },
    accordion: {
        borderRadius: 15,
    },
    listItem: {
        backgroundColor: 'white',
    }
});
