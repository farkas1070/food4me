import 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from "react";
import { auth } from "../firebase-config";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from "./HomePage"
import RecipeBrowser from "./RecipeBrowser"
import ProfileComponent from "./ProfileComponent"
import MenuElement from './MenuElement';
import RecipeComponent from "./RecipeComponent"

const HomeScreen = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator initialRouteName='Homepage'>
        <Drawer.Screen
          name="Homepage"
          options={{
            headerShown:false
          }}
          component={Homepage}
        />
        <Drawer.Screen
          name="ProfileComponent"
          options={{
            headerShown:false,
            title: 'Profile',
            headerTitleAlign: 'center',
          }}
          component={ProfileComponent}
        />
        <Drawer.Screen
          name="RecipeFinder"
          options={{
            headerShown:false
           
            
            
          }}
          component={RecipeComponent}
        />
        <Drawer.Screen
          name="RecipeBrowser"
          options={{
            headerShown:false
           
            
            
          }}
          component={RecipeBrowser}
        />
        <Drawer.Screen
          name="MenuCreator"
          options={{
            headerShown:false
           
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
  icon:{
    marginRight:10
  }
})