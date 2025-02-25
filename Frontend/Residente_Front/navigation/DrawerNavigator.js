import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "../screens/HomeScreen";
import Home2Screen from "../screens/Home2Screen"; // Importa Home2Screen   PANTALLA B
import ProfileScreen from "../screens/ProfileScreen";
import DetailsScreen from "../screens/DetailsScreen";
import CreateVisitScreen from "../screens/CreateVisitScreen";
import EditProfileScreen from "../screens/EditProfileScreen";
import LoadingScreen from "../screens/LoadingScreen";
import CustomAppBar from "../components/CustomAppBar";
import PrincipalScreen from "../screens/PrincipalScreen";
import VisitsScreen from "../screens/VisitsScreen";
import VisitQRScreen from "../screens/VisitQRScreen";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar
            navigation={navigation}
            title={route.name}
            isRoot={route.name === "Home"}
          />
        ),
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="Home2" component={Home2Screen} /> 
      <Stack.Screen name="Details" component={DetailsScreen} />
    </Stack.Navigator>
  );
}

function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar
            navigation={navigation}
            title={route.name}
            isRoot={route.name === "Perfil"}
          />
        ),
      })}
    >
      <Stack.Screen name="Perfil" component={ProfileScreen} />
    </Stack.Navigator>
  );
}

function CreateVisitStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar
            navigation={navigation}
            title={route.name}
            isRoot={route.name === "Crear Visita"}
          />
        ),
      })}
    >
      <Stack.Screen name="Crear Visita" component={CreateVisitScreen} />
    </Stack.Navigator>
  );
}

function PrincipalStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar
            navigation={navigation}
            title={route.name}
            isRoot={route.name === "Principal"}
          />
        ),
      })}
    >
      <Stack.Screen name="Principal" component={PrincipalScreen} />
    </Stack.Navigator>
  );
}

function VisitsStack() {
  return (
    <Stack.Navigator
      screenOptions={({ route }) => ({
        header: ({ navigation }) => (
          <CustomAppBar
            navigation={navigation}
            title={route.name}
            isRoot={route.name === "Mis Visitas"}
          />
        ),
      })}
    >
      <Stack.Screen name="Mis Visitas" component={VisitsScreen} />
      <Stack.Screen name="Visit QR" component={VisitQRScreen} />
    </Stack.Navigator>
  );
}

function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{ headerShown: false, drawerActiveTintColor: "#b660f7" }}
    >
      <Drawer.Screen name="HomeStack" component={HomeStack} options={{ title: "Inicio" }} />
      <Drawer.Screen name="ProfileStack" component={ProfileStack} options={{ title: "Perfil" }} />
      <Drawer.Screen name="CreateVisitStack" component={CreateVisitStack} options={{ title: "Crear Visita" }} />
      <Drawer.Screen name="PrincipalStack" component={PrincipalStack} options={{ title: "Principal" }} />
      <Drawer.Screen name="VisitsStack" component={VisitsStack} options={{ title: "Mis Visitas" }} />
      <Drawer.Screen name="EditProfile" component={EditProfileScreen} options={{ title: "Editar Perfil" }} />
    </Drawer.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Main" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}