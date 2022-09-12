import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from "react-native"
import React from 'react'
import { useState } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../firebase-config";
import Logo from "../Logo.jpg"
const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmPassword] = useState("");
  const [user, setUser] = useState({});
  const [message, setMessage] = useState(["Success", "User successfully created"]);
  const createAlert = () =>
    Alert.alert(
      message[0],
      message[1],
      [
        {
          text: "I Understand",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },

      ]
    );

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const register = async () => {
    try {
      const user = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      createAlert()
      navigation.navigate('Login')
      console.log(user);
    } catch (error) {
      if (error) {
        setMessage(["That isn't quite right...", "This e-mail is already in use...  "])
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
          style={styles.input}
          placeholder="Email..."
          placeholderTextColor="#fd5a43"
          value={email}
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          value={password}
          style={styles.input}
          placeholder="Password..."
          placeholderTextColor="#fd5a43"
          onChangeText={text => setPassword(text)}
        />
        <TextInput
          value={confirmpassword}
          style={styles.input}
          placeholder="Confirm Password..."
          placeholderTextColor="#fd5a43"
          onChangeText={text => setConfirmPassword(text)}
        />

      </View>
      <TouchableOpacity onPress={register} style={styles.buttonContainer}>



        <Text style={styles.registerButton}> Register</Text>

      </TouchableOpacity>
      <TouchableOpacity

        onPress={() => navigation.navigate('Login')}>
        <Text style={styles.loginButton}> or login with an existing account</Text>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  )
}

export default WelcomeScreen

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
    color: "#fd5a43",
    fontWeight: "700",
    backgroundColor: "white",
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 10,
    textAlign: 'center'

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