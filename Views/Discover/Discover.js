import React, { useState, useRef, useEffect, useMemo, useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  KeyboardAvoidingView,
} from "react-native";
import PagerView from "react-native-pager-view";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { storage, db, auth } from "../../firebase-config";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { FontAwesome } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { videosContext } from "../../Context/GlobalContext";
import {
  collection,
  where,
  getDocs,
  doc,
  addDoc,
  setDoc,
  getDoc,
  updateDoc,
  query,
  deleteDoc,
  serverTimestamp,
  DocumentReference,
} from "firebase/firestore";
import ProfilePicPlaceholder from "../../assets/profileAssets/profilePicPlaceholder.jpg";
import { TextInput } from "react-native-paper";

const SlideItem = ({ item, isCurrent, isGlobalMuted, toggleGlobalMute }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [showVolume, setShowVolume] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [uploader, setUploader] = useState("");
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["1%", "60%"], []);
  const [comment, setComment] = useState("test komment");
  const [comments, setComments] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    // Check if the video has been liked by the current user
    const checkLikes = async () => {
      const likesQuery = query(
        collection(db, "Likes"),
        where("videoId", "==", item.docid)
      );
      const snapshot = await getDocs(likesQuery);
      // Check if the current user has liked the video

      const liked = snapshot.docs.some(
        (doc) => doc.data().userId === auth.currentUser.uid
      );

      setIsLiked(liked);
      console.log(liked);
    };
    const getUploader = async () => {
      const uploaderDoc = await getDoc(item.uploader);
      if (uploaderDoc.exists()) {
        setUploader(uploaderDoc.data());
      }
    };
    const getComments = async () => {
      const commentsQuery = query(
        collection(db, "Comments"),
        where("videoId", "==", item.docid)
      );
      const snapshot = await getDocs(commentsQuery);

      const commentsData = await Promise.all(
        snapshot.docs.map(async (doc) => {
          const commentData = doc.data(); // Extract comment data

          // If 'uploader' is a reference field, fetch the referenced document
          if (commentData.uploader instanceof DocumentReference) {
            const uploaderDoc = await getDoc(commentData.uploader);
            if (uploaderDoc.exists()) {
              commentData.uploader = uploaderDoc.data(); // Replace the reference with the actual data
            }
          }

          return commentData;
        })
      );

      setComments(commentsData); // Set the comments state with the extracted data
    };

    checkLikes();
    getUploader();
    getComments();
  }, [video.id]);

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
    bottomSheetModalRef.current.expand();
  };
  const sendComment = async () => {
    try {
      const commentsRef = collection(db, "Comments");
      await addDoc(commentsRef, {
        videoId: item.docid,
        uploader: doc(db, `Users/${auth.currentUser.uid}`),
        text: comment,
        timestamp: serverTimestamp(),
      });
      console.log("Comment added successfully.");
    } catch (error) {
      console.error("Error adding comment:", error);
    }
  };

  const likeVideo = async () => {
    if (isLiked) {
      //If liked then we delete it from the collection, and remove 1 like from videos count//
      const videoRef = doc(db, "Videos", item.docid);

      await deleteDoc(
        doc(db, "Likes", `${item.docid}-${auth.currentUser.uid}`)
      );
      await updateDoc(videoRef, {
        likes: likesCount - 1,
      });
      setLikesCount(likesCount - 1);
      setIsLiked(!isLiked);
    } else {
      //If not liked then we set it in the collection, andadd 1 to the videos like count//
      await setDoc(doc(db, "Likes", `${item.docid}-${auth.currentUser.uid}`), {
        userId: auth.currentUser.uid,
        videoId: item.docid, // Adjust this to your data structure
      });

      const videoRef = doc(db, "Videos", item.docid);
      await updateDoc(videoRef, {
        likes: likesCount + 1,
      });
      setLikesCount(likesCount + 1);
      setIsLiked(!isLiked);
    }
  };

  return (
    <KeyboardAvoidingView style={styles.slide}>
      <TouchableOpacity
        activeOpacity={1}
        style={{ width: "100%", heighht: "100%", zIndex: -2 }}
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
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.reelsText}>Reels</Text>
        </View>
      </View>

      <BottomSheet
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        backgroundStyle={{
          backgroundColor: "#262626",
        }}
        handleIndicatorStyle={{
          backgroundColor: "#a9a9a9",
        }}
      >
        <View style={styles.bottomSheetBody}>
          <BottomSheetScrollView
            style={styles.commentsTextContainer}
            contentContainerStyle={{ alignItems: "center" }}
          >
            <Text style={styles.CommentsTitleText}>Comments</Text>
            {comments.map((comment, index) => {
              return (
                <View style={styles.commentView} key={index}>
                  <Image
                    source={
                      comment.uploader.profilepic == null
                        ? ProfilePicPlaceholder
                        : { uri: comment.uploader.profilepic }
                    }
                    style={{
                      width: 30, // Set the desired width
                      height: 30, // Set the desired height
                      borderRadius: 50,
                    }}
                  />
                  <View style={styles.commentTextView}>
                    <Text style={styles.commentsTextTitle}>{comment.uploader.username}</Text>
                    <Text style={styles.commentsText}>{comment.text}</Text>
                  </View>
                </View>
              );
            })}
          </BottomSheetScrollView>

          <TextInput
            label="Comment on the Video..."
            value={comment}
            mode="flat"
            right={
              <TextInput.Icon
                icon={() => (
                  <TouchableOpacity
                    onPress={() => {
                      sendComment();
                    }}
                  >
                    <Feather name="send" size={24} color="#a9a9a9" />
                  </TouchableOpacity>
                )}
              />
            }
            onChangeText={(comment) => setComment(comment)}
            style={{ width: "100%", backgroundColor: "white" }}
            theme={{
              colors: {
                primary: "#a9a9a9",
              },
            }}
          />
        </View>
      </BottomSheet>

      <View style={styles.infoContainer}>
        <View style={styles.userInfoContainer}>
          <Image
            source={
              uploader.profilepic == null
                ? ProfilePicPlaceholder
                : { uri: uploader.profilepic }
            }
            style={{
              width: 30, // Set the desired width
              height: 30, // Set the desired height
              borderRadius: 50,
            }}
          />
          <Text style={styles.profileNameText}>{uploader.username}</Text>
        </View>
        <Text style={styles.infoText}>{item.title}</Text>
        <Text style={styles.infoText}>{item.description}</Text>
      </View>
      <TouchableOpacity
        style={styles.likeButton}
        onPress={() => {
          likeVideo();
        }}
      >
        <AntDesign
          name={isLiked ? "heart" : "hearto"}
          size={35}
          color="white"
        />
        <Text style={styles.likesCountText}>{likesCount}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.commentButton}
        onPress={() => {
          openBottomSheet();
        }}
      >
        <Feather name="message-circle" size={40} color="white" />
        <Text style={styles.commentCountText}>{item.comments}</Text>
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
    </KeyboardAvoidingView>
  );
};

