import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { ActivityIndicator, View, Text } from "react-native";
import { AuthContext } from "../context/AuthContext";  // Asegúrate de que la ruta sea correcta
import GuardiaNavigator from "./GuardiaNavigator";
import ResidenteNavigator from "./ResidenteNavigator";
import LoginStack from "./LoginNavigator";

const LoadingScreen = () => (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
    <ActivityIndicator size="large" color="#F28D52" />
    <Text style={{ marginTop: 20 }}>Cargando...</Text>
  </View>
);

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user, loading } = useContext(AuthContext);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user) {
    return (
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen 
            name="LoginStack" 
            component={LoginStack} 
            options={{ animationEnabled: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user.role === "ROLE_GUARD" ? (
          <Stack.Screen 
            name="GuardiaStack" 
            component={GuardiaNavigator} 
            options={{ animationEnabled: false }}
          />
        ) : (
          <Stack.Screen 
            name="ResidenteStack" 
            component={ResidenteNavigator} 
            options={{ animationEnabled: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function AppNavigator() {
  return <MainNavigator />;
}
