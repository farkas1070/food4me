import 'react-native-gesture-handler';
import {
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import WelcomeScreen from "./Components/WelcomeScreen"
import LoginScreen from "./Components/LoginScreen"
import HomeScreen from "./Components/HomeScreen"
import { DataProvider } from "./Components/SetData.js"
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';


function App() {
  
  const Stack = createNativeStackNavigator();
  
  

  return (
    <DataProvider>
      <NavigationContainer theme={DarkTheme}>
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