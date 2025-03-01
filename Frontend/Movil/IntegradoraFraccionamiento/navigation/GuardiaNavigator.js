import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import { Feather } from "@expo/vector-icons";
import { NavigationContainer } from '@react-navigation/native';
import * as React from "react";
import EntrySummaryScreen from "../screens/guardia/EntrySummaryScreen";
import ExitSummaryScreen from "../screens/guardia/ExitSummaryScreen";
import GuardProfileScreen from "../screens/guardia/GuardProfileScreen";
import HomeScreen from "../screens/guardia/HomeScreen";
import LoginScreen from "../screens/guardia/LoginScreen";
import PendingEntryScreen from "../screens/guardia/PendingEntryScreen";
import PendingExitScreen from "../screens/guardia/PendingExitScreen";
import SplashScreen from "../screens/guardia/SplashScreen";
import ValidateQRScreen from "../screens/guardia/ValidateQRScreen";
import LoginEnterPhoneScreen from "../screens/residente/LoginEnterPhoneScreen";

// Creación de navegadores
const Tab = createBottomTabNavigator();
const GuardiaStack = createStackNavigator(); // Cambié el nombre de Stack a GuardiaStack

// 🚀 **Stack Navigator (Para las pantallas dentro de "Inicio")**
const HomeStack = () => (
    <GuardiaStack.Navigator screenOptions={{ headerShown: true }} initialRouteName="LoginScreen">
        <GuardiaStack.Screen name="SplashScreen" component={SplashScreen} />
        <GuardiaStack.Screen name="LoginScreen" component={LoginScreen} />
        <GuardiaStack.Screen name="HomeScreen" component={HomeScreen} />
        <GuardiaStack.Screen name="GuardProfileScreen" component={GuardProfileScreen} />
        <GuardiaStack.Screen name="PendingEntryScreen" component={PendingEntryScreen} />
        <GuardiaStack.Screen name="PendingExitScreen" component={PendingExitScreen} />
        <GuardiaStack.Screen name="ValidateQRScreen" component={ValidateQRScreen} />
        <GuardiaStack.Screen name="EntrySummaryScreen" component={EntrySummaryScreen} />
        <GuardiaStack.Screen name="ExitSummaryScreen" component={ExitSummaryScreen} />
        <GuardiaStack.Screen name="LoginEnterPhone" component={LoginEnterPhoneScreen} />
    </GuardiaStack.Navigator>
);

// 🚀 **Tab Navigator (Navegación inferior)**
const GuardiaNavigator = () => (
  <NavigationContainer>  {/* Asegúrate de envolver el Tab Navigator con NavigationContainer */}
    <Tab.Navigator screenOptions={{ headerShown: false, tabBarActiveTintColor: '#FF9800', tabBarInactiveTintColor: 'gray' }}>
      <Tab.Screen 
        name="Inicio" 
        component={HomeStack} 
        options={{ tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Escanear" 
        component={ValidateQRScreen} 
        options={{ tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} /> }} 
      />
      <Tab.Screen 
        name="Perfil" 
        component={GuardProfileScreen} 
        options={{ tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} /> }} 
      />
    </Tab.Navigator>
  </NavigationContainer>
);

export default GuardiaNavigator;
