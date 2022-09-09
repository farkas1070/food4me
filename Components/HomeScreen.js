import 'react-native-gesture-handler';
import { StyleSheet, Text, View, KeyboardAvoidingView, TouchableOpacity } from 'react-native'
import React from 'react'
import { useState } from "react";
import { auth } from "../firebase-config";
import { createDrawerNavigator } from '@react-navigation/drawer';
import ReceiptComponent from "./ReceiptComponent"
import { NavigationContainer } from '@react-navigation/native';
import ProfileComponent from "./ProfileComponent"

const HomeScreen = ({ navigation }) => {
  const Drawer = createDrawerNavigator();

  return (
      <Drawer.Navigator initialRouteName='ReceiptComponent'>
        <Drawer.Screen
          name="ReceiptComponent"
          component={ReceiptComponent}
        />
        <Drawer.Screen
          name="ProfileComponent"
          component={ProfileComponent}
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
  }
})