const YourScreen = () => {
  const [videoURLs, setVideoURLs] = useContext(videosContext);
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
        {videoURLs.map((item, index) => (
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
    flex: 1,
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
    zIndex: -1,
  },
  commentButton: {
    position: "absolute",
    bottom: 100,
    right: 10,

    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    zIndex: -1,
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
    zIndex: -1,
  },
  topContainer: {
    width: "100%",
    position: "absolute",
    top: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: -1,
  },
  backContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 15,
    zIndex: -1,
  },
  reelsText: {
    color: "white",
    fontSize: 22,
    marginLeft: 20,
  },
  plusIcon: {
    marginRight: 15,
  },
  bottomSheetBody: {
    width: "100%",
    height: "100%",
  },
  commentsTextContainer: {
    width: "100%",

    backgroundColor: "#262626",
    flexGrow: 1,
  },
  CommentsTitleText: {
    color: "white",
    marginTop: 20,
  },
  commentsText: {
    color: "white",
  },
  commentsTextTitle:{
    color:'white',
    fontWeight:'bold'
  },
  likesCountText: {
    color: "white",
  },
  commentCountText: {
    color: "white",
  },
  infoContainer: {
    position: "absolute",
    left: 10,
    bottom: 90,
    width: "60%",
    zIndex: -1,
  },
  infoText: {
    color: "white",
  },
  userInfoContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  profileNameText: {
    color: "white",
    marginLeft: 10,
  },
  commentView: {
    width: "100%",
    flexDirection: "row",
    padding: 20,
    marginBottom: 10,
    alignItems: "center",
  },
  commentTextView:{
    marginLeft:20
  },
});

export default YourScreen;
