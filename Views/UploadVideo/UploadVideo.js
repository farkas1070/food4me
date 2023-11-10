import { Text, View, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useState } from "react";
import { styles } from "./UploadVideoStyle";
import Header from "./Components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
import SuccessModal from "./Components/SucessModal";
import { addDoc, collection, serverTimestamp, doc } from "firebase/firestore";
import { auth, db } from "../../firebase-config";
import { TextInput } from "react-native-paper";
import { useFonts } from "expo-font";
import CustomFont from "../../fonts/myfont.otf";
import { Video } from "expo-av";
import { Entypo } from "@expo/vector-icons";

const UploadVideo = () => {
  const [showModal, setShowModal] = useState(false);
  const [videoUri, setVideoUri] = useState(null);
  const [ImageUri, setImageUri] = useState(null);
  const [title, setTitle] = useState("Healthy Meal");
  const [showVideo, setShowVideo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [description, setDescription] = useState(
    "I will Show you how to make a healthy meal, you need: etc etc etc...."
  );
  const pickVideo = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Videos,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const selectedVideo = result.assets[0];
      const videoUri = selectedVideo.uri;
      setVideoUri(videoUri);
      setShowVideo(true);
    }
  };
  const pickThumbnail = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setShowImage(true);
    }
  };
  const uploadVideo = async () => {
    if (videoUri && ImageUri) {
      const ImageResponse = await fetch(ImageUri);
      const imageBlob = await ImageResponse.blob();

      // Upload the image blob to Firebase Storage
      const thumbnailStorageRef = ref(
        storage,
        "Thumbnails/" + new Date().toISOString() + ".jpg"
      );
      await uploadBytes(thumbnailStorageRef, imageBlob);

      // Get the download URL
      const ThumbnaildownloadURL = await getDownloadURL(thumbnailStorageRef);

      const VideoResponse = await fetch(videoUri);
      const videoBlob = await VideoResponse.blob();

      const videoStorageRef = ref(
        storage,
        "Videos/" + new Date().toISOString() + ".mp4"
      );

      try {
        await uploadBytes(videoStorageRef, videoBlob);
        const downloadURL = await getDownloadURL(videoStorageRef);

        const videoData = {
          url: downloadURL,
          uploader: doc(db, `Users/${auth.currentUser.uid}`),
          likes: 0,
          title: title,
          description: description,

          timestamp: serverTimestamp(),
          thumbnail: ThumbnaildownloadURL,
        };

        const videosCollection = collection(db, "Videos");
        await addDoc(videosCollection, videoData);

        setShowModal(true);
      } catch (error) {
        console.error("Error uploading video:", error);
      }
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }
  return (
    <ScrollView style={styles.mainContainer}>
      <Header />
      <View style={styles.bodyContainer}>
        {showVideo ? (
          <Video
            source={{ uri: videoUri }}
            rate={1.0}
            volume={1.0}
            isMuted={true}
            resizeMode="contain"
            shouldPlay
            useNativeControls={true}
            style={styles.video}
          />
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              pickVideo();
            }}
          >
            <FontAwesome5 name="photo-video" size={40} color="#d1d1d1" />
            <Text style={[styles.buttonText, { fontFamily: "CustomFont" }]}>
              Select your Video:
            </Text>
          </TouchableOpacity>
        )}
        {showImage ? (
          <Image style={styles.image} source={{ uri: ImageUri }} />
        ) : (
          <TouchableOpacity
            style={styles.uploadButton}
            onPress={() => {
              pickThumbnail();
            }}
          >
            <Entypo name="camera" size={40} color="#d1d1d1" />
            <Text style={[styles.buttonText, { fontFamily: "CustomFont" }]}>
              SelectYour thumbnail
            </Text>
          </TouchableOpacity>
        )}

        <Text
          style={{
            fontFamily: "CustomFont",
            fontSize: 22,
            color: "white",
            marginBottom: 10,
            textAlign: "left",
          }}
        >
          {" "}
          Login:{" "}
        </Text>
        <TextInput
          label="Video Title"
          value={title}
          mode="flat"
          onChangeText={(title) => setTitle(title)}
          style={{ width: "80%", marginTop: 20, backgroundColor: "white" }}
          theme={{
            colors: {
              primary: "#fd5a43",
            },
          }}
        />
        <TextInput
          label="Video Description"
          value={description}
          mode="flat"
          onChangeText={(description) => setDescription(description)}
          style={{ width: "80%", marginTop: 20, backgroundColor: "white" }}
          theme={{
            colors: {
              primary: "#fd5a43",
            },
          }}
        />
        <TouchableOpacity
          style={styles.uploadVideoButton}
          onPress={uploadVideo}
        >
          <Text style={[styles.uploadText, { fontFamily: "CustomFont" }]}>
            Upload Video
          </Text>
        </TouchableOpacity>
      </View>
      <SuccessModal isVisible={showModal} closeModal={closeModal} />
    </ScrollView>
  );
};

export default UploadVideo;
