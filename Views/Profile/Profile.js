import React, { useContext, useState, useEffect } from "react";
import { View, ScrollView, Alert } from "react-native";
import { userDataContext } from "../../Context/GlobalContext.js";
import { useNavigation } from "@react-navigation/native";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import * as ImagePicker from "expo-image-picker";
import { updateProfile, getAuth } from "firebase/auth";
import { styles } from "./ProfileStyle.js";
import { storage, db } from "../../firebase-config.js";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  doc,
  updateDoc,
  query,
  getDocs,
  collection,
  where,
} from "firebase/firestore";
import UserDataComponent from "./Components/UserData.js";
import Header from "./Components/Header";
import Videos from "./Components/Videos.js";
import MontserratBold from "../../fonts/Montserrat-Bold.ttf";


const NewProfileComponent = () => {
  const [userData] = useContext(userDataContext);

  const [userVideos, setUserVideos] = useState([]);
  const [showUserData, setShowUserData] = useState(true);
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    const fetchData = async () => {
      const userRef = doc(db, "Users", auth.currentUser.uid);
      const userVideosQuery = query(
        collection(db, "Videos"),
        where("uploader", "==", userRef)
      );
      const videosSnapshot = await getDocs(userVideosQuery);
      const videosData = [];

      videosSnapshot.forEach((doc) => {
        const videoData = doc.data(); // Extract the video data
        videosData.push(videoData); // Add video data to the array
      });

      setUserVideos(videosData); // Set the state with video data
    };

    fetchData();
  }, []);

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
  const [loaded] = useFonts({
    CustomFont: CustomFont,
    MontserratBold: MontserratBold,
  });
  if (!loaded) {
    return null;
  }

  return (
    <View
      style={styles.mainContainer}
    >
      <ScrollView style={{ width: "100%" }} contentContainerStyle={{flexGrow:1}}>
        <Header
          user={user}
          pickImage={pickImage}
          setShowUserData={setShowUserData}
          userData={userData}
        />
        <View style={styles.container}>
          {showUserData ? (
            <UserDataComponent userData={userData} />
          ) : (
            <Videos userVideos={userVideos} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default NewProfileComponent;
