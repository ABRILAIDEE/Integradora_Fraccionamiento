import React from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';

const guard = require('../assets/policia.png');

export default function SplashScreen() {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={guard} />
      <Text style={styles.title}>SCSVF</Text>
      <Text style={styles.text}>Ingresando...</Text>
      <ActivityIndicator size="large" color="#000000" />
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
  title: {
    fontSize: 45,
    fontWeight: 1000,
    marginBottom: 20,
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});
