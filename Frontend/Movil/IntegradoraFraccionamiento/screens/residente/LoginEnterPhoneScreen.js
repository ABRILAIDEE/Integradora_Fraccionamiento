import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

const img = require('../../assets/solitude.png');

export default function LoginEnterPhoneScreen({ navigation }) {
  const { sendOtp, loading, error } = useContext(AuthContext);
  const [telefono, setTelefono] = useState('');

  const handleSendCode = async () => {
    if (!telefono || telefono.length < 10) {
      Alert.alert("Error", "Por favor ingresa un número telefónico válido");
      return;
    }
    
    const success = await sendOtp(telefono);
    
    if (success) {
      // Si el envío fue exitoso, navegar a la pantalla de verificación de código
      navigation.navigate('LoginVerifyCode');
      Alert.alert("Éxito", "Código enviado. Por favor ingresa el código recibido.");
    } else if (error) {
      Alert.alert("Error", error);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Bienvenido a la app de residente</Text>
        
        <TextInput
          label="Número Telefónico"
          mode="outlined"
          style={[styles.input, { marginBottom: 40 }]}
          keyboardType='number-pad'
          theme={{ colors: { primary: 'orange', underlineColor: 'transparent' } }}
          value={telefono}
          onChangeText={setTelefono}
        />
        
        <Button
          mode="contained"
          buttonColor='orange'
          contentStyle={styles.button}
          onPress={handleSendCode}
          loading={loading}
          disabled={loading}
        >
          Mandar código
        </Button>
        
        <Button 
          mode="text" 
          textColor='black' 
          onPress={() => navigation.navigate('LoginScreen')}
        >
          Soy Guardia
        </Button>
        
        <Button 
          mode="text" 
          textColor='black' 
          onPress={() => navigation.navigate('LoginVerifyCode')}
        >
          Ya tengo un código
        </Button>
      </View>
    </View>
  );
}

// ... (mismo estilo que antes)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F28D52',
  },
  image: {
    position: 'absolute',
    top: 0,
    width: '120%',
    height: '50%',
    resizeMode: 'cover',
    borderRadius: 40
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
    fontSize: 32,
    fontWeight: "bold",
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
}); //NUEVO