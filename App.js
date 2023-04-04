import 'react-native-gesture-handler';
import WelcomeScreen from "./Components/WelcomeScreen"
import LoginScreen from "./Components/LoginScreen"
import HomeScreen from "./Components/HomeScreen"
import { DataProvider } from "./Components/SetData.js"
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import MenuCreator from "./Components/MenuCreator"
import FilteredRecipeBrowser from "./Components/FilteredRecipeBrowser"
import { Provider as PaperProvider } from 'react-native-paper';
import RestaurantFinder from './Components/RestaurantFinder';
import GenderComponent from "./Components/GenderComponent";
import NewSingleElement from './Components/NewSingleElement';
import FilterRecipes from './Components/FilterRecipes';
import NewFilteredRecipeBrowser from './Components/NewFilteredRecipeBrowser';
import NewLoginComponent from './Components/NewLoginComponent';
import NewRegisterComponent from './Components/NewRegisterComponent';
function App() {

  const Stack = createNativeStackNavigator();


  return (
    <DataProvider>
      <PaperProvider>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={{ headerShown: false }} name="Register" component={NewRegisterComponent} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={NewLoginComponent} />
            <Stack.Screen options={{ headerShown: false }} name="GenderComponent" component={GenderComponent} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SingleElement" component={NewSingleElement} />
            <Stack.Screen options={{ headerShown: false }} name="MenuElement" component={MenuCreator} />
            <Stack.Screen options={{ headerShown: false }} name="FilteredRecipeBrowser" component={NewFilteredRecipeBrowser} />
            <Stack.Screen options={{ headerShown: false }} name="RestaurantFinder" component={RestaurantFinder} />
            <Stack.Screen options={{ headerShown: false }} name="RecipeFilter" component={FilterRecipes} />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </DataProvider>
  );
}

export default App;