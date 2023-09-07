import React from "react";
import { View, Text } from "react-native";

import { FontAwesome5 } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import CustomFont from "../../../fonts/myfont.otf";
import { styles } from "./StepsStyle";
const Steps = ({ stepsSnapshot }) => {
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.container}>
      {stepsSnapshot.map((step, index) => {
        return (
          <View key={index} style={styles.stepContainer}>
            <View style={styles.innerStepContainer}>
              <FontAwesome5
                name="utensils"
                size={24}
                color="#fd5a43"
                style={{ marginRight: 10 }}
              />
              <Text style={styles.text}> Step {step.number}:</Text>
            </View>
            <Text style={[styles.secondaryText, { fontFamily: "CustomFont" }]}>
              {" "}
              {step.step}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Steps;
