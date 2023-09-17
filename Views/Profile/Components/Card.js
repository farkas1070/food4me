import React from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { styles } from "./CardStyle";
const Card = ({ option, onAddPress }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: option.image }} // Replace with the actual image URL
          style={styles.image}
        />
      </View>
      <View style={styles.contentContainer}>
        <Text style={[styles.name, { fontFamily: "MontserratBold" }]}>
          {option.name.length > 40
            ? option.name.slice(0, 40) + "..."
            : option.name}
        </Text>
        <View style={styles.detailsContainer}>
          <FontAwesome5 name="utensils" size={24} color="#b0b0b0" />
          <Text style={styles.description}>{option.servings}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            onAddPress(option);
          }}
        >
          <View style={styles.addButton}>
            <Text style={styles.addButtonText}>Add</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Card;
