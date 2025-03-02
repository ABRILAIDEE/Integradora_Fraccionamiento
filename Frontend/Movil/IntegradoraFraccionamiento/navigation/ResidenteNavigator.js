import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ResidenteHomeScreen from "../screens/residente/ResidenteHomeScreen";
import ResidentProfileScreen from "../screens/residente/ResidentProfileScreen";
import ResidentVisitsScreen from "../screens/residente/ResidentVisitsScreen";
import LoginEnterPhoneScreen from '../screens/residente/LoginEnterPhoneScreen';
import LoginVerifyCodeScreen from '../screens/residente/LoginVerifyCodeScreen';
import ResidentEditProfileScreen from '../screens/residente/ResidentEditProfileScreen';
import ResidentCreateVisits from '../screens/residente/ResidentCreateVisits';
import GenerateQRScreen from '../screens/residente/GenerateQR';
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Pantallas del Stack de Residente
const ResidenteStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
        name="ResidentHome" 
        component={ResidenteHomeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="LoginVerifyCode" 
        component={LoginVerifyCodeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="LoginEnterPhone" 
        component={LoginEnterPhoneScreen}
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
);

const ResidenteStack1 = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
        name="ResidentCreateVisits" 
        component={ResidentCreateVisits}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentHome" 
        component={ResidenteHomeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="LoginVerifyCode" 
        component={LoginVerifyCodeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="LoginEnterPhone" 
        component={LoginEnterPhoneScreen}
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
        name="GenerateQR" 
        component={GenerateQRScreen}
        options={{ headerShown: false }}
        />
  </Stack.Navigator>
);

const ResidenteStack2 = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen 
        name="ResidentProfile" 
        component={ResidentProfileScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="ResidentHome" 
        component={ResidenteHomeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="LoginVerifyCode" 
        component={LoginVerifyCodeScreen}
        options={{ headerShown: false }}
        />
        <Stack.Screen 
        name="LoginEnterPhone" 
        component={LoginEnterPhoneScreen}
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
);

const ResidenteNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name="Inicio" 
      component={ResidenteStack} 
      options={{ tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Crear Visitas" 
      component={ResidenteStack1} 
      options={{ tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Perfil" 
      component={ResidenteStack2} 
      options={{ tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export default ResidenteNavigator;
