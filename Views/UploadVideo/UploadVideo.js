import { Text, View, TouchableOpacity } from "react-native";
import React,{useState} from "react";
import { styles } from "./UploadVideoStyle";
import Header from "./Components/Header";
import { FontAwesome5 } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../../firebase-config";
import SuccessModal from "./Components/SucessModal";
import { addDoc, collection, serverTimestamp ,doc} from "firebase/firestore";
import { auth,db } from "../../firebase-config";
import { TextInput } from 'react-native-paper';

const UploadVideo = () => {

    const [showModal, setShowModal] = useState(false);
    const [title, setTitle] = useState("Healthy Meal");
    const [description, setDescription] = useState("I will Show you how to make a healthy meal, you need: etc etc etc....");
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

        //upload video data to firestore//
        const videoData = {
          url: downloadURL,
          uploader: doc(db, `Users/${auth.currentUser.uid}`),
          likes: 0,
          title:title,
          description:description,
          comments: 0,
          timestamp: serverTimestamp(),
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
  return (
    <View style={styles.mainContainer}>
      <Header />
      <View style={styles.bodyContainer}>
        <Text>Select, an Upload your Video:</Text>
        <Text style={{ fontFamily: 'CustomFont', fontSize: 22, color: 'white', marginBottom: 10, textAlign: 'left', }}> Login: </Text>
        <TextInput
          label="Video Title"
          value={title}


          mode='flat'
          
          onChangeText={title => setTitle(title)}
          style={{ width: '80%', marginTop: 20, backgroundColor: 'white' }}
          theme={{
            colors: {
              primary: '#fd5a43',
            },
          }}
        />
        <TextInput
          label="Video Description"

          
          value={description}
          mode='flat'
          
          onChangeText={description => setDescription(description)}
          style={{ width: '80%', marginTop: 20, backgroundColor: 'white' }}
          theme={{
            colors: {
              primary: '#fd5a43',
            },
          }}
        />
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
