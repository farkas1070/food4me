import React from "react";
import {
  View,
  
  Dimensions,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import {styles} from "./VideosStyle"
const YourComponent = ({ userVideos }) => {
  const data = [1, 2, 3, 4, 5, 6, 7, 8]; // Your data array

  const squareSize = Dimensions.get("window").width * 0.3;

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
            >
              <ImageBackground
                style={styles.background}
                source={{ uri: video.thumbnail }}
                resizeMode="cover"
              >

              </ImageBackground>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};


export default YourComponent;
