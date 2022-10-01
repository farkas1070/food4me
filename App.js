import 'react-native-gesture-handler';
import WelcomeScreen from "./Components/WelcomeScreen"
import LoginScreen from "./Components/LoginScreen"
import HomeScreen from "./Components/HomeScreen"
import { DataProvider } from "./Components/SetData.js"
import { NavigationContainer,DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import SingleElement from "./Components/SingleElement"
import MenuCreator from "./Components/MenuCreator"
import FilteredRecipeBrowser from "./Components/FilteredRecipeBrowser"

function App() {
  
  const Stack = createNativeStackNavigator();
  

  return (
    <DataProvider>
      <NavigationContainer theme={DarkTheme}>
        <Stack.Navigator initialRouteName="Register">
          <Stack.Screen options={{headerShown:false}}  name="Register" component={WelcomeScreen} />
          <Stack.Screen  options={{headerShown:false}} name="Login" component={LoginScreen} />
          <Stack.Screen  options={{headerShown:false}}  name="Home" component={HomeScreen} />
          <Stack.Screen  options={{headerShown:false}}  name="SingleElement" component={SingleElement} />
          <Stack.Screen  options={{headerShown:false}}  name="MenuElement" component={MenuCreator} />
          <Stack.Screen  options={{headerShown:false}}  name="FilteredRecipeBrowser" component={FilteredRecipeBrowser} />
          
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

export default App;