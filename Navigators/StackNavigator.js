import 'react-native-gesture-handler';
import HomeScreen from "./DrawerNavigator"
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import MenuElement from "../Views/MenuElement/MenuElement";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import OnBoarding from "../Views/Onboarding/OnBoarding";
import NewSingleElement from '../Views/SingleElement/SingleElement';
import FilterRecipes from '../Views/FilterRecipes/FilterRecipes';
import NewFilteredRecipeBrowser from '../Views/FilteredRecipeBrowser/FilteredRecipeBroswer';
import NewLoginComponent from '../Views/Login/Login';
import NewRegisterComponent from '../Views/Register/Register';
import Search from '../Views/Search/Search';
import HistoryData from '../Views/HistoryData/HistoryData';
const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator initialRouteName="Login">
            <Stack.Screen options={{ headerShown: false }} name="Register" component={NewRegisterComponent} />
            <Stack.Screen options={{ headerShown: false }} name="Login" component={NewLoginComponent} />
            <Stack.Screen options={{ headerShown: false }} name="OnBoarding" component={OnBoarding} />
            <Stack.Screen options={{ headerShown: false }} name="Home" component={HomeScreen} />
            <Stack.Screen options={{ headerShown: false }} name="SingleElement" component={NewSingleElement} />
            <Stack.Screen options={{ headerShown: false }} name="MenuElement" component={MenuElement} />
            <Stack.Screen options={{ headerShown: false }} name="FilteredRecipeBrowser" component={NewFilteredRecipeBrowser} />
            <Stack.Screen options={{ headerShown: false }} name="RecipeFilter" component={FilterRecipes} />
            <Stack.Screen options={{ headerShown: false }} name="SearchComponent" component={Search} />
            <Stack.Screen options={{ headerShown: false }} name="HistoryComponent" component={HistoryData} />
          </Stack.Navigator>
        </NavigationContainer>
  )
}

export default StackNavigator

