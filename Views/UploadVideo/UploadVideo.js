import { Text, View, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import { styles } from "./UploadVideoStyle";
import Header from "./Components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
import SuccessModal from "./Components/SucessModal";

const UploadVideo = () => {

    const [showModal, setShowModal] = useState(false);
    
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos, // Only allow videos
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedVideo = result.assets[0]; // Use the assets array
      const videoUri = selectedVideo.uri;
      const response = await fetch(videoUri);
      const blob = await response.blob();

      // Upload the video blob to Firebase Storage
      const storageRef = ref(
        storage,
        "Videos/" + new Date().toISOString() + ".mp4"
      );

      try {
        await uploadBytes(storageRef, blob);
        const downloadURL = await getDownloadURL(storageRef);
        console.log("Video uploaded successfully. Download URL:", downloadURL);
        setShowModal(true);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };
  const closeModal = () => {
    setShowModal(false);
  };
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.bodyContainer}>
        <Text>Select, an Upload your Video:</Text>
        <TouchableOpacity
          style={styles.uploadButton}
          onPress={() => {
            pickVideo();
          }}
        >
          <FontAwesome5 name="photo-video" size={40} color="black" />
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showModal} closeModal={closeModal} />
      <TouchableOpacity onPress={() => {setShowModal(true)}}>
        <Text>test</Text>
      </TouchableOpacity>
    </View>
  );
};

export default UploadVideo;
