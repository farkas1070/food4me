import React from "react";
import { View, ImageBackground } from "react-native";
import { Appbar } from "react-native-paper";
import { styles } from "./HeaderStyle";
import { useNavigation } from "@react-navigation/native";
const Header = ({ item }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.appBar}>
      <ImageBackground
        style={styles.backgroundImage}
        source={{
          uri: item.image,
          cache: "force-cache",
        }}
      >
        <View style={styles.container}>
          <Appbar.Action
            icon="arrow-left-top"
            color="rgba(253, 90, 67, 1)"
            onPress={() => {
              navigation.goBack();
            }}
            style={styles.arrow}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Header;
