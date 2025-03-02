import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/guardia/HomeScreen";
import PendingEntryScreen from "../screens/guardia/PendingEntryScreen";
import PendingExitScreen from "../screens/guardia/PendingExitScreen";
import GuardProfileScreen from "../screens/guardia/GuardProfileScreen";
import ValidateQRScreen from "../screens/guardia/ValidateQRScreen";
import LoginScreen from "../screens/guardia/LoginScreen";
import EntrySummaryScreen from '../screens/guardia/EntrySummaryScreen';
import ExitSummaryScreen from '../screens/guardia/ExitSummaryScreen';
import { Feather } from "@expo/vector-icons";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const GuardiaStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="PendingEntryScreen" component={PendingEntryScreen} />
    <Stack.Screen name="PendingExitScreen" component={PendingExitScreen} />
    <Stack.Screen name="GuardProfileScreen" component={GuardProfileScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="EntrySummaryScreen" component={EntrySummaryScreen} />
    <Stack.Screen name="ExitSummaryScreen" component={ExitSummaryScreen} />
    <Stack.Screen name="ValidateQRScreen" component={ValidateQRScreen} />
  </Stack.Navigator>
);

const GuardiaStack1 = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="ValidateQRScreen" component={ValidateQRScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="PendingEntryScreen" component={PendingEntryScreen} />
    <Stack.Screen name="PendingExitScreen" component={PendingExitScreen} />
    <Stack.Screen name="GuardProfileScreen" component={GuardProfileScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="EntrySummaryScreen" component={EntrySummaryScreen} />
    <Stack.Screen name="ExitSummaryScreen" component={ExitSummaryScreen} />
  </Stack.Navigator>
);

const GuardiaStack2 = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="GuardProfileScreen" component={GuardProfileScreen} />
    <Stack.Screen name="HomeScreen" component={HomeScreen} />
    <Stack.Screen name="PendingEntryScreen" component={PendingEntryScreen} />
    <Stack.Screen name="PendingExitScreen" component={PendingExitScreen} />
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="EntrySummaryScreen" component={EntrySummaryScreen} />
    <Stack.Screen name="ExitSummaryScreen" component={ExitSummaryScreen} />
    <Stack.Screen name="ValidateQRScreen" component={ValidateQRScreen} />
  </Stack.Navigator>
);

const GuardiaNavigator = () => (
  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen 
      name="Inicio" 
      component={GuardiaStack} 
      options={{ tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Escanear" 
      component={GuardiaStack1} 
      options={{ tabBarIcon: ({ color }) => <Feather name="camera" size={24} color={color} /> }} 
    />
    <Tab.Screen 
      name="Perfil" 
      component={GuardiaStack2} 
      options={{ tabBarIcon: ({ color }) => <Feather name="user" size={24} color={color} /> }} 
    />
  </Tab.Navigator>
);

export default GuardiaNavigator;
