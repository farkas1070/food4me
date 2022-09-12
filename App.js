import 'react-native-gesture-handler';
import {
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import WelcomeScreen from "./Components/WelcomeScreen"
import LoginScreen from "./Components/LoginScreen"
import HomeScreen from "./Components/HomeScreen"
import { DataProvider } from "./Components/SetData.js"
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
function App() {
  const Stack = createNativeStackNavigator();
  
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen options={{headerShown:false}}  name="Register" component={WelcomeScreen} />
          <Stack.Screen  options={{headerShown:false}} name="Login" component={LoginScreen} />
          <Stack.Screen  options={{headerShown:false}}  name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;