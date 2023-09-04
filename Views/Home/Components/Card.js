import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import FoodImage from "../../../assets/HomeAssets/Food.png";

import { styles } from "./CardStyle";
const Card = () => {
  return (
    <View style={styles.topBlackButton}>
      <View style={styles.leftContainer}>
        <Text style={styles.cardInfoText}>
          Find the Perfect{"\n"} Menu For Yourself
        </Text>
        <TouchableOpacity style={styles.discoverButton}>
          <Text>Dicsover</Text>
        </TouchableOpacity>
      </View>

      <Image style={styles.FoodImage} source={FoodImage} resizeMode="contain" />
    </View>
  );
};

export default Card;
