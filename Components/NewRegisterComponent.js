import { View, Text, TouchableOpacity, KeyboardAvoidingView, StyleSheet, Image, Alert, useWindowDimensions } from "react-native"
import React from 'react'
import { useState } from "react";
import { createUserWithEmailAndPassword, onAuthStateChanged, } from "firebase/auth";
import { updateProfile } from "firebase/auth";
import { auth } from "../firebase-config";
import Logo from "../assets/Logo.png"
import { FontAwesome } from '@expo/vector-icons';
import { db } from "../firebase-config";
import { collection } from "firebase/firestore"
import { doc, setDoc } from "firebase/firestore";
import Videofootage from "../assets/food4me.mp4";
import { Video, VideoOverlay } from 'expo-av';
import { TextInput } from 'react-native-paper';

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

          }).then(() => {

            const userRef = doc(db, 'Users', auth.currentUser.uid);
            setDoc(userRef, { merge: true });

          }).catch((error) => {
            console.log(error)
          });
        })

        navigation.navigate('GenderComponent')

      }

    } catch (error) {
      if (error) {
        setMessage(["That isn't quite right...", "This e-mail is already in use...  "])
        createAlert()

      }
    }
  };

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
        style={{ width: 300, height: 300,marginTop:80 }}
        source={Logo}
        resizeMode='contain'
      />
      <View style={{ width: '100%',justifyContent: 'center',alignItems: 'center',marginBottom:100}}>
        <TextInput
          label="Height"
          value={email}
          selectionColor="white"
          mode='outlined'
          right={<TextInput.Icon icon={() => <Text>@</Text>} />}
          onChangeText={email => setEmail(email)}
          style={{ width: '80%', marginTop: 20 }}
        />
        <TextInput
          label="Height"
          value={password}
          mode='outlined'
          right={<TextInput.Icon icon={() => <Text>Cm</Text>} />}
          onChangeText={password => setPassword(password)}
          style={{ width: '80%', marginTop: 20 }}
        />
        <TextInput
          label="Height"
          value={password}
          mode='outlined'
          right={<TextInput.Icon icon={() => <Text>Cm</Text>} />}
          onChangeText={password => setPassword(password)}
          style={{ width: '80%', marginTop: 20 }}
        />
      </View>
    </View>

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