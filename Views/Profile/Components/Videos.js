import React, { useContext } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
  Text,
  Image,
  
} from "react-native";
import { styles } from "./VideosStyle";
import { useNavigation } from "@react-navigation/native";
import { singleOrAllvideosContext } from "../../../Context/GlobalContext.js";
import NoVideoPic from "../../../assets/profileAssets/noVideos.png";

const YourComponent = ({ userVideos }) => {
  const navigation = useNavigation();

  const squareSize = Dimensions.get("window").width * 0.3;
  const [singleVideo, setSingleVideo] = useContext(singleOrAllvideosContext);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {userVideos.length === 0 ? (
          <View style={styles.nothingContainer}>
            <Image
              resizeMode="contain"
              source={NoVideoPic}
              style={styles.nothingPic}
            />
            <Text style={[styles.text,{fontFamily:'CustomFont'}]}>No Videos Yet, Upload Some</Text>
            <TouchableOpacity style={styles.uploadVideoButton} onPress={()=>{navigation.navigate("Upload Video")}}>
              <Text style={styles.buttonText}>Upload Your Fisrt Video Here</Text>
            </TouchableOpacity>
          </View>
        ) : (
          userVideos.map((video, index) => {
            return (
              <TouchableOpacity
                key={index}
                style={[
                  styles.gridItem,
                  { width: squareSize, height: squareSize },
                ]}
                onPress={() => {
                  setSingleVideo(true);
                  navigation.navigate("Discover", {
                    item: [{ ...userVideos[index] }],
                  });
                }}
              >
                <ImageBackground
                  style={styles.background}
                  source={{ uri: video.thumbnail }}
                  resizeMode="cover"
                ></ImageBackground>
              </TouchableOpacity>
            );
          })
        )}
      </View>
    </View>
  );
};

export default YourComponent;
