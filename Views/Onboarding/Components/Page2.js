import React from "react";
import { View, Text, ImageBackground, Image } from "react-native";
import GenderAsset from "../../../assets/gender.png";
import { Button } from "react-native-paper";
import Background from "../../../assets/test.jpg";
import { styles } from "./Page2Style";
const Page2 = ({
  goToPrevPage,
  goToNextPage,
  setLeftBorderValue,
  setRightBorderValue,
  leftBorderValue,
  rightBorderValue,
  value,
  setValue,
}) => {
  return (
    <View style={styles.page} key="2">
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
              source={GenderAsset}
              resizeMode="contain"
            />
            <Text style={styles.topText}>What is your Gender?</Text>
            <View
              style={styles.buttonsContainer}
            >
              <Button
                icon="gender-male"
                buttonColor="#00FFFF"
                mode="elevated"
                onPress={() => {
                  setValue("Male");
                  setLeftBorderValue(3);
                  setRightBorderValue(0);
                }}
                style={[styles.leftButton,{borderWidth: leftBorderValue,}]}
              >
                Male
              </Button>

              <Button
                icon="gender-female"
                buttonColor="#FF00FF"
                mode="elevated"
                onPress={() => {
                  setValue("Female");
                  setRightBorderValue(3);
                  setLeftBorderValue(0);
                }}
                style={[styles.rightButton,{borderWidth: rightBorderValue,}]}
              >
                Female
              </Button>
            </View>
          </View>
          <View
            style={styles.bottomContainer}
          >
            <Button
              icon="arrow-left-bold"
              buttonColor="white"
              mode="elevated"
              onPress={() => {
                goToPrevPage();
              }}
              style={{ marginBottom: 50 }}
            >
              previous
            </Button>
            <Button
              icon="arrow-right-bold"
              buttonColor="white"
              disabled={value == "" ? true : false}
              mode="elevated"
              onPress={() => {
                goToNextPage();
              }}
              style={{ marginBottom: 50 }}
            >
              Next
            </Button>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page2;
