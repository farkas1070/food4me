import React, { useContext, useState } from "react";
import { ImageBackground, View, Image, ScrollView, Alert } from "react-native";

import { userDataContext } from "../../Context/GlobalContext.js";

import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";

import * as ImagePicker from "expo-image-picker";
import { updateProfile, getAuth } from "firebase/auth";
import { styles } from "./ProfileStyle.js";
import { storage, db } from "../../firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";
import UserDataComponent from "./Components/UserData.js";
import Header from "./Components/Header";
import Videos from "./Components/Videos.js";
const NewProfileComponent = () => {
  const [userData, setUserData] = useContext(userDataContext);
  const [showUserData, setShowUserData] = useState(true);
  const navigation = useNavigation();
  const auth = getAuth();
  const user = auth.currentUser;
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });
  if (!loaded) {
    return null;
  }

  const userRef = user.uid;
  const changeView=()=>{
    setShowUserData(!showUserData);
  }
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const imageUri = result.assets[0].uri;

      // Fetch image data
      try {
        const response = await fetch(imageUri);
        const blob = await response.blob();

        // Upload the image blob to Firebase Storage
        const storageRef = ref(
          storage,
          "Profile_Pictures/" + new Date().toISOString() + ".jpg"
        );
        await uploadBytes(storageRef, blob);

        // Get the download URL
        const downloadURL = await getDownloadURL(storageRef);

        // Update user's profile pic in Firebase Auth and Firestore
        const user = auth.currentUser;
        if (user) {
          await updateProfile(user, {
            photoURL: downloadURL,
          });

          const userRef = doc(db, "Users", user.uid);
          await updateDoc(userRef, {
            profilepic: downloadURL,
          });

          Alert.alert(
            "Profile Picture Updated",
            "Successfully updated profile pic. Log in and out to see your new pic."
          );
        }
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <View
      style={{
        width: "100%",
        height: "100%",
        flex: 1,
        backgroundColor: "white",
      }}
    >
      <ScrollView style={{ width: "100%", flexGrow: 1 }}>
        <Header user={user} pickImage={pickImage} setShowUserData={setShowUserData} userData={userData} />
        <View style={styles.container}>
          {showUserData? 
            <UserDataComponent userData={userData} />
          :<Videos/>
          }
        </View>
      </ScrollView>
    </View>
  );
};

export default NewProfileComponent;
