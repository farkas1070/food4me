import React, { useState, useRef, useEffect, useMemo,useContext } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  BackHandler 
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { AntDesign } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { db, auth } from "../../../firebase-config";
import { useNavigation } from "@react-navigation/native";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";
import BottomSheet, { BottomSheetScrollView } from "@gorhom/bottom-sheet";
import { singleOrAllvideosContext } from "../../../Context/GlobalContext";
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
import ProfilePicPlaceholder from "../../../assets/profileAssets/profilePicPlaceholder.jpg";
import { TextInput } from "react-native-paper";
import { styles } from "./SlideItemStyle";

const SlideItem = ({ item, isCurrent, isGlobalMuted, toggleGlobalMute }) => {
  const video = useRef(null);
  const [status, setStatus] = useState({});
  const [showVolume, setShowVolume] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(item.likes);
  const [uploader, setUploader] = useState("");
  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["60%"], []);
  const [comment, setComment] = useState("test komment");
  const [comments, setComments] = useState([]);
  const [singleVideo, setSingleVideo] = useContext(singleOrAllvideosContext)
  const navigation = useNavigation();

  const handleBackPress = () => {
    // Navigate to a different screen when the back button is pressed
    setSingleVideo(false)
  };
  useEffect(() => {
    // Add a listener for the back button press event
    const backHandler = BackHandler.addEventListener('hardwareBackPress', handleBackPress);
  
    // Remove the listener when the component unmounts
    return () => backHandler.remove();
  }, []);
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
    bottomSheetModalRef.current.present();
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
              setSingleVideo(false)
              navigation.goBack();
            }}
          >
            <Ionicons name="arrow-back-outline" size={35} color="white" />
          </TouchableOpacity>
          <Text style={styles.reelsText}>Reels</Text>
        </View>
      </View>
      <BottomSheetModalProvider>
        <BottomSheetModal
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
                      <Text style={styles.commentsTextTitle}>
                        {comment.uploader.username}
                      </Text>
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
        </BottomSheetModal>
      </BottomSheetModalProvider>
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

export default SlideItem;
