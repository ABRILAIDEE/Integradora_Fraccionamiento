import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ResidenteHomeScreen from "../screens/residente/ResidenteHomeScreen";
import ResidentProfileScreen from "../screens/residente/ResidentProfileScreen";
import ResidentVisitsScreen from "../screens/residente/ResidentVisitsScren";
import ResidenteCreateVisits from "../screens/residente/ResidentCreateVisits";
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
    <Stack.Screen name="ResidenteHomeScreen" component={ResidenteHomeScreen} />
    <Stack.Screen name="ResidentProfileScreen" component={ResidentProfileScreen} />
    <Stack.Screen name="ResidentVisitsScreen" component={ResidentVisitsScreen} />
    <Stack.Screen name="LoginEnterPhoneScreen" component={LoginEnterPhoneScreen} />
    <Stack.Screen name="LoginVerifyCodeScreen" component={LoginVerifyCodeScreen} />
    <Stack.Screen name="ResidentEditProfileScreen" component={ResidentEditProfileScreen} />
    <Stack.Screen name="ResidentCreateVisits" component={ResidentCreateVisits} />
    <Stack.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
  </Stack.Navigator>
);

const ResidenteStack1 = () => (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ResidentProfileScreen" component={ResidentProfileScreen} />
      <Stack.Screen name="ResidenteHomeScreen" component={ResidenteHomeScreen} />
      <Stack.Screen name="ResidentVisitsScreen" component={ResidentVisitsScreen} />
      <Stack.Screen name="LoginEnterPhoneScreen" component={LoginEnterPhoneScreen} />
      <Stack.Screen name="LoginVerifyCodeScreen" component={LoginVerifyCodeScreen} />
      <Stack.Screen name="ResidentEditProfileScreen" component={ResidentEditProfileScreen} />
      <Stack.Screen name="ResidentCreateVisits" component={ResidentCreateVisits} />
      <Stack.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
    </Stack.Navigator>
  );

const ResidenteStack2 = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ResidentVisitsScreen" component={ResidentVisitsScreen} />
    <Stack.Screen name="ResidentProfileScreen" component={ResidentProfileScreen} />
    <Stack.Screen name="ResidenteHomeScreen" component={ResidenteHomeScreen} />
    <Stack.Screen name="LoginEnterPhoneScreen" component={LoginEnterPhoneScreen} />
    <Stack.Screen name="LoginVerifyCodeScreen" component={LoginVerifyCodeScreen} />
    <Stack.Screen name="ResidentEditProfileScreen" component={ResidentEditProfileScreen} />
    <Stack.Screen name="ResidentCreateVisits" component={ResidentCreateVisits} />
    <Stack.Screen name="GenerateQRScreen" component={GenerateQRScreen} />
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
      name="Mis Visitas" 
      component={ResidenteStack2} 
      options={{ tabBarIcon: ({ color }) => <Feather name="clock" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Perfil" 
      component={ResidenteStack1} 
      options={{ tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export default ResidenteNavigator;
