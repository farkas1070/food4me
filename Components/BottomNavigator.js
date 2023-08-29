import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import NewProfileComponent from '../Views/Profile/Profile';
import Homepage from "../Views/Home/Home"
import { MaterialIcons } from '@expo/vector-icons'; // You can use any icon library of your choice
import DiscoveryReel from '../Views/Discover/Discover';
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
      
    </Tab.Navigator>
  );
}

export default BottomTabNavigator