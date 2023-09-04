import React from "react";
import { ImageBackground, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { styles } from "./TopImageStyle";
import { Text ,TouchableOpacity} from "react-native";

const TopImage = () => {
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1539136788836-5699e78bfc75?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
      }}
      style={styles.imageBackground}
    >
      <LinearGradient
        colors={[
          "rgba(255, 255, 255, 1)",
          "rgba(255, 255, 255, 0)",
          "rgba(255, 255, 255, 1)",
        ]}
        style={styles.gradient}
        start={{ x: 0.5, y: 0 }} // Start at the top (0) of the container
        end={{ x: 0.5, y: 1 }} // End at the bottom (1) of the container
        locations={[0, 0.5, 1]} // Specify the position of each color stop
      >
        <TouchableOpacity style={styles.menuButton}>
        <Text style={styles.buttonText}>Create Your Own Menu</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ImageBackground>
  );
};

export default TopImage;
