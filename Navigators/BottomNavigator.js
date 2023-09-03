import React, { useContext } from "react";
import { useWindowDimensions } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import NewProfileComponent from "../Views/Profile/Profile";
import Homepage from "../Views/Home/Home";
import DiscoveryReel from "../Views/Discover/Discover";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import RecipeBrowser from "../Views/RecipeBrowser/RecipeBrowser";
import { FontAwesome5 } from "@expo/vector-icons";
import { foodContext } from "../Context/GlobalContext.js";
import { Ionicons } from "@expo/vector-icons";
import UploadVideo from "../Views/UploadVideo/UploadVideo";
import { View,Image } from "react-native";
import { auth } from "../firebase-config";
import ProfilePicPlaceholder from "../assets/profileAssets/profilePicPlaceholder.jpg"
const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { height } = useWindowDimensions();
  const [foodarray] = useContext(foodContext);
  

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "black",
        tabBarStyle: [
          {
            backgroundColor: "black",
            height: 60,
            
          },
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "home" : "home-outline"}
              size={34}
              color={"white"}
            />
          ),
        })}
        component={Homepage}
      />
      <Tab.Screen
        name="Recipe Browser"
        initialParams={{ item: foodarray }}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <Ionicons
              name={focused ? "fast-food" : "fast-food-outline"}
              size={34}
              color="white"
            />
          ),
        })}
        component={RecipeBrowser}
      />
      <Tab.Screen
        name="Upload Video"
        initialParams={{ item: foodarray }}
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "video-plus" : "video-plus-outline"}
              size={34}
              color="white"
            />
          ),
        })}
        component={UploadVideo}
      />
      <Tab.Screen
        name="Discover"
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <MaterialCommunityIcons
              name={focused ? "compass" : "compass-outline"}
              size={34}
              color={"white"}
            />
          ),
        })}
        component={DiscoveryReel}
      />
      <Tab.Screen
        name="Profile"
        options={({ route }) => ({
          tabBarIcon: ({ focused }) => (
            <View style={{ width: 30, height: 30 }}>
              <Image
                source={ auth.currentUser.photoURL == null? ProfilePicPlaceholder:{ uri:  auth.currentUser.photoURL }}
                style={{
                  width: 30, // Set the desired width
                  height: 30, // Set the desired height
                  borderWidth: focused ? 1 : 0, // Change the icon color when focused,
                  borderColor:focused ? 'white' : 'transparent',
                  borderRadius:50
                }}
              />
            </View>
          ),
        })}
        component={NewProfileComponent}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
