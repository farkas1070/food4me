import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

const SlideItem = ({ item, isCurrent, isGlobalMuted, toggleGlobalMute }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [showVolume, setShowVolume] = useState(false);

  useEffect(() => {
    if (video.current) {
      video.current.setIsMutedAsync(isGlobalMuted); // Set video mute status based on global mute
      if (isCurrent) {
        video.current.playAsync();
      } else {
        video.current.pauseAsync();
      }
    }
  }, [isCurrent, isGlobalMuted]);

  const toggleMute = () => {
    toggleGlobalMute(); // Toggle global mute status
    setShowVolume(!showVolume);
    setTimeout(() => {
      setShowVolume(false);
    }, 1000);
  };

  return (
    <View style={styles.slide}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: "100%", heighht: "100%" }}
        onPress={toggleMute}
      >
        <Video
          ref={video}
          style={styles.video}
          source={{
            uri: "https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4",
          }}
          useNativeControls
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </TouchableOpacity>
      <TouchableOpacity style={styles.likeButton}>
        <AntDesign name="hearto" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.commentButton}>
        <Feather name="message-circle" size={40} color="white" />
      </TouchableOpacity>
      { showVolume &&
      <TouchableOpacity style={styles.volumeButton}>
        <Ionicons name={isGlobalMuted ? "volume-mute-outline" : 'ios-volume-high-outline'} size={40} color="grey" />
      </TouchableOpacity>
}
    </View>
  );
};

const YourScreen = () => {
  const data = [1, 2, 3, 4]; // Your data for the PagerView
  const pagerViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGlobalMuted, setIsGlobalMuted] = useState(false);

  const onPageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const toggleGlobalMute = () => {
    setIsGlobalMuted((prevIsGlobalMuted) => !prevIsGlobalMuted);
  };

  return (
    <View style={styles.container}>
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="vertical"
        onPageSelected={onPageSelected}
        ref={pagerViewRef}
      >
        {data.map((item, index) => (
          <View key={index}>
            <SlideItem
              item={item}
              isCurrent={index === currentPage}
              isGlobalMuted={isGlobalMuted}
              toggleGlobalMute={toggleGlobalMute}
            />
          </View>
        ))}
      </PagerView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  pagerView: {
    flex: 1,
  },
  slide: {
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    backgroundColor: "black",

    height: Dimensions.get("window").height,
    width: Dimensions.get("window").width,
  },
  video: {
    width: "100%",
    height: "100%",
  },
  likeButton: {
    position: "absolute",
    bottom: 150,
    right: 10,

    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  commentButton: {
    position: "absolute",
    bottom: 70,
    right: 10,

    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  volumeButton: {
    position: "absolute",
    top: "47%",
    left: "43%",
    backgroundColor:'rgba(255,255,255,0.5)',
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius:50
  },
});

export default YourScreen;
