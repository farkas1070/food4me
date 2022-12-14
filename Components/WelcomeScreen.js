import { View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert } from "react-native"
import React from 'react'
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import Logo from "../assets/Logo.jpg"
import { FontAwesome } from '@expo/vector-icons'; 


const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [visibility, setVisibility] = useState(false);
  const [, setUser] = useState({});
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
  const showPassword = () => {
    setVisibility(!visibility)
  }

  const register = async () => {
    try {
      if (email === "" || password === "" || name === "") {
        Alert.alert("All fields must be provided!")
      } else {
        const user = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        ).then(() => {
          updateProfile(auth.currentUser, {
            displayName: name,
          }).then(() => {
            console.log("user created")
          }).catch((error) => {
            console.log(error)
          });
        })
        createAlert()
        navigation.navigate('Login')
        console.log(user);
      }

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
            value={name}
            style={styles.topinput}
            placeholder="Username..."
            placeholderTextColor="#fd5a43"
            onChangeText={text => setName(text)}
          />
          
        
        
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
    width: "95%",
    padding: 10,
   
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