import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import ProfileComponent from "./ProfileComponent"
import NewProfileComponent from './NewProfileComponent';
import RestaurantFinder from "./RestaurantFinder"
import Homepage from "./HomePage"
import { MaterialIcons } from '@expo/vector-icons'; // You can use any icon library of your choice
import DiscoveryReel from './DiscoveryReel';
import { FontAwesome5 } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();



const BottomTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: 'purple',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            backgroundColor: 'black'
          }
        ]
      }}

    >
      <Tab.Screen name="Home"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="home" size={24} color="white" />
          ),
        }}
        component={Homepage} />
      <Tab.Screen name="Discover"
        options={{
          tabBarIcon: () => (
            <FontAwesome5 name="compass" size={24} color="white" />
          ),
        }}
        component={DiscoveryReel} />
      <Tab.Screen name="Profile"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="account-circle" size={24} color="white" />),
        }}
        component={NewProfileComponent} />
      <Tab.Screen name="Restaurant Finder"
        options={{
          tabBarIcon: () => (
            <MaterialIcons name="settings" size={24} color="white" />
          ),
        }}
        component={RestaurantFinder} />
    </Tab.Navigator>
  );
}

export default BottomTabNavigator