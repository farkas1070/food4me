import 'react-native-gesture-handler';
import { StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';

import MenuElement from '../Views/MenuCreator/MenuCreator';
import RecipeComponent from "../Views/RecipeFinder/RecipeFinder"
import { foodContext } from "../Context/GlobalContext.js"

import NewRecipeBrowser from "../Views/RecipeBrowser/RecipeBrowser"
import BottomTabs from "./BottomNavigator"
import MyFridge from "../Views/MyFridge/MyFridge"
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import Favourites from '../Views/Favourites/Favourites';

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
        name="My Fridge"
        options={{
          headerShown: false,
          drawerIcon: () => (<MaterialCommunityIcons name="fridge-outline" size={24} color="white" />)
        }}
        component={MyFridge}
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