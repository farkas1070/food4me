import {  Text, View,Image,TouchableOpacity } from 'react-native'
import React from 'react'
import {styles} from "./CustomInfoStyle"
import { FontAwesome } from "@expo/vector-icons";
const CustomInfo = ({ leftIcon, ageText, actualValue,measure }) => {
  return (
    <View style={styles.subInformationView}>
            <View style={styles.leftContainer}>
              <Image resizeMode="contain" source={leftIcon} style={styles.icon} />
              <Text
                style={[styles.informationText, { fontFamily: "CustomFont" }]}
              >
                {ageText}:
              </Text>
            </View>
            <View style={styles.rightContainer}>
              <Text
                style={[styles.informationText, { fontFamily: "CustomFont" }]}
              >
                {actualValue}, {measure}
              </Text>
              <TouchableOpacity>
              <FontAwesome name="pencil-square-o" size={30} color="black" style={styles.rightIcon} />
              
              </TouchableOpacity>
              
            </View>
          </View>
  )
}

export default CustomInfo

