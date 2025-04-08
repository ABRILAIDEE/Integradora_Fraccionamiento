import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "../screens/guardia/LoginScreen";
import LoginEnterPhoneScreen from "../screens/residente/LoginEnterPhoneScreen";
import LoginVerifyCodeScreen from "../screens/residente/LoginVerifyCodeScreen";

const Stack = createNativeStackNavigator();

const LoginStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="LoginScreen" component={LoginScreen} />
    <Stack.Screen name="LoginEnterPhoneScreen" component={LoginEnterPhoneScreen} />
    <Stack.Screen name="LoginVerifyCode" component={LoginVerifyCodeScreen} />
  </Stack.Navigator>
);

export default LoginStack; //NUEVO