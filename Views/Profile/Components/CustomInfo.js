import { Text, View, Image, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./CustomInfoStyle";
import { FontAwesome } from "@expo/vector-icons";
const CustomInfo = ({ leftIcon, ageText, actualValue, measure,changeable,openModal }) => {
  return (
    <View style={styles.subInformationView}>
      <View style={styles.leftContainer}>
        <Image resizeMode="contain" source={leftIcon} style={styles.icon} />
        <Text style={[styles.informationText, { fontFamily: "CustomFont" }]}>
          {ageText}:
        </Text>
      </View>
      <View style={styles.rightContainer}>
        <Text style={[{ fontFamily: "CustomFont" }]}>
          {actualValue} {measure}
        </Text>
        {changeable && 
        <TouchableOpacity style={styles.changeButton} onPress={openModal}>
        <FontAwesome
          name="pencil-square-o"
          size={25}
          color="white"
          style={styles.rightIcon}
        />
      </TouchableOpacity>
        }
        
      </View>
    </View>
  );
};

export default CustomInfo;
