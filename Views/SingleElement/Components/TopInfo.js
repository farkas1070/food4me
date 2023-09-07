import React from "react";
import { View, Text } from "react-native";
import { Chip } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { styles } from "./TopInfoStyle";
const TopInfo = ({
  item,
  nutritionSnapshot,
  modifiedTypes,
  favouritesSnapshot,
  handleFavouriteChange,
  onToggleSnackBar,
}) => {
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <View style={styles.secondaryContainer}>
          <Text style={styles.nameText}>{item.name}</Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            handleFavouriteChange();
            onToggleSnackBar();
          }}
          style={styles.button}
        >
          {favouritesSnapshot.length == 0 ? (
            <MaterialCommunityIcons
              name="heart-outline"
              size={30}
              color="white"
            />
          ) : (
            <MaterialCommunityIcons name="heart" size={30} color="white" />
          )}
        </TouchableOpacity>
      </View>
      <View style={styles.infoContainer}>
        {nutritionSnapshot.map((nutrition, index) => {
          if (
            nutrition.name == "Calories" ||
            nutrition.name == "Protein" ||
            nutrition.name == "Carbohydrates" ||
            nutrition.name == "Fat"
          ) {
            return (
              <View key={index}>
                <Text style={styles.nutritionName}>{nutrition.name}</Text>
                <Text style={styles.nutritionAmount}>
                  {nutrition.amount} {nutrition.unit}
                </Text>
              </View>
            );
          }
        })}
      </View>
      <View style={styles.chipContainer}>
        {modifiedTypes.map((item, index) => (
          <Chip key={index} selectedColor="white" style={styles.chip}>
            {item.name}
          </Chip>
        ))}
      </View>
    </View>
  );
};

export default TopInfo;
