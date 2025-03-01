import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import LoginScreen from './screens/guardia/LoginScreen';
import HomeScreen from './screens/guardia/HomeScreen';
import PendingEntryScreen from './screens/guardia/PendingEntryScreen';
import PendingExitScreen from './screens/guardia/PendingExitScreen';
import GuardProfileScreen from './screens/guardia/GuardProfileScreen';
import ValidateQRScreen from './screens/guardia/ValidateQRScreen';
import EntrySummaryScreen from './screens/guardia/EntrySummaryScreen';
import ExitSummaryScreen from './screens/guardia/ExitSummaryScreen';

import LoginEnterPhoneScreen from './screens/residente/LoginEnterPhoneScreen';
import LoginVerifyCodeScreen from './screens/residente/LoginVerifyCodeScreen';
import ResidenteHomeScreen from './screens/residente/ResidenteHomeScreen';
import ResidentProfileScreen from './screens/residente/ResidentProfileScreen';
import ResidentEditProfileScreen from './screens/residente/ResidentEditProfileScreen';
import ResidentVisitsScreen from './screens/residente/ResidentVisitsScren';
import ResidentCreateVisits from './screens/residente/ResidentCreateVisits';
import GenerateQRScreen from './screens/residente/GenerateQR';

export const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginScreen">
        <Stack.Screen  // Residente Navigator
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
        <Stack.Screen 
        name="LoginEnterPhone" 
        component={LoginEnterPhoneScreen}
        options={{ headerShown: false }}
        />

        {/* Guardia Navigator */}

        <Stack.Screen 
        name="LoginVerifyCode" 
        component={LoginVerifyCodeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentHome" 
        component={ResidenteHomeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentProfile" 
        component={ResidentProfileScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentEditProfile" 
        component={ResidentEditProfileScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentVisits" 
        component={ResidentVisitsScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentCreateVisits" 
        component={ResidentCreateVisits}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="GenerateQR" 
        component={GenerateQRScreen}
        options={{ headerShown: false }}
        />


      </Stack.Navigator>
    </NavigationContainer>
  );
}