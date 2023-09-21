import { Text, View, Image } from "react-native";
import React from "react";

import Searching from "../../../assets/searching.gif";

import { styles } from "./LoadingOverlayStyle";
const LoadingOverlay = () => {
  return (
    <View
      style={styles.container}
    >
      <Text>Just a sec, loading data...</Text>
      <Image style={styles.noitemimage} source={Searching} />
    </View>
  );
};

export default LoadingOverlay;
