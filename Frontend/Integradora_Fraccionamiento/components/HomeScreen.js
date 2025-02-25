import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ValidateQRScreen from './ValidateQRScreen';

const shield = require('../assets/blindaje.png');
const logout = require('../assets/cerrar-sesion.png');
const user = require('../assets/cuenta.png');

export default function SplashScreen({navigation}) {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
        onPress={() => navigation.navigate('LoginScreen')}
        >
          <Image style={styles.logo} source={logout} />
        </TouchableOpacity>
        <Text style={styles.text}>SCSVF</Text>
        <TouchableOpacity
        onPress={() => navigation.navigate('GuardProfileScreen')}
        >
          <Image style={styles.logo} source={user} />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>¿Qué vas a hacer hoy?</Text>
        <Image style={styles.image} source={shield} />
        <Button
          mode="contained"
          buttonColor='white'
          textColor='black'
          labelStyle={styles.buttonText}
          contentStyle={styles.button}
          onPress={() => navigation.navigate('ValidateQRScreen')}
          >
          Escanear QR
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F28D52',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 20,
    backgroundColor: '#F28D52',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginLeft: 10,
    marginRight: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
    marginBottom: 15
  },
  logo: {
    width: 30,
    height: 30,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 50,
  },
  buttonText: {
    fontWeight: 'bold',
  }
});
