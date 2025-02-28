import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './components/SplashScreen';
import LoginScreen from './components/LoginScreen';
import HomeScreen from './components/HomeScreen';
import PendingEntryScreen from './components/PendingEntryScreen';
import PendingExitScreen from './components/PendingExitScreen';
import GuardProfileScreen from './components/GuardProfileScreen';
import ValidateQRScreen from './components/ValidateQRScreen';
import EntrySummaryScreen from './components/EntrySummaryScreen';
import ExitSummaryScreen from './components/ExitSummaryScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SplashScreen">
        <Stack.Screen 
          name="SplashScreen" 
          component={SplashScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="LoginScreen" 
          component={LoginScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="HomeScreen" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="GuardProfileScreen" 
          component={GuardProfileScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PendingEntryScreen" 
          component={PendingEntryScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="PendingExitScreen" 
          component={PendingExitScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ValidateQRScreen" 
          component={ValidateQRScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="EntrySummaryScreen" 
          component={EntrySummaryScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="ExitSummaryScreen" 
          component={ExitSummaryScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
