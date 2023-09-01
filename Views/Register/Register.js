import { View, Text, TouchableOpacity, Image, Alert, useWindowDimensions } from "react-native"
import React from 'react'
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth ,db} from "../../firebase-config";
import Logo from "../../assets/Logo.png"

import { collection } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
import Videofootage from "../../assets/othervideo.mp4";
import { Video, VideoOverlay } from 'expo-av';
import { TextInput } from 'react-native-paper';
import { Button } from 'react-native-paper';
import { useFonts } from 'expo-font';
import CustomFont from '../../fonts/myfont.otf';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {styles} from "./RegisterStyle"
const WelcomeScreen = ({ navigation }) => {
  const [email, setEmail] = useState("Valaki10@gmail.com");
  const [password, setPassword] = useState("Valaki10");
  const [name, setName] = useState("Valaki10");
  const [visibility, setVisibility] = useState(false);
  const [, setUser] = useState({});
  const windowHeight = useWindowDimensions().height;
  
  
  const [message, setMessage] = useState(["Success", "User successfully created"]);

  const collectionRef = collection(db, 'Users')
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

          })
        })

        navigation.navigate('OnBoarding')

      }

    } catch (error) {
      if (error) {
        setMessage(["That isn't quite right...", "This e-mail is already in use...  "])
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
        <Text style={{ fontFamily: 'CustomFont', fontSize: 22, color: 'white', marginBottom: 10, textAlign: 'left', }}> Register: </Text>
        <TextInput
          label="Username..."
          value={name}
          selectionColor="white"
          mode='flat'
          right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="account" size={24} color="black" />} />}
          onChangeText={name => setName(name)}
          style={{ width: '80%', marginTop: 20, backgroundColor: 'white' }}
          theme={{
            colors: {
              primary: '#fd5a43',
            },
          }}
        />
        <TextInput
          label="E-mail..."
          value={email}
          mode='flat'
          right={<TextInput.Icon icon={() => <MaterialCommunityIcons name="at" size={24} color="black" />} />}
          onChangeText={email => setEmail(email)}
          style={{ width: '80%', marginTop: 20, backgroundColor: 'white' }}
          theme={{
            colors: {
              primary: '#fd5a43',
            },
          }}
        />
        <TextInput
          label="Password..."
          value={password}
          secureTextEntry={visibility}
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
        <Button icon="login" mode="contained" buttonColor='#fd5a43' onPress={() => {register()}} style={{ marginTop: 20, width: '60%' }}>
          Register
        </Button>
      </View>
    </View>

  )
}

export default WelcomeScreen

