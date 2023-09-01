import React, { useContext } from 'react'
import { useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewProfileComponent from '../Views/Profile/Profile';
import Homepage from "../Views/Home/Home"
import DiscoveryReel from '../Views/Discover/Discover';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import RecipeBrowser from '../Views/RecipeBrowser/RecipeBrowser';
import { FontAwesome5 } from '@expo/vector-icons';
import { foodContext } from "../Context/GlobalContext.js"
import { Ionicons } from '@expo/vector-icons'; 
import UploadVideo from '../Views/UploadVideo/UploadVideo';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { height } = useWindowDimensions();
  const [foodarray] = useContext(foodContext)
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: 'white',
        tabBarInactiveTintColor: 'black',
        tabBarStyle: [
          {
            backgroundColor: 'black',
            height: 60,
            borderColor: 'transparent',
          },
        ],
      }}
    >
      <Tab.Screen
        name="Home"
        options={({ route }) => ({
          tabBarIcon: ({ focused,}) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={34}
              color={'white'}
            />
          ),
        })}
        component={Homepage}
      />
      <Tab.Screen
        name="Recipe Browser"
        initialParams={{ item: foodarray }}
        options={({ route }) => ({
          tabBarIcon: ({ focused,}) => (
            <Ionicons name={focused ? 'fast-food' : 'fast-food-outline'} size={34} color="white" />
          ),
        })}
        component={RecipeBrowser}
      />
      <Tab.Screen
        name="Upload Video"
        initialParams={{ item: foodarray }}
        options={({ route }) => ({
          tabBarIcon: ({ focused,}) => (
            <MaterialCommunityIcons name={focused ? 'video-plus' : 'video-plus-outline'} size={34} color="white" />
          ),
        })}
        component={UploadVideo}
      />
      <Tab.Screen
        name="Discover"
        options={({ route }) => ({
          tabBarIcon: ({ focused,}) => (
            <MaterialCommunityIcons
              name={focused ? 'compass' : 'compass-outline'}
              size={34}
              color={'white'}
            />
          ),
        })}
        component={DiscoveryReel}
      />
      <Tab.Screen
        name="Profile"
        options={({ route }) => ({
          tabBarIcon: ({ focused,}) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={34}
              color={'white'}
            />
          ),
        })}
        component={NewProfileComponent}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;