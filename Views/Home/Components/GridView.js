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
            source={{uri: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3465&q=80'}}
            style={styles.imageBackground}
          >
            <View style={styles.overlay1} />
            <Text style={styles.text}>Find Something{'\n'} to Eat</Text>
          </ImageBackground>
        </TouchableOpacity>

        <TouchableOpacity style={styles.gridItem}>
          <ImageBackground
            source={{uri: 'https://images.unsplash.com/photo-1484723091739-30a097e8f929?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1547&q=80'}}
            style={styles.imageBackground}
          >
            <View style={styles.overlay2} />
            <Text style={styles.text}>Watch Shorts</Text>
          </ImageBackground>
        </TouchableOpacity>
      </View>

      {/* Bottom Row */}
      <TouchableOpacity style={[styles.gridItem, styles.fullWidth]}>
        <ImageBackground
          source={{uri: 'https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80'}}
          style={styles.imageBackground}
        >
          <View style={styles.overlay3} />
          <Text style={styles.text}>Favourites</Text>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};



export default GridView;