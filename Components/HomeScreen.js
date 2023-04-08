import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from "./HomePage"
import RecipeBrowser from "./RecipeBrowser"
import ProfileComponent from "./ProfileComponent"
import MenuElement from './MenuElement';
import RecipeComponent from "./RecipeComponent"
import { foodContext } from "../Components/SetData.js"
import RestaurantFinder from "./RestaurantFinder"
import NewRecipeBrowser from "../Components/NewRecipeBrowser"
import BottomTabs from "./BottomTabs"
import MyFridge from "./MyFridge"
import ShoppingList from './ShoppingList';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Favourites from './Favourites';
const HomeScreen = () => {
  const [foodarray] = useContext(foodContext)
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{
      drawerStyle: {
        backgroundColor: '#ff7966',
        color:'white',
        width: 240,
      },
      drawerActiveTintColor:'white',
      
      
    }}
      initialRouteName='Homepage'>
      <Drawer.Screen
        name="Homepage"
        options={{
          headerShown: false,
          
          drawerIcon: () => (<MaterialCommunityIcons name="home-outline" size={24} color="white" />)
        }}
        component={BottomTabs}
      />
      <Drawer.Screen
        name="Favourites"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="heart-outline" size={24} color="white" />)



        }}
        component={Favourites}
      />
      <Drawer.Screen
        name="Recipe Finder"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="text-box-search-outline" size={24} color="white" />)



        }}
        component={RecipeComponent}
      />
      <Drawer.Screen
        name="Recipe Browser"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="search-web" size={24} color="white" />)
          


        }}
        initialParams={{ item: foodarray }}
        component={NewRecipeBrowser}
      />
      <Drawer.Screen
        name="My Fridge"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="fridge-outline" size={24} color="white" />)
        }}
        component={MyFridge}
      />
      <Drawer.Screen
        name="Shopping List"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="shopping-outline" size={24} color="white" />)
        }}
        component={ShoppingList}
      />
      <Drawer.Screen
        name="Menu Creator"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="food-outline" size={24} color="white" />)

        }}
        component={MenuElement}
      />

    </Drawer.Navigator>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    marginRight: 10
  }
})