import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image } from "react-native"
import { auth } from "./firebase-config";
import Logo from "./Logo.jpg"
import WelcomeScreen from "./Components/WelcomeScreen"
import LoginScreen from "./Components/LoginScreen"
import HomeScreen from "./Components/HomeScreen"

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
function App() {
  const Stack = createNativeStackNavigator();
  
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Register">
        <Stack.Screen options={{headerShown:false}}  name="Register" component={WelcomeScreen} />
        <Stack.Screen  options={{headerShown:false}} name="Login" component={LoginScreen} />
        <Stack.Screen  options={{headerShown:false}}  name="Home" component={HomeScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;