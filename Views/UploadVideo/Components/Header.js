import React from "react";
import { ImageBackground, View, Image, StyleSheet, Text } from "react-native";
import { Appbar } from "react-native-paper";

import HeaderBackground from "../../../assets/HomeAssets/HeaderBackground.jpg";
import { useNavigation } from "@react-navigation/native";
import BoldMontserrat from "../../../fonts/Montserrat-Bold.ttf";
import { useFonts } from "expo-font";
import { styles } from "./HeaderStyle";
const NewHeader = () => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    MontserratBold: BoldMontserrat,
  });
  if (!loaded) {
    return null;
  }
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={HeaderBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <Appbar.Header style={styles.appBar}>
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Text style={styles.text}>Upload Video</Text>
          <Appbar.Action
            icon="close"
            color="white"
            onPress={() => {
              navigation.goBack();
            }}
          />
        </View>
      </Appbar.Header>
    </ImageBackground>
  );
};

export default NewHeader;
