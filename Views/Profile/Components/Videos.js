import React, { useContext } from "react";
import {
  View,
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { styles } from "./VideosStyle";
import { useNavigation } from "@react-navigation/native";
import { singleOrAllvideosContext } from "../../../Context/GlobalContext.js";
const YourComponent = ({ userVideos }) => {
  const navigation = useNavigation();

  const squareSize = Dimensions.get("window").width * 0.3;
  const [singleVideo, setSingleVideo] = useContext(singleOrAllvideosContext);

  return (
    <View style={styles.container}>
      <View style={styles.gridContainer}>
        {userVideos.map((video, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={[
                styles.gridItem,
                { width: squareSize, height: squareSize },
              ]}
              onPress={() => {
                setSingleVideo(true)
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
        })}
      </View>
    </View>
  );
};

export default YourComponent;
