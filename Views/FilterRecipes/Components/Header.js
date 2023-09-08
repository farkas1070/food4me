import { Text, View,  ImageBackground } from "react-native";
import React from "react";
import { Appbar } from "react-native-paper";
import { styles } from "./HeaderStyle";
import HeaderBackground from "../../../assets/HomeAssets/HeaderBackground.jpg";
import { useFonts } from "expo-font";
import CustomFont from "../../../fonts/myfont.otf";
const Header = ({filterRecipesAndNavigate ,GoBackToRecipeBrowser}) => {
    const [loaded] = useFonts({
        CustomFont: CustomFont,
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
          <Appbar.Action
            icon="check"
            color="grey"
            style={{ backgroundColor: "white" }}
            onPress={() => {
              filterRecipesAndNavigate();
            }}
          />
          <Appbar.Content
            title={
              <Text
                style={[styles.text,{fontFamily: "CustomFont"}]}
              >
                Filter Menu
              </Text>
            }
          />

          <Appbar.Action
            color="grey"
            icon="close"
            style={{ backgroundColor: "white" }}
            onPress={() => {
              GoBackToRecipeBrowser();
            }}
          />
        </Appbar.Header>
      </ImageBackground>
  )
}

export default Header

