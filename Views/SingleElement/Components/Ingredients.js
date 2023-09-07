import React from "react";
import { View, ScrollView } from "react-native";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { styles } from "./IngredientsStyle";
const Ingredients = ({ modifiedIngredients }) => {
  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        <MaterialCommunityIcons
          name="silverware-fork"
          size={30}
          color="black"
        />
      </View>
      <View style={styles.scrollContainer}>
        <ScrollView nestedScrollEnabled={true} style={{ flexGrow: 1 }}>
          {modifiedIngredients.map((ingredient, index) => {
            return (
              <View key={index} style={styles.innerScrollView}>
                <BouncyCheckbox
                  size={25}
                  fillColor="#fd5a43"
                  unfillColor="#FFFFFF"
                  iconStyle={{ borderColor: "black" }}
                  innerIconStyle={{ borderWidth: 2 }}
                  text={`${ingredient.amount} ${ingredient.unit} of ${ingredient.name}`}
                  style={{ marginLeft: 20 }}
                />
              </View>
            );
          })}
        </ScrollView>
      </View>

      <View style={styles.bottomScrollContainer}>
        <MaterialCommunityIcons name="knife" size={30} color="black" />
      </View>
    </View>
  );
};

export default Ingredients;
