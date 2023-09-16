import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
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
            onAddPress(option)
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

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: "row",

    width: "90%",
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    marginTop: 20,
    elevation: 3, // For shadow on Android
    shadowColor: "gray", // For shadow on iOS
    shadowOffset: { width: 0, height: 2 }, // For shadow on iOS
    shadowOpacity: 0.2, // For shadow on iOS
  },
  imageContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10, // Small border radius for the left side
  },
  contentContainer: {
    flex: 2,
    marginLeft: 10,
    justifyContent: "center",
  },
  name: {
    fontSize: 15,
    marginTop:10,
    color: "black",
  },
  detailsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  description: {
    marginLeft: 5,
    color: "gray",
  },
  addButton: {
    bottom: 0,
    right: 10,
    alignSelf:'flex-end',
    backgroundColor: "#fd5a43",
    borderRadius: 5,
    width: 60,
    padding: 5,
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default Card;
