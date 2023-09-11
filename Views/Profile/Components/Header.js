import React from "react";
import { ImageBackground, View, Image, Text,TouchableOpacity } from "react-native";
import { Appbar } from "react-native-paper";
import { BlurView } from "expo-blur";
import ProfilePic from "../../../assets/profile.png";
import { IconButton } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { styles } from "./HeaderStyle";
import BackgroundPic from "../../../assets/HomeAssets/HeaderBackground.jpg";
const Header = ({ user, pickImage,setShowUserData,userData }) => {
    
  const navigation = useNavigation();
  return (
    <ImageBackground source={BackgroundPic} resizeMode="cover">
      <View style={styles.overlay} />

      <Appbar.Header style={styles.appBar}>
        <View style={styles.topContainer}>
          <Appbar.Action
            icon="menu"
            color="white"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Action
            icon="dots-vertical"
            color="white"
            onPress={() => console.log("cog-outline")}
          />
        </View>

        <View style={styles.imageContainer}>
          {user.photoURL == null ? (
            <View style={{ position: "relative" }}>
              <Image style={styles.profileImage} source={ProfilePic} />
              <IconButton
                icon="file-image-plus-outline"
                size={25}
                mode="contained"
                containerColor="#fd5a43"
                iconColor="white"
                style={styles.icon}
                onPress={() => {
                  pickImage();
                }}
              />
            </View>
          ) : (
            <View style={{ position: "relative" }}>
              <Image
                style={styles.profileImage}
                source={{ uri: user.photoURL }}
              />
              <IconButton
                icon="file-image-plus-outline"
                size={25}
                mode="contained"
                containerColor="#fd5a43"
                iconColor="white"
                style={styles.icon}
                onPress={() => {
                  pickImage();
                }}
              />
            </View>
          )}
        </View>

        <View style={styles.nameContainer}>
          <Appbar.Content title={user.displayName} titleStyle={styles.title} />
        </View>
        <View style={styles.bottomContainer}>
          <TouchableOpacity style={styles.leftChangeViewContainer} onPress={()=>{setShowUserData(true)}}>
            <Text style={styles.changeViewText}>Profile Data</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.rightChangeViewContainer} onPress={()=>{setShowUserData(false)}}>
            <Text style={styles.changeViewText}>Videos</Text>
          </TouchableOpacity>
        </View>
      </Appbar.Header>
    </ImageBackground>
  );
};

export default Header;
  