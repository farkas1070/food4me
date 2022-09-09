import 'react-native-gesture-handler';
import {
  signOut,
} from "firebase/auth";
import { auth } from "./firebase-config";
import WelcomeScreen from "./Components/WelcomeScreen"
import LoginScreen from "./Components/LoginScreen"
import HomeScreen from "./Components/HomeScreen"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
function App() {
  const Drawer = createDrawerNavigator();
  
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Register">
        <Drawer.Screen options={{headerShown:false}}  name="Register" component={WelcomeScreen} />
        <Drawer.Screen  options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Drawer.Screen  options={{headerShown:false}}  name="Home" component={HomeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;