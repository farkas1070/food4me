import React from 'react';
import { View, TouchableOpacity, Text, ImageBackground } from 'react-native';
import {styles } from "./GridViewStyle"
const GridView = () => {
  return (
    <View style={styles.container}>
      {/* Top Row */}
      <View style={styles.topRow}>
        <TouchableOpacity style={styles.gridItem}>
          <ImageBackground
            source={{uri: 'https://images.unsplash.com/photo-1495080600440-47b003ed9521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3542&q=80'}}
            style={styles.imageBackground}
          >
            <Text style={styles.text}>Grid 1</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <ImageBackground
            source={{uri: 'https://images.unsplash.com/photo-1495080600440-47b003ed9521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3542&q=80'}}
            style={styles.imageBackground}
          >
            <Text style={styles.text}>Grid 2</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* Bottom Row */}
      <TouchableOpacity style={[styles.gridItem, styles.fullWidth]}>
        <ImageBackground
          source={{uri: 'https://images.unsplash.com/photo-1495080600440-47b003ed9521?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3542&q=80'}}
          style={styles.imageBackground}
        >
          <Text style={styles.text}>Grid 3</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};



export default GridView;