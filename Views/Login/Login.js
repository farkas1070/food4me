import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  useWindowDimensions,
} from "react-native";
import React from "react";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useState, useContext } from "react";
import { auth } from "../../firebase-config";
import Logo from "../../assets/Logo.png";
import { userContext, userDataContext } from "../../Context/GlobalContext";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Video } from "expo-av";
import { TextInput } from "react-native-paper";
import Videofootage from "../../assets/food4me.mp4";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import { Button } from "react-native-paper";
import LoadingOverlay from "./Components/LoadingOverlay";
import { styles } from "./LoginStyle";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../firebase-config";
const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("smarton0614@gmail.com");
  const [password, setPassword] = useState("farkas1070");
  const [, setUserData] = useContext(userDataContext);
  const [, setUser] = useContext(userContext);
  const [visibility, setVisibility] = useState(true);
  const windowHeight = useWindowDimensions().height;
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const showPassword = () => {
    setVisibility(!visibility);
  };

  const createAlert = () =>
    Alert.alert(
      "That isn't quite right...",
      "Oops, Wrong Password, Try again!",
      [
        {
          text: "I understand",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel",
        },
      ]
    );

  onAuthStateChanged(auth, (currentUser) => {
    setUser(currentUser);
  });

  const login = async () => {
    try {
      setIsAuthenticating(true);
      await signInWithEmailAndPassword(auth, email, password);

      const userQuery = query(
        collection(db, "Users"),
        where("uid", "==", auth.currentUser.uid)
      );

      const querySnapshot = await getDocs(userQuery);

      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        setUserData(doc.data());
      });
      navigation.navigate("Home");
      setIsAuthenticating(false);
    } catch (error) {
      if (error) {
        createAlert();
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
    <View
      style={[styles.mainContainer, { minHeight: Math.round(windowHeight) }]}
    >
      {isAuthenticating && <LoadingOverlay />}
      <Video
        source={Videofootage}
        shouldPlay={true}
        isLooping={true}
        resizeMode="cover"
        style={styles.video}
      />

      <View style={styles.overlay} />
      <Image style={styles.mainIcon} source={Logo} resizeMode="contain" />
      <View style={styles.textInputsContainer}>
        <Text style={[styles.loginText, { fontFamily: "CustomFont" }]}>
          Login:
        </Text>
        <TextInput
          label="E-mail"
          value={email}
          mode="flat"
          right={
            <TextInput.Icon
              icon={() => (
                <MaterialCommunityIcons name="at" size={24} color="black" />
              )}
            />
          }
          onChangeText={(email) => setEmail(email)}
          style={styles.textInput}
          theme={{
            colors: {
              primary: "#fd5a43",
            },
          }}
        />
        <TextInput
          label="Password"
          secureTextEntry={visibility}
          value={password}
          mode="flat"
          right={
            <TextInput.Icon
              icon={() => (
                <TouchableOpacity
                  onPress={() => {
                    showPassword();
                  }}
                >
                  <MaterialCommunityIcons
                    name="eye"
                    size={24}
                    color="#fd5a43"
                  />
                </TouchableOpacity>
              )}
            />
          }
          onChangeText={(password) => setPassword(password)}
          style={styles.textInput}
          theme={{
            colors: {
              primary: "#fd5a43",
            },
          }}
        />
        <Button
          icon="login"
          mode="contained"
          buttonColor="#fd5a43"
          onPress={() => {
            login();
          }}
          style={styles.button}
        >
          Login
        </Button>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={[styles.subText, { fontFamily: "CustomFont" }]}>
            
            Don't have an account yet? Click here and sign up!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LoginScreen;
