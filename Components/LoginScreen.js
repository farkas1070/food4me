import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from "react-native"
import React from 'react'
import {signInWithEmailAndPassword,onAuthStateChanged,} from "firebase/auth";
import { useState,useContext } from "react";
import { auth } from "../firebase-config";
import Logo from "../assets/Logo.jpg"
import { userContext } from "../Components/SetData.js"
import { FontAwesome } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("smarton0614@gmail.com");
  const [password, setPassword] = useState("farkas1070");
  const [, setUser] = useContext(userContext);
  const [visibility, setVisibility] = useState(false);
  
  const showPassword = () => {
    setVisibility(!visibility)
  }

  const createAlert = () =>
    Alert.alert(
      "That isn't quite right...",
      "Oops, Wrong Password, Try again!",
      [
        {
          text: "I understand",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

      ]
    );

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
    
  });

  const login = async () => {
    try {
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      navigation.navigate('Home')
      console.log(user);
    } catch (error) {
      if (error) {
        createAlert()
      }
    }
  };

  return (
    <KeyboardAvoidingView style={styles.mainContainer}>
      <Image
        style={styles.image}
        source={Logo}
      />
      <View style={styles.formContainer}>

        <TextInput
          style={styles.topinput}
          placeholder="Email..."
          placeholderTextColor="#fd5a43"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <View style={{ borderRadius: 15, flexDirection: 'row',justifyContent: 'space-between',alignItems: 'center',backgroundColor: '#fff',marginTop:10,height:50,width:"100%"}}> 
          <TextInput
            value={password}
            style={styles.input}
            placeholder="Password..."
            secureTextEntry={visibility}
            placeholderTextColor="#fd5a43"
            onChangeText={text => setPassword(text)}
          />
          <TouchableOpacity onPress={()=>{showPassword()}}>
          <FontAwesome name="eye" size={24} color="#fd5a43" style={{marginRight:20 ,}} />
          </TouchableOpacity>
        </View>

      </View>
      <TouchableOpacity onPress={login} style={styles.buttonContainer}>
        <Text style={styles.registerButton}> Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
      >
        <Text style={styles.loginButton}> Go back and Sign up </Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fd5a43",
    padding: 20
  },
  image: {

    width: 300,
    height: 300
  },
  topText: {
    fontWeight: "700",
    color: "white"
  },
  formContainer: {
    width: "100%",
    padding: 20,
    marginTop: 10
  },
  input: {
    height: 50,
    width: "80%",
    color: "#fd5a43",
    fontWeight: "700",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,

  },
  topinput:{
    height: 50,
    width: "100%",
    color: "#fd5a43",
    fontWeight: "700",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    paddingLeft: 20,
  },
  buttonContainer: {
    marginTop: 50,
    width: "50%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 20,

    justifyContent: "center",
    alignItems: "center"
  },
  registerButton: {
    fontWeight: "700",

  },
  loginButton: {
    textDecorationLine: 'underline',
    fontWeight: "700",
    color: "white",
    marginTop: 20
  }
})