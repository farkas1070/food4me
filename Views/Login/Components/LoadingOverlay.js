import React from "react";
import { View, Text, StyleSheet, ActivityIndicator } from "react-native";
import { useFonts } from "expo-font";
import CustomFont from "../../../fonts/myfont.otf";
import { styles } from "./LoadingOverlayStyle";
const LoadingOverlay = () => {
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }
  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        <Text style={[styles.text, { fontFamily: "CustomFont" }]}>
          Loading, please wait...
        </Text>
        <ActivityIndicator color="white" size={100} />
      </View>
    </View>
  );
};

export default LoadingOverlay;
