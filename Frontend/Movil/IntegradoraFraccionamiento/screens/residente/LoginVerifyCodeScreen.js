import React, { useState, useContext, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Alert } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { AuthContext } from '../../context/AuthContext';

const img = require('../../assets/solitude.png');

export default function LoginVerifyCodeScreen({ navigation }) {
  const { verifyOtp, loading, error, user } = useContext(AuthContext);
  const [telefono, setTelefono] = useState('');
  const [codigo, setCodigo] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Verificar si ya estamos autenticados
  useEffect(() => {
    if (user) {
      console.log('Usuario ya autenticado, role:', user.role);
      // No necesitamos navegar manualmente, AppNavigator se encargará de esto
    }
  }, [user]);

  const handleVerify = async () => {
    if (!telefono || telefono.length < 10) {
      Alert.alert("Error", "Por favor ingresa un número telefónico válido");
      return;
    }

    if (!codigo || codigo.length < 4) {
      Alert.alert("Error", "Por favor ingresa el código de verificación");
      return;
    }
    
    setSubmitting(true);
    console.log("Iniciando verificación OTP con:", { telefono, codigo });
    
    try {
      const success = await verifyOtp(telefono, codigo);
      
      console.log("Resultado de verificación:", success);
      
      if (success) {
        console.log("Verificación exitosa");
        // No necesitamos navegar manualmente, AppNavigator lo hará automáticamente
      } else if (error) {
        console.log("Error en verificación:", error);
        Alert.alert("Error", error);
      }
    } catch (err) {
      console.error("Error inesperado:", err);
      Alert.alert("Error", "Ocurrió un error inesperado. Intenta de nuevo.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image source={img} style={styles.image} />

      <View style={styles.card}>
        <Text style={styles.title}>Iniciar sesión</Text>
        <Text style={styles.subtitle}>Bienvenido a la app de residente</Text>
        
        <TextInput
          label="Ingresa el número telefónico"
          mode="outlined"
          style={[styles.input, { marginBottom: 20 }]}
          keyboardType='number-pad'
          theme={{ colors: { primary: 'orange', underlineColor: 'transparent' } }}
          value={telefono}
          onChangeText={setTelefono}
          disabled={loading || submitting}
        />
        
        <TextInput
          label="Ingresa el código"
          mode="outlined"
          style={[styles.input, { marginBottom: 40 }]}
          keyboardType='number-pad'
          theme={{ colors: { primary: 'orange', underlineColor: 'transparent' } }}
          value={codigo}
          onChangeText={setCodigo}
          disabled={loading || submitting}
        />
        
        <Button
          mode="contained"
          buttonColor='orange'
          contentStyle={styles.button}
          onPress={handleVerify}
          loading={loading || submitting}
          disabled={loading || submitting}
        >
          Ingresar
        </Button>
        
        <Button 
          mode="text" 
          textColor='black' 
          onPress={() => navigation.navigate('LoginScreen')}
          disabled={loading || submitting}
        >
          Soy Guardia
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
}); // NUEVO 2