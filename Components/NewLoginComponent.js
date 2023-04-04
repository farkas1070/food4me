import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, useWindowDimensions } from "react-native"
import React from 'react'
import { signInWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";
import { useState, useContext, } from "react";
import { auth } from "../firebase-config";
import Logo from "../assets/Logo.png"
import { userContext, userDataContext } from "../Components/SetData.js"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Video, VideoOverlay } from 'expo-av';
import { TextInput } from 'react-native-paper';
import Videofootage from "../assets/food4me.mp4";
import { useFonts } from 'expo-font';
import CustomFont from '../fonts/myfont.otf';
import { Button } from 'react-native-paper';
import { ActivityIndicator } from 'react-native-paper';
import LoadingOverlay from './LoadingOverlay';
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("smarton0614@gmail.com");
  const [password, setPassword] = useState("farkas1070");
  const [userData, setUserData] = useContext(userDataContext)
  const [, setUser] = useContext(userContext);
  const [visibility, setVisibility] = useState(true);
  const windowHeight = useWindowDimensions().height;
  const [isAuthenticating, setIsAuthenticating] = useState(false);
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
      setIsAuthenticating(true);
      const user = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );


      navigation.navigate('Home')
      setIsAuthenticating(false);

    } catch (error) {
      if (error) {
        createAlert()
      }
    }
  };
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }

  return (
    <View style={{ flex: 1, position: 'relative', justifyContent: 'space-between', alignItems: 'center', minHeight: Math.round(windowHeight) }} >
      {isAuthenticating && <LoadingOverlay />}
      <Video
        source={Videofootage}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
        style={{ width: '100%', flex: 1, height: '100%', brightness: 0.7, contrast: 0.7, zIndex: -10, position: 'absolute' }}
      />


      <View style={styles.overlay} />
      <Image
        style={{ width: 300, height: 300, marginTop: 30 }}
        source={Logo}
        resizeMode='contain'
      />
      <View style={{ width: '100%', justifyContent: 'center', alignItems: 'center', marginBottom: 30 }}>
        <Text style={{ fontFamily: 'CustomFont', fontSize: 22, color: 'white', marginBottom: 10, textAlign: 'left', }}> Login: </Text>
        <TextInput
          label="E-mail"
          value={email}


          mode='flat'
          right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="at" size={24} color="#fd5a43" />} />}
          onChangeText={email => setEmail(email)}
          style={{ width: '80%', marginTop: 20, backgroundColor: 'white' }}
          theme={{
            colors: {
              primary: '#fd5a43',
            },
          }}
        />
        <TextInput
          label="Password"

          secureTextEntry={visibility}
          value={password}
          mode='flat'
          right={<TextInput.Icon icon={() => <TouchableOpacity onPress={() => { showPassword() }} ><MaterialCommunityIcons name="eye" size={24} color="#fd5a43" /></TouchableOpacity>} />}
          onChangeText={password => setPassword(password)}
          style={{ width: '80%', marginTop: 20, backgroundColor: 'white' }}
          theme={{
            colors: {
              primary: '#fd5a43',
            },
          }}
        />
        <Button icon="login" mode="contained" buttonColor='#fd5a43' onPress={() => { login() }} style={{ marginTop: 20, width: '60%' }}>
          Login
        </Button>
        
        <TouchableOpacity onPress={() => navigation.navigate('Register')} ><Text style={{ fontFamily: 'CustomFont', fontSize: 10, color: 'white', marginTop: 60, textAlign: 'left', textDecorationLine: 'underline' }}> Don't have an account yet? Click here and sign up! </Text></TouchableOpacity>
      </View>
    </View>
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
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)', // dark overlay with 40% opacity
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
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
  topinput: {
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