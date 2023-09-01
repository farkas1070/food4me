import React, { useState, useRef, useEffect, useMemo } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  StatusBar
} from "react-native";
import PagerView from "react-native-pager-view";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { storage } from "../../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { FontAwesome } from "@expo/vector-icons";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
  
} from "@gorhom/bottom-sheet";
import BottomSheet from "@gorhom/bottom-sheet";

const SlideItem = ({
  item,
  isCurrent,
  isGlobalMuted,
  toggleGlobalMute,
  bottomSheetRef,
}) => {
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
  const openBottomSheet = () => {
    
    bottomSheetRef.current.expand();
    

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
            uri: item.url,
          }}
          useNativeControls={false}
          resizeMode={ResizeMode.CONTAIN}
          isLooping
          onPlaybackStatusUpdate={(status) => setStatus(() => status)}
        />
      </TouchableOpacity>

      <View style={styles.topContainer}>
        <View style={styles.backContainer}>
          <Ionicons name="arrow-back-outline" size={35} color="white" />
          <Text style={styles.reelsText}>Reels</Text>
        </View>
        <TouchableOpacity>
          <FontAwesome
            name="plus-square-o"
            size={38}
            color="white"
            style={styles.plusIcon}
          />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.likeButton}>
        <AntDesign name="hearto" size={35} color="white" />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => {
          openBottomSheet();
        }}
      >
        <Feather name="message-circle" size={40} color="white" />
      </TouchableOpacity>
      {showVolume && (
        <TouchableOpacity style={styles.volumeButton}>
          <Ionicons
            name={
              isGlobalMuted ? "volume-mute-outline" : "ios-volume-high-outline"
            }
            size={40}
            color="grey"
          />
        </TouchableOpacity>
      )}
    </View>
  );
};

const YourScreen = () => {
  
  const [videoURLs, setVideoURLs] = useState([]);
  const pagerViewRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [isGlobalMuted, setIsGlobalMuted] = useState(false);
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "40%"], []);

  const onPageSelected = (e) => {
    setCurrentPage(e.nativeEvent.position);
  };

  const toggleGlobalMute = () => {
    setIsGlobalMuted((prevIsGlobalMuted) => !prevIsGlobalMuted);
  };
  useEffect(() => {
    let listreference = ref(storage, `Videos/`);
    listAll(listreference)
      .then((res) => {
        res.items.forEach((itemRef) => {
          let newobject = {};
          newobject.path = itemRef._location.path;

          getDownloadURL(itemRef).then((url) => {
            newobject.url = url;
            setVideoURLs((prev) => [...prev, newobject]);
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.container}>
      
      <PagerView
        style={styles.pagerView}
        initialPage={0}
        orientation="vertical"
        onPageSelected={onPageSelected}
        ref={pagerViewRef}
      >
        {videoURLs.map((item, index) => (
          <View key={index}>
            <SlideItem
              item={item}
              isCurrent={index === currentPage}
              isGlobalMuted={isGlobalMuted}
              toggleGlobalMute={toggleGlobalMute}
              bottomSheetRef={bottomSheetModalRef}
            />
          </View>
        ))}
      </PagerView>
      
        <BottomSheet
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoints}
          backgroundStyle={{
            backgroundColor: "#262626",
           
          }}
          
          handleIndicatorStyle={{
            backgroundColor: "#a9a9a9",
            
            
          }}
        >
          <View >
            <View style={styles.commentsTextContainer}>
            <Text style={styles.commentsText}>Comments</Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                bottomSheetModalRef.current.close();
              }}
            >
              <Text>Close</Text>
            </TouchableOpacity>
          </View>
        </BottomSheet>
      
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
    bottom: 180,
    right: 10,

    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  commentButton: {
    position: "absolute",
    bottom: 100,
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
    backgroundColor: "rgba(255,255,255,0.5)",
    width: 65,
    height: 65,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 50,
  },
  topContainer: {
    width: "100%",
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
  },
  reelsText: {
    color: "white",
    fontSize: 22,
    marginLeft: 20,
  },
  plusIcon: {
    marginRight: 15,
  },
  commentsTextContainer:{
    width:'100%',
    alignItems: "center",
    marginTop:10
  },
  commentsText:{
    color:'white',
    
  }
});

export default YourScreen;
