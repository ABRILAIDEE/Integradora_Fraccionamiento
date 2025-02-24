import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Button, TextInput } from 'react-native-paper';

const img = require('../assets/solitude.png');

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Bienvenido a la app</Text>
        <TextInput
          label="Usuario"
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: 'orange', underlineColor: 'transparent' } }}
        />
        <TextInput
          label="Contraseña"
          mode="outlined"
          style={styles.input}
          theme={{ colors: { primary: 'orange', underlineColor: 'transparent' } }}
        />
        <Button
          mode="contained"
          buttonColor='orange'
          contentStyle={styles.button}
          onPress={() => console.log('Pressed')}
        >
        Ingresar
        </Button>
        <Button mode="text" textColor='black' onPress={() => console.log('Pressed')}>
        Soy residente
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
    padding: 20,
  },
  image: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '50%',
    resizeMode: 'cover',
  },
  card: {
    marginTop: 180,
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    width: '90%',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 780,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 50,
    fontWeight: '500',
    textAlign: 'center',
  },
  text: {
    marginTop: 20,
    fontSize: 12,
    marginBottom: 10,
    textAlign: 'center',
    paddingBottom: 10,
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 50,
  },
  input: {
    height: 40,
    width: '100%',
    marginBottom: 20,
  },
});

