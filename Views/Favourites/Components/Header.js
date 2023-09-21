import { Text, View, ImageBackground } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { useFonts } from "expo-font";
import CustomFont from "../../../fonts/myfont.otf";
import { styles } from "./HeaderStyle";
import { useNavigation } from "@react-navigation/native";
const Header = () => {
  const navigation = useNavigation();
  const [loaded] = useFonts({
    CustomFont: CustomFont,
  });

  if (!loaded) {
    return null;
  }
  return (
    <ImageBackground
      source={{
        uri: "https://images.unsplash.com/photo-1496412705862-e0088f16f791?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80",
        cache: "force-cache",
      }}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction
          color="rgba(255, 255, 255, 1)"
          onPress={() => {
            navigation.goBack();
          }}
        />

        <Appbar.Content
          color="rgba(255, 255, 255, 1)"
          title={
            <Text
              style={{
                fontFamily: "CustomFont",
                fontSize: 20,
                color: "white",
                textAlign: "left",
              }}
            >
              Favourites
            </Text>
          }
        />
        <Appbar.Action
          color="rgba(255, 255, 255, 1)"
          icon="magnify"
          onPress={() => {}}
        />
      </Appbar.Header>
    </ImageBackground>
  );
};

export default Header;

