import 'react-native-gesture-handler';
import { StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from "react";
import { auth } from "../firebase-config";
import { createDrawerNavigator } from '@react-navigation/drawer';
import Homepage from "./HomePage"

import ProfileComponent from "./ProfileComponent"

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
          name="RecipeComponent"
          options={{
            headerShown:false
           // headerTitleAlign: 'center',
           //  headerStyle: {
             //  title: 'Home',
             //    backgroundColor: '#fd5a43',
           //   shadowColor: 'transparent', // this covers iOS
           //   elevation: 0, // this covers Android
          //  },
         //   headerTintColor: 'white',
         //   headerTitleStyle: {
          //    fontWeight: 'bold',
        //    },
            
            
          }}
          component={RecipeComponent}
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