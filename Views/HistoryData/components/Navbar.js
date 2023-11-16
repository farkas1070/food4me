import React from "react";
import { ImageBackground, View, Image } from "react-native";
import { Appbar } from "react-native-paper";
import HeaderBackground from "../../../assets/HomeAssets/HeaderBackground.jpg";
import { useNavigation } from "@react-navigation/native";
import SmallIcon from "../../../assets/smallLogo.png";
import { styles } from "./NavbarStyle";
const NewHeader = () => {
  const navigation = useNavigation();
  return (
    <ImageBackground
      style={styles.backgroundImage}
      source={HeaderBackground}
      resizeMode="cover"
    >
      <View style={styles.overlay} />
      <Appbar.Header style={styles.appBar}>
        <View style={styles.innerView}>
          <Appbar.Action
            icon="arrow-left"
            color="white"
            onPress={() => {
              navigation.openDrawer();
            }}
          />
          <Appbar.Content
            style={{
              alignItems: "flex-end",
            }}
            title={
              <Image
                source={SmallIcon} // Replace with your image source
                style={styles.smallIcon}
              />
            }
          />
        </View>
      </Appbar.Header>
    </ImageBackground>
  );
};

export default NewHeader;
