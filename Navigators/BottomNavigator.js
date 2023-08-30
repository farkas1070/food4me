import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewProfileComponent from '../Views/Profile/Profile';
import Homepage from "../Views/Home/Home"
import DiscoveryReel from '../Views/Discover/Discover';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 

import { FontAwesome5 } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  const { height } = useWindowDimensions();

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
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'home' : 'home-outline'}
              size={24}
              color={'white'}
            />
          ),
        })}
        component={Homepage}
      />
      <Tab.Screen
        name="Discover"
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'compass' : 'compass-outline'}
              size={24}
              color={'white'}
            />
          ),
        })}
        component={DiscoveryReel}
      />
      <Tab.Screen
        name="Profile"
        options={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => (
            <MaterialCommunityIcons
              name={focused ? 'account' : 'account-outline'}
              size={24}
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