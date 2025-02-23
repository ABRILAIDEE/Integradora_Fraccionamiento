import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PerfilGuardia from '../screens/PerfilGuardia';

const Stack = createNativeStackNavigator();

export default function StackNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen name="Inicio" component={Inicio} />
            <Stack.Screen name="Escanear" component={EscanearQR} />
            <Stack.Screen name="Perfil" component={PerfilGuardia} />
        </Stack.Navigator>
    );
}