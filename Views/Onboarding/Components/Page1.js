import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import SuccessAsset from "../../../assets/success.png";
import { Button } from "react-native-paper";
import Background from "../../../assets/test.jpg";
import { styles } from "./Page1Style";
const Page1 = ({ goToNextPage }) => {
  return (
    <View style={styles.page} key="1">
      <ImageBackground
        source={Background}
        resizeMode="cover"
        style={styles.imagebackground}
      >
        <View
          style={styles.innerView}
        >
          <View style={{ width: "100%" }}>
            <Image
              style={styles.AssetImage}
              source={SuccessAsset}
              resizeMode="contain"
            />
            <Text style={styles.topText}>
              Success! Your Account has been created
            </Text>
            <Text
              style={[styles.text,{fontFamily: "CustomFont",}]}
            >
              To continue, we need to ask a few questions first...
            </Text>
          </View>

          <Button
            icon="arrow-right-bold"
            buttonColor="white"
            mode="elevated"
            onPress={() => {
              goToNextPage();
            }}
            style={{ marginBottom: 50 }}
          >
            Next
          </Button>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page1;
