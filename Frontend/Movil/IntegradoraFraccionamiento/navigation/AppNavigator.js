import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useContext } from "react";
import { AuthContext, AuthProvider} from "../context/AuthContext";
import LoginScreen from "../screens/guardia/LoginScreen";
import GuardiaNavigator from "./GuardiaNavigator";
import ResidenteNavigator from "./ResidenteNavigator";

const Stack = createNativeStackNavigator();

const MainNavigator = () => {
  const { user } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          user.role === "guardia" ? (
            <Stack.Screen name="GuardiaStack" component={GuardiaNavigator} />
          ) : (
            <Stack.Screen name="ResidenteStack" component={ResidenteNavigator} />
          )
        ) : (
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default function App() {
    return (
        <AuthProvider>
            <MainNavigator />
        </AuthProvider>
    );
